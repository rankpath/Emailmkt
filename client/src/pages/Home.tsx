import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Star,
  Sparkles,
  Monitor,
  Smartphone,
  MousePointer2,
  Layers,
  Code2,
  FolderPlus,
  Palette,
  Send,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Globe2,
  LayoutTemplate,
  GripVertical,
  Users,
  Link2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "../components/copymail/SiteLayout";
import { EmailView, TemplateCard } from "../components/copymail/EmailView";
import { ContactDialog } from "../components/copymail/Dialogs";
import { templates, filterTemplates } from "../data/templates";

const testimonials = [
  {
    quote:
      "Before using Email Sketch, our marketing team spent hours coding templates. Now, we build layouts in minutes and launch campaigns instantly.",
    name: "Jessica Harmon",
    role: "Senior Email Marketing Manager",
    company: "Walmart",
    initials: "JH",
  },
  {
    quote:
      "The drag-and-drop builder makes template design accessible to everyone. We no longer need developers for small content tweaks.",
    name: "Daniel Reeves",
    role: "Head of CRM & Lifecycle",
    company: "Amazon",
    initials: "DR",
  },
  {
    quote:
      "Email Sketch Studio’s template library is insanely comprehensive. We found the perfect newsletter layout and shipped our campaign the same day.",
    name: "Priya Nair",
    role: "Digital Communications Lead",
    company: "IBM",
    initials: "PN",
  },
  {
    quote:
      "Email Sketch templates render perfectly across every email provider. Pre-tested blocks ensure emails look great on both mobile and desktop.",
    name: "Min-jun Lee",
    role: "Global Email Strategist",
    company: "Samsung",
    initials: "ML",
  },
  {
    quote:
      "Managing workspaces for multiple clients is seamless. Each client has a dedicated folder for their branding, logos, and templates.",
    name: "Marcus Webb",
    role: "Director of Customer Communications",
    company: "FedEx",
    initials: "MW",
  },
  {
    quote:
      "The template version history has saved us multiple times. We can restore previous designs in a click, keeping deployment history safe.",
    name: "Sarah Linden",
    role: "Marketing Operations Manager",
    company: "Ford",
    initials: "SL",
  },
  {
    quote:
      "We exported layouts to Klaviyo and Mailchimp in seconds. The HTML was optimized and ready to send, requiring zero extra adjustments.",
    name: "Anthony Greer",
    role: "VP of Client Engagement",
    company: "JP Morgan",
    initials: "AG",
  },
  {
    quote:
      "Email Sketch keeps our design system unified across all email operations. Newsletters look consistent no matter who designs them.",
    name: "Yuki Tanaka",
    role: "Brand Communications Lead",
    company: "Toyota",
    initials: "YT",
  },
];
const faqs = [
  [
    "How many email templates does Email Sketch have?",
    "Email Sketch’s library is designed around 22,000+ professional HTML email templates across 150+ categories: newsletters, promotions, transactional emails, onboarding, product launches and more. This website preview includes a curated selection of 12 working example templates.",
  ],
  [
    "What is Email Sketch Studio?",
    "Studio is your visual email workspace. Choose a template, edit the content and brand colors, add or reorder blocks, preview on desktop or mobile, and export HTML without starting from scratch. Try the working editor in this preview.",
  ],
  [
    "Which email service providers can I export to?",
    "Download HTML and import it into any platform that accepts custom HTML, including Mailchimp, Klaviyo, HubSpot, Resend and ActiveCampaign. This preview exports files; it does not connect to or send through your ESP account.",
  ],
  [
    "Can I import my own HTML into Email Sketch Studio?",
    "The full Email Sketch Studio workflow includes custom HTML import. This preview focuses on editing the included example templates and exporting HTML and JSON. Custom HTML import is not connected here.",
  ],
  [
    "Are the templates mobile-responsive and Outlook-compatible?",
    "The example exports use responsive, table-based email HTML and inline styles. You can preview desktop and mobile widths in Studio. Always test your final campaign in your target inboxes before sending; a universal rendering guarantee is not made for this preview.",
  ],
  [
    "Can I collaborate with my team?",
    "Team workspaces and roles are part of Email Sketch’s full product vision. In this preview, projects are saved in your current browser. You can share a portable preview link for feedback, but cloud team accounts are not enabled.",
  ],
  [
    "Is there a free plan?",
    "Yes. Start with up to 3 projects and 15 templates total (5 per project), with HTML exports. No credit card is required to try this preview. Paid plans and the full library are not connected to billing here.",
  ],
];
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow">
      <span />
      {children}
    </span>
  );
}

export default function Home() {
  const [category, setCategory] = useState("All templates");
  const [testimonial, setTestimonial] = useState(0);
  const [faq, setFaq] = useState<number | null>(0);
  const [contact, setContact] = useState(false);
  const [plan, setPlan] = useState("");
  const selected = filterTemplates("", category).slice(0, 4);
  const review = testimonials[testimonial];
  return (
    <div className="marketing-page">
      <SiteHeader />
      <main>
        <section className="hero wrap">
          <div className="hero-copy">
            <div className="hero-announcement">
              <Sparkles size={13} />
              <span>A little inspiration. A lot of possibility.</span>
              <ArrowUpRight size={13} />
            </div>
            <h1>
              22,000+ email
              <br />
              templates.
              <br />
              <span>Zero blank canvases.</span>
            </h1>
            <p>
              Great emails start here. Browse professional templates, make them
              yours in Email Sketch Studio, and export to any email platform. No
              code. No starting from scratch.
            </p>
            <div className="hero-actions">
              <a className="button black" href="/projects">
                Start building free <ArrowUpRight size={18} />
              </a>
              <a className="button outline" href="/templates">
                Explore templates <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack">
                <span>JL</span>
                <span>AM</span>
                <span>SK</span>
              </div>
              <div>
                <span className="stars">★★★★★</span>
                <small>Built for teams with great ideas.</small>
              </div>
            </div>
            <div className="hero-fineprint">
              <Check size={13} /> Free to start <span /> No credit card required
            </div>
          </div>
          <div className="hero-visual">
            <span className="hero-orbit orbit-one" />
            <span className="hero-orbit orbit-two" />
            <span className="visual-caption">YOUR NEXT GREAT EMAIL ↘</span>
            <div className="hero-email hero-email-left">
              <div className="email-window">
                <i />
                <i />
                <i />
                <span>botanica.com</span>
              </div>
              <EmailView document={templates[0]} compact />
            </div>
            <div className="hero-email hero-email-right">
              <div className="email-window">
                <i />
                <i />
                <i />
                <span>mono.studio</span>
              </div>
              <EmailView document={templates[1]} compact />
            </div>
            <div className="hero-email hero-email-center">
              <div className="email-window">
                <i />
                <i />
                <i />
                <span>elsewhere.travel</span>
              </div>
              <EmailView document={templates[2]} compact />
            </div>
            <div className="floating-badge template-count">
              <span className="badge-icon">
                <Layers size={19} />
              </span>
              <div>
                <strong>22,000+</strong>
                <small>ways to make it yours</small>
              </div>
              <span className="badge-status" />
            </div>
            <div className="floating-badge responsive-badge">
              <span className="badge-icon yellow">
                <Smartphone size={16} />
              </span>
              Looks good. Everywhere.
              <Check size={14} />
            </div>
            <div className="studio-cursor">
              <MousePointer2 size={23} fill="#171717" />
              <span>You, but more creative</span>
            </div>
          </div>
        </section>
        <section className="trust-strip wrap">
          <p>Made for ambitious teams. Inspired by world-class brands.</p>
          <div className="trust-logos">
            <span className="amazon-logo">
              amazon<span>⌣</span>
            </span>
            <span className="google-logo">Google</span>
            <span className="samsung-logo">SAMSUNG</span>
            <span className="ibm-logo">IBM</span>
            <span className="walmart-logo">
              Walmart <span>✳</span>
            </span>
            <span className="fedex-logo">FedEx</span>
            <span className="toyota-logo">TOYOTA</span>
          </div>
        </section>

        <section className="template-section section wrap" id="templates">
          <div className="section-heading">
            <div>
              <Label>The template library</Label>
              <h2>
                A head start for
                <br />
                every kind of send<span className="yellow-dot">.</span>
              </h2>
            </div>
            <div className="section-heading-right">
              <p>
                From your first hello to your next big launch.
                <br />
                Find a template that feels like you.
              </p>
              <a href="/templates" className="text-link">
                Explore all templates <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <div
            className="category-tabs"
            aria-label="Featured template categories"
          >
            {[
              "All templates",
              "Newsletter",
              "E-commerce",
              "Promotional",
              "SaaS",
              "Transactional",
            ].map(cat => (
              <button
                key={cat}
                className={cat === category ? "selected" : ""}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
            <a href="/templates" className="category-more">
              View all <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="template-grid featured-grid">
            {selected.map(doc => (
              <TemplateCard key={doc.id} document={doc} />
            ))}
          </div>
          <div className="library-note">
            <span>
              <span className="status-dot" /> A curated preview of the
              possibilities
            </span>
            <a href="/templates">
              Find your next favorite <ArrowRight size={14} />
            </a>
          </div>
        </section>

        <section id="about" className="about-section section">
          <div className="wrap about-inner">
            <div className="about-art">
              <div className="about-number">
                22<span>,</span>000<span>+</span>
              </div>
              <div className="about-art-bottom">
                <span>
                  Not another
                  <br />
                  blank canvas.
                </span>
                <LayoutTemplate size={56} strokeWidth={1} />
              </div>
              <span className="about-sticker">
                MADE TO BE
                <br />
                MADE YOURS <ArrowUpRight size={20} />
              </span>
            </div>
            <div className="about-copy">
              <Label>A little about us</Label>
              <h2>
                Less starting over.
                <br />
                More standing out.
              </h2>
              <p>
                Finding a great email template shouldn’t take longer than
                building the email. That’s why we created Email Sketch: a world of
                possibilities, and one simple way to make them yours.
              </p>
              <p>
                From newsletters to your next product launch, pair a beautiful
                starting point with a powerful visual editor. Pick, customize,
                and get back to the work that matters.
              </p>
              <div className="about-stats">
                <div>
                  <strong>22k+</strong>
                  <span>Email templates</span>
                </div>
                <div>
                  <strong>150+</strong>
                  <span>Creative categories</span>
                </div>
                <div>
                  <strong>No code</strong>
                  <span>Just your ideas</span>
                </div>
              </div>
              <a href="/projects" className="text-link">
                Meet your new workflow <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <section className="features-section section wrap" id="features">
          <div className="section-heading">
            <div>
              <Label>Meet Email Sketch Studio</Label>
              <h2>
                Your ideas.
                <br />
                Our tools. Great emails.
              </h2>
            </div>
            <div className="section-heading-right">
              <p>
                Everything you need to turn a good starting
                <br />
                point into something unmistakably yours.
              </p>
              <a className="text-link" href="/studio/new?template=daily-ritual">
                Take Studio for a spin <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <div className="feature-bento">
            <div className="feature-editor">
              <span className="feature-icon">
                <MousePointer2 size={22} />
              </span>
              <h3>Big ideas. Zero code.</h3>
              <p>
                Move things around. Make every detail yours.
                <br />
                Our visual editor keeps up with your creativity.
              </p>
              <div className="mini-editor">
                <div className="mini-editor-top">
                  <span>
                    <i />
                    Email Sketch Studio
                  </span>
                  <span>
                    <Monitor size={12} />
                    <Smartphone size={12} />
                  </span>
                  <span className="mini-save">
                    <Check size={10} /> Saved
                  </span>
                </div>
                <div className="mini-editor-body">
                  <div className="mini-tools">
                    <span className="tool-selected">
                      <LayoutTemplate size={16} />
                    </span>
                    <span>
                      <Palette size={16} />
                    </span>
                    <span>
                      <Layers size={16} />
                    </span>
                    <span>
                      <Code2 size={16} />
                    </span>
                  </div>
                  <div className="mini-email">
                    <EmailView document={templates[0]} compact />
                    <div className="selection-outline">
                      <span>Heading</span>
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="mini-cursor">
                      <MousePointer2 size={22} fill="#171717" />
                      <span>Make it yours</span>
                    </div>
                  </div>
                  <div className="mini-properties">
                    <strong>Your brand</strong>
                    <small>Colors</small>
                    <div className="mini-swatches">
                      <i />
                      <i />
                      <i />
                    </div>
                    <small>Content blocks</small>
                    {["Heading", "Image", "Text", "Button"].map(x => (
                      <span className="mini-block" key={x}>
                        <GripVertical size={10} />
                        {x}
                        <Plus size={9} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="feature-side">
              <div className="feature-card yellow-card">
                <span className="feature-icon">
                  <Layers size={22} />
                </span>
                <h3>
                  Every email.
                  <br />
                  Every industry.
                </h3>
                <p>
                  150+ categories. Endless possibilities.
                  <br />
                  There’s a starting point for every story.
                </p>
                <div className="tag-cloud">
                  <span>E-commerce</span>
                  <span>SaaS</span>
                  <span>Newsletters</span>
                  <span>Product launches</span>
                  <span>Welcome emails</span>
                  <span>+ so much more</span>
                </div>
              </div>
              <div className="feature-card export-card">
                <div>
                  <span className="feature-icon">
                    <Code2 size={22} />
                  </span>
                  <h3>
                    Designed here.
                    <br />
                    Sent anywhere.
                  </h3>
                  <p>
                    Clean HTML. Your favorite platform.
                    <br />
                    One beautifully simple workflow.
                  </p>
                </div>
                <div className="export-file">
                  <Code2 size={25} />
                  <strong>your-email.html</strong>
                  <span>
                    <Check size={12} /> Ready to go
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="core-features">
            {[
              [Smartphone, "Mobile-ready", "Small screen. Same great email."],
              [
                Users,
                "Built for your team",
                "One brand. A shared creative vision.",
              ],
              [
                ShieldCheck,
                "Clean, thoughtful HTML",
                "Table-based layouts and inline styles.",
              ],
              [Link2, "Share your work", "A preview link. Instant feedback."],
            ].map(([Icon, title, text]) => {
              const Component = Icon as typeof Smartphone;
              return (
                <div key={String(title)}>
                  <Component size={21} />
                  <h4>{String(title)}</h4>
                  <p>{String(text)}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="process-section section">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <Label>From idea to inbox</Label>
                <h2>
                  Four steps.
                  <br />
                  One better workflow.
                </h2>
              </div>
              <p className="process-intro">
                Less friction between “what if” and “it’s ready”.
                <br />
                Just pick, personalize, and press export.
              </p>
            </div>
            <div className="process-steps">
              {[
                [
                  FolderPlus,
                  "Create a project",
                  "Give your next big campaign a little space of its own.",
                ],
                [
                  LayoutTemplate,
                  "Find your starting point",
                  "Pick a template that fits your story, your style, your audience.",
                ],
                [
                  Palette,
                  "Make it yours",
                  "Your logo, your colors, your words. Every detail, on brand.",
                ],
                [
                  Send,
                  "Export. And you’re off.",
                  "Download clean HTML and bring it to your favorite email platform.",
                ],
              ].map(([Icon, title, text], i) => {
                const Component = Icon as typeof Send;
                return (
                  <div key={String(title)} className="process-step">
                    <div className="step-line">
                      <span>0{i + 1}</span>
                      <ArrowRight size={17} />
                    </div>
                    <Component size={28} strokeWidth={1.5} />
                    <h3>{String(title)}</h3>
                    <p>{String(text)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="benefit-section section wrap">
          <div className="benefit-copy">
            <Label>Designed to make a difference</Label>
            <h2>
              Spend less time
              <br />
              building.
              <br />
              <span>More time creating.</span>
            </h2>
            <p>
              The biggest library. A visual editor. Clean output.
              <br />A little less work between you and a great email.
            </p>
            <a className="button black" href="/projects">
              Make your first email <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="benefit-list">
            {[
              "Skip the blank canvas (and hours of coding).",
              "Keep every email unmistakably on brand.",
              "Look sharp on desktop, tablet, and mobile.",
              "Launch in minutes. Not after another meeting.",
              "Take your HTML to the platform you love.",
            ].map((text, i) => (
              <div key={text}>
                <span className="benefit-check">
                  <Check size={17} />
                </span>
                <h3>{text}</h3>
                <span className="benefit-index">0{i + 1}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pricing-section section" id="pricing">
          <div className="wrap">
            <div className="pricing-heading">
              <Label>Good emails. Simple pricing.</Label>
              <h2>
                A little start.
                <br />A lot of room to grow.
              </h2>
              <p>
                Start free. Find your rhythm. Choose the plan that fits your
                team.
              </p>
            </div>
            <div className="pricing-grid">
              {[
                {
                  name: "Free",
                  subtitle: "For your first great idea",
                  price: "$0",
                  suffix: "/ forever",
                  items: [
                    "Visual drag-and-drop builder",
                    "Up to 3 projects",
                    "15 saved templates (5 per project)",
                    "HTML & JSON exports",
                    "Shareable preview links",
                  ],
                  action: "Start building free",
                },
                {
                  name: "Pro",
                  subtitle: "For professionals & small teams",
                  price: "Let’s talk",
                  suffix: "",
                  items: [
                    "Everything in Free",
                    "Access to the full template library",
                    "Custom branding",
                    "More projects & exports",
                    "AI generation options",
                  ],
                  action: "Explore Pro",
                },
                {
                  name: "Business",
                  subtitle: "For agencies with big ambitions",
                  price: "Built for you",
                  suffix: "",
                  items: [
                    "Everything in Pro",
                    "Team workspaces & roles",
                    "White-label branding",
                    "Advanced collaboration",
                    "Priority assistance",
                  ],
                  action: "Talk to our team",
                },
              ].map((p, i) => (
                <article
                  key={p.name}
                  className={`price-card ${i === 1 ? "popular" : ""}`}
                >
                  {i === 1 && (
                    <span className="popular-tag">
                      <Sparkles size={12} /> A little more possibility
                    </span>
                  )}
                  <div className="plan-label">
                    <span>{p.name}</span>
                    {i === 0 ? (
                      <Zap size={22} />
                    ) : i === 1 ? (
                      <Layers size={22} />
                    ) : (
                      <Users size={22} />
                    )}
                  </div>
                  <p>{p.subtitle}</p>
                  <div className="price-value">
                    {p.price}
                    <span>{p.suffix}</span>
                  </div>
                  <a
                    href={i === 0 ? "/projects" : "#pricing"}
                    onClick={
                      i === 0
                        ? undefined
                        : event => {
                            event.preventDefault();
                            setPlan(p.name);
                            setContact(true);
                          }
                    }
                    className={`button ${i === 1 ? "black" : "outline"}`}
                  >
                    {p.action}
                    <ArrowUpRight size={16} />
                  </a>
                  <span className="includes">What’s included</span>
                  <ul>
                    {p.items.map(item => (
                      <li key={item}>
                        <Check size={15} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="pricing-fineprint">
              <Check size={13} /> No credit card to start <span /> Free preview
              · Paid plans available by inquiry
            </div>
          </div>
        </section>

        <section className="integrations-section section wrap">
          <Label>Plays well with others</Label>
          <h2>
            Your email stack.
            <br />
            Already invited.
          </h2>
          <p>
            Export your HTML to the tools you already know and love.
            <br />
            No new workflow. No unnecessary detours.
          </p>
          <div className="integration-logos">
            {[
              "Mailchimp",
              "Klaviyo",
              "HubSpot",
              "Resend",
              "SendGrid",
              "Brevo",
              "Gmail",
              "ActiveCampaign",
            ].map((name, i) => (
              <span key={name}>
                <span className={`integration-symbol symbol-${i}`}>
                  {name.slice(0, 1)}
                </span>
                {name}
              </span>
            ))}
          </div>
          <a href="/projects" className="text-link">
            Build here. Send anywhere. <ArrowUpRight size={17} />
          </a>
        </section>

        <section className="testimonial-section section">
          <div className="wrap testimonial-inner">
            <div className="testimonial-heading">
              <Label>Better, together</Label>
              <h2>
                Good words.
                <br />
                From great teams.
              </h2>
              <div className="review-stars">
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
                <Star size={17} fill="currentColor" />
              </div>
              <small>Example testimonials from your supplied brief</small>
            </div>
            <div className="testimonial-card" aria-live="polite">
              <span className="quote-mark">“</span>
              <blockquote>{review.quote}</blockquote>
              <div className="review-footer">
                <div className="review-person">
                  <span className="review-avatar">{review.initials}</span>
                  <div>
                    <strong>{review.name}</strong>
                    <span>
                      {review.role}, {review.company}
                    </span>
                  </div>
                </div>
                <div className="review-controls">
                  <span>
                    {testimonial + 1} / {testimonials.length}
                  </span>
                  <button
                    className="icon-button"
                    aria-label="Previous testimonial"
                    onClick={() =>
                      setTestimonial(
                        (testimonial + testimonials.length - 1) %
                          testimonials.length
                      )
                    }
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    className="icon-button"
                    aria-label="Next testimonial"
                    onClick={() =>
                      setTestimonial((testimonial + 1) % testimonials.length)
                    }
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section section wrap" id="faq">
          <div className="faq-copy">
            <Label>A few good questions</Label>
            <h2>
              Curious?
              <br />
              We like that.
            </h2>
            <p>
              A little clarity before you create.
              <br />
              Here’s what you might want to know.
            </p>
            <button
              className="text-link"
              onClick={() => {
                setPlan("");
                setContact(true);
              }}
            >
              Ask us something <ArrowUpRight size={18} />
            </button>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <div
                className={`faq-item ${faq === i ? "expanded" : ""}`}
                key={question}
              >
                <h3>
                  <button
                    aria-expanded={faq === i}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                    onClick={() => setFaq(faq === i ? null : i)}
                  >
                    {question}
                    {faq === i ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                </h3>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  hidden={faq !== i}
                >
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="final-cta wrap">
          <div>
            <span className="eyebrow">
              <span />
              Your next great email is waiting
            </span>
            <h2>
              A blank canvas?
              <br />
              <span>Not your problem anymore.</span>
            </h2>
            <p>
              Pick from a world of email templates. Make one yours.
              <br />
              See where a good starting point takes you.
            </p>
            <a className="button black" href="/projects">
              Start building free <ArrowUpRight size={18} />
            </a>
            <small>No credit card. Just a little creativity.</small>
          </div>
          <div className="cta-globe" aria-hidden="true">
            <Globe2 strokeWidth={0.65} />
            <span className="globe-envelope">
              <Send size={30} />
            </span>
            <span className="globe-spark">✳</span>
          </div>
        </section>
      </main>
      <SiteFooter />
      <ContactDialog open={contact} onOpenChange={setContact} plan={plan} />
    </div>
  );
}
