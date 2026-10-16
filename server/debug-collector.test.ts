import { readFileSync } from "node:fs";
import vm from "node:vm";
import { describe, expect, it } from "vitest";

describe("development debug collector credential redaction", () => {
  it("redacts request and response credentials before buffering and reporting without changing fetch", async () => {
    const reports: string[] = [];
    let forwardedHeaders: unknown;
    const noop = () => {};
    const response = {
      status: 200,
      statusText: "OK",
      headers: new Headers({
        "content-type": "application/octet-stream",
        "set-cookie": "session=response-secret",
        "x-api-key": "response-key-secret",
      }),
    };
    const context: any = {
      console: Object.fromEntries(
        ["log", "warn", "error", "info", "debug"].map(key => [key, noop])
      ),
      Headers,
      URL,
      Date,
      Intl,
      Error,
      JSON,
      Promise,
      setInterval: noop,
      setTimeout: noop,
      clearTimeout: noop,
      performance: { now: () => 0 },
      navigator: {},
      location: { href: "http://localhost/" },
      history: { pushState: noop, replaceState: noop },
      document: { addEventListener: noop, querySelector: () => null },
      XMLHttpRequest: function () {},
      addEventListener: noop,
      fetch: async (url: string, init: any) => {
        if (url === "/__manus__/logs") reports.push(init.body);
        else forwardedHeaders = init.headers;
        return response;
      },
    };
    context.XMLHttpRequest.prototype = { open: noop, send: noop };
    context.window = context;
    vm.createContext(context);
    vm.runInContext(
      readFileSync(new URL("../client/public/__manus__/debug-collector.js", import.meta.url), "utf8"),
      context
    );
    const headers = {
      Authorization: "Bearer request-secret",
      Cookie: "session=cookie-secret",
      "X-API-Key": "request-key-secret",
      "X-Session-Id": "session-secret",
      "Content-Type": "application/json",
    };
    expect(await context.fetch("/api/example", { headers })).toBe(response);
    expect(forwardedHeaders).toBe(headers);
    const record = context.__MANUS_DEBUG_COLLECTOR__.store.networkRequests[0];
    expect(record.request.headers).toEqual({
      authorization: "[REDACTED]",
      cookie: "[REDACTED]",
      "x-api-key": "[REDACTED]",
      "x-session-id": "[REDACTED]",
      "content-type": "application/json",
    });
    expect(record.response.headers["set-cookie"]).toBe("[REDACTED]");
    expect(record.response.headers["x-api-key"]).toBe("[REDACTED]");
    await context.__MANUS_DEBUG_COLLECTOR__.forceReport();
    expect(reports).toHaveLength(1);
    expect(reports[0]).not.toContain("secret");
    expect(reports[0]).toContain("application/json");
  });
});
