import { useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
} from "lucide-react";
import { Logo } from "./EmailView";
import { ContactDialog, InfoDialog } from "./Dialogs";

export function SiteHeader({ active = "Home" }: { active?: string }) {
  const [menu, setMenu] = useState(false);
  const [contact, setContact] = useState(false);
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav
            className={menu ? "site-nav open" : "site-nav"}
            aria-label="Main navigation"
          >
            {[
              ["Home", "/"],
              ["About Us", "/#about"],
              ["Templates", "/templates"],
              ["Pricing", "/#pricing"],
            ].map(([name, href]) => (
              <a
                key={name}
                href={href}
                className={active === name ? "active" : ""}
                onClick={() => setMenu(false)}
              >
                {name}
              </a>
            ))}
            <button
              onClick={() => {
                setContact(true);
                setMenu(false);
              }}
            >
              Contact
            </button>
          </nav>
          <a href="/projects" className="button black header-cta">
            Get started <ArrowUpRight size={17} />
          </a>
          <button
            className="mobile-menu icon-button"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-label={menu ? "Close menu" : "Open menu"}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <ContactDialog open={contact} onOpenChange={setContact} />
    </>
  );
}
const footerGroups = [
  {
    title: "Company",
    links: [
      "About Us",
      "Pricing",
      "Contact Us",
      "FAQ",
      "Roadmap",
      "Documentation",
    ],
  },
  {
    title: "Our products",
    links: [
      "CopyElement",
      "Email Sketch",
      "CopyIcons",
      "BrandKity",
      "SEO45 AI",
    ],
  },
  {
    title: "Legal",
    links: [
      "Terms & Conditions",
      "Privacy Policy",
      "Cancellation & Refunds",
      "GDPR Compliance",
    ],
  },
];
export function SiteFooter() {
  const [contact, setContact] = useState(false);
  const [info, setInfo] = useState({ title: "", text: "" });
  function footerLink(label: string) {
    if (label === "Contact Us")
      return <button onClick={() => setContact(true)}>{label}</button>;
    const paths: Record<string, string> = {
      "About Us": "/#about",
      Pricing: "/#pricing",
      FAQ: "/#faq",
      "Email Sketch": "/templates",
    };
    if (paths[label]) return <a href={paths[label]}>{label}</a>;
    const descriptions: Record<string, string> = {
      Documentation:
        "Create a project, pick an example template, customize its content and colors in Studio, then save or export HTML. Add your business address and ESP unsubscribe link before sending.",
      Roadmap:
        "The current preview includes browser-local projects, example templates, a visual editor and HTML/JSON export. Cloud accounts, the full template library and team workflows are not connected in this preview.",
      "Privacy Policy":
        "This preview stores projects and email drafts in localStorage on your browser. There is no cloud account or cross-device synchronization. Shared preview links contain the email content you choose to share.",
      "Terms & Conditions":
        "Final terms for the Email Sketch service have not been supplied. This preview is for evaluating the website and browser-local editor; it is not an active paid service.",
      "Cancellation & Refunds":
        "No paid subscription or payment processing is enabled in this preview. Final cancellation and refund terms should be supplied before activating paid plans.",
      "GDPR Compliance":
        "A final GDPR notice and data-processing agreement have not been supplied. This preview has no cloud customer database; drafts remain in the current browser.",
    };
    return (
      <button
        onClick={() =>
          setInfo({
            title: label,
            text:
              descriptions[label] ||
              `${label} is part of the product family listed in your brief. Its final website destination has not been provided.`,
          })
        }
      >
        {label}
      </button>
    );
  }
  return (
    <>
      <footer className="site-footer">
        <div className="footer-top wrap">
          <div className="footer-brand">
            <Logo light />
            <p>
              Great emails start here.
              <br />
              Pick a template. Make it yours.
              <br />
              Send something worth opening.
            </p>
            <div className="social-links">
              {[
                [Instagram, "Instagram"],
                [Linkedin, "LinkedIn"],
                [Facebook, "Facebook"],
                [Youtube, "YouTube"],
              ].map(([Icon, name]) => {
                const Component = Icon as typeof Instagram;
                return (
                  <button
                    key={String(name)}
                    aria-label={String(name)}
                    onClick={() =>
                      setInfo({
                        title: String(name),
                        text: `The official Email Sketch ${name} profile link can be connected before launch.`,
                      })
                    }
                  >
                    <Component size={17} />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="footer-columns">
            {footerGroups.map(group => (
              <div key={group.title}>
                <h4>{group.title}</h4>
                {group.links.map(label => (
                  <div key={label}>{footerLink(label)}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom wrap">
          <span>© 2026 Email Sketch. All rights reserved.</span>
          <span>
            Made for better emails. <ArrowRight size={14} /> Powered by Webriy
          </span>
        </div>
      </footer>
      <ContactDialog open={contact} onOpenChange={setContact} />
      <InfoDialog
        title={info.title}
        text={info.text}
        onClose={() => setInfo({ title: "", text: "" })}
      />
    </>
  );
}
