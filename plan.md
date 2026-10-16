# Email Sketch website

## Direction
Build the email-template marketing website from the supplied text, using the user's **yellow–black tone**. Reuse the sample's New Project form: project name, optional description, Cancel and Create Project. The browser chrome and keyboard in the sample are not part of the website.

## Implementation
Use the initialized React / TypeScript / Vite starter as a static frontend. Build a public marketing landing page, searchable/filterable example-template gallery, and a working browser-local workspace. Projects and edited templates persist in localStorage on the same browser; clearly label this and do not simulate authentication or cloud/team services. The sample does not specify an account system or backend. Use the provided 22,000+ library claims as marketing copy; the working demo catalog contains 12 original example templates, not a fabricated 22,000-item data set. Paid prices were not supplied, so show contact-based Pro and Business plans, not invented prices. No billing, email sending or ESP-account integration is performed.

Primary CTA opens the workspace. Users can create up to three named projects with optional descriptions, choose up to five templates per project, edit template content and branding, reorder/add/remove blocks, switch desktop/mobile preview, save, download HTML/JSON and create a self-contained shareable preview URL. Provide contact inquiry drafting/download without claiming messages were sent. Reuse the installed Lucide icons, Radix dialogs and Sonner notifications; add no unnecessary dependencies.

## Design
- **Design Movement:** Contemporary Swiss editorial design with tactile digital stationery.
- **Core Principles:** Confident oversized type, precise black rules, generous white space, and product-first template previews.
- **Color Philosophy:** Warm paper white makes dense content approachable; near-black conveys precision; sunshine yellow makes the brand energetic and ownable. No pink remains after the user's updated direction.
- **Layout Paradigm:** Split editorial hero with a right-hand layered email-template composition, followed by asymmetric section headers and horizontally flowing template rails. Structured cards only where the product demands them.
- **Signature Elements:** Yellow rounded label tabs, offset overlapping email sheets, and arrow-in-circle accents.
- **Interaction Philosophy:** Clear previews before commitment, fast filters, simple forms and immediate truthful save/export feedback.
- **Animation:** Gentle hero entrance, restrained 180ms hover transitions, slow logo marquee; disable motion under prefers-reduced-motion. Avoid perpetual float on text and layout-shifting animation.
- **Typography System:** Manrope for sharp large headings and brand; DM Sans for UI and body, with strong heading weight and quiet uppercase section labels. Main desktop heading around 68px with tight tracking; responsive mobile heading around 43px.
- **Brand Essence:** The head start for marketers who want better-looking email without starting from scratch. Bold, useful, creative.
- **Brand Voice:** Direct, friendly and design-aware. Example: “Great emails start here.” Example: “Pick a template. Make it yours.”
- **Wordmark & Logo:** A black envelope merged with a diagonal sketch pencil on a yellow rounded tile, paired with a tightly tracked Email Sketch wordmark and italic Sketch lettering.
- **Signature Brand Color:** Email Sketch Yellow, #FFD84D.

## Page content
Preserve the hero, trust/company names, about, features, four-step process, core benefits, Free / Pro / Business pricing, ESP showcase, testimonial carousel, seven FAQs, final CTA and Company / Our Products / Legal footer from the brief. Consolidate scraped repetitions and replace zero animation counters with supplied meaningful numbers. Do not invent an inbox-rate statistic. Avoid categorical rendering guarantees that have not been tested. Quote supplied testimonials as example content in the demo, without newly invented proof.

## Project structure
- `client/src/pages/`: Home, Templates, Workspace, NewProject, ProjectDetail, Studio, Preview and not-found views.
- `client/src/components/`: shared Header/Footer/Logo, email preview renderer, template cards, contact dialog and workspace shell.
- `client/src/data/templates.ts`: 12 working example template definitions and generated photo URLs.
- `client/src/lib/workspace.ts`: typed browser-local persistence, free-plan constraints and draft management.
- `client/src/lib/email.ts`: safe HTML export, JSON export and preview-link encoding.
- `client/src/index.css`: responsive yellow–black design system and page layouts.
- `client/public/`: favicon, route manifest and static assets.
- `scripts/prerender.tsx`: static landing/gallery rendering for meaningful initial page content in the built website.

Serve Vite on the configured port 3000. Retain the existing static build declaration, extending build:static with React server-rendered public pages. Keep browser-local workspace pages out of search. No additional infrastructure dependencies are required.

## Email Sketch rebrand — 16 October 2026
Change the website-facing name to **Email Sketch**, retaining the yellow–black palette, existing routes, template library, editor and project flows. Replace the old logo with a source-controlled scalable SVG envelope-and-sketch-pencil icon and a precise text wordmark. Update navigation/footer/Studio branding, accessible labels, page and social metadata, route titles, contact download names and exported-email attribution. Update the platform icon once the final logo is available. Preserve the existing `copymail-workspace-v1` storage key so previously saved projects and drafts remain accessible; internal folder names and historical source brief need not change. Keep server/database off: the prior Claude backend enablement request is still unapproved, and this branding request does not approve it.
