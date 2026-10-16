import { useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { ArrowUpRight, Check, Download, Mail } from "lucide-react";
import { downloadText } from "../../lib/email";

export function ContactDialog({
  open,
  onOpenChange,
  plan,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan?: string;
}) {
  const [done, setDone] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    downloadText(
      "email-sketch-inquiry.txt",
      `Email Sketch inquiry${plan ? ` — ${plan} plan` : ""}\n\nName: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message")}\n`
    );
    setDone(true);
  }
  return (
    <Dialog
      open={open}
      onOpenChange={value => {
        onOpenChange(value);
        if (!value) setDone(false);
      }}
    >
      <DialogContent className="cm-dialog">
        <DialogHeader>
          <span className="dialog-symbol">
            <Mail size={23} />
          </span>
          <DialogTitle>
            {done
              ? "Your inquiry is ready."
              : plan
                ? `Let’s talk ${plan}.`
                : "Let’s make something great."}
          </DialogTitle>
          <DialogDescription>
            {done
              ? "Your inquiry has been downloaded. No email has been sent."
              : "Tell us a little about your team and what you’re looking for."}
          </DialogDescription>
        </DialogHeader>
        {done ? (
          <div className="contact-done">
            <Check size={34} />
            <p>
              This preview creates an inquiry file. A destination inbox can be
              connected before launch.
            </p>
            <button
              className="button black"
              onClick={() => onOpenChange(false)}
            >
              Got it <ArrowUpRight size={17} />
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="cm-form">
            <label>
              Your name
              <input
                name="name"
                placeholder="Alex Morgan"
                required
                maxLength={80}
              />
            </label>
            <label>
              Work email
              <input
                name="email"
                type="email"
                placeholder="you@company.com"
                required
                maxLength={254}
              />
            </label>
            <label>
              What do you have in mind?
              <textarea
                name="message"
                placeholder="Tell us about your email workflow…"
                required
                maxLength={3000}
                defaultValue={plan ? `I’m interested in the ${plan} plan.` : ""}
              />
            </label>
            <p className="form-note">
              Preview mode — download an inquiry to share with your team.
            </p>
            <button className="button black" type="submit">
              Prepare inquiry <Download size={17} />
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
export function InfoDialog({
  title,
  text,
  onClose,
}: {
  title: string;
  text: string;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={!!title}
      onOpenChange={value => {
        if (!value) onClose();
      }}
    >
      <DialogContent className="cm-dialog">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{text}</DialogDescription>
        </DialogHeader>
        <p className="form-note">
          This is a working website preview. Final company policies and product
          destinations should be approved before launch.
        </p>
        <button className="button black" onClick={onClose}>
          Close <Check size={16} />
        </button>
      </DialogContent>
    </Dialog>
  );
}
