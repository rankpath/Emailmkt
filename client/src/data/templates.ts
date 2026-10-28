export const images = {
  skincare: "/manus-storage/async-images/AulRzkfQrkJaCW6nsp5OjE/image-1.webp",
  headphones: "/manus-storage/async-images/AulRzkfQrkJaCW6nsp5OjE/image-2.webp",
  travel: "/manus-storage/async-images/AulRzkfQrkJaCW6nsp5OjE/image-3.webp",
};

export type BlockType = "heading" | "text" | "image" | "button" | "divider";
export type EmailBlock = {
  id: string;
  type: BlockType;
  content: string;
  url?: string;
};
export type EmailDocument = {
  id: string;
  name: string;
  brand: string;
  category: string;
  accent: string;
  background: string;
  color: string;
  style: "editorial" | "bold" | "minimal" | "travel";
  blocks: EmailBlock[];
  projectId?: string;
  updatedAt?: string;
};

const block = (type: BlockType, content: string, url?: string): EmailBlock => ({
  id: `${type}-${Math.random().toString(36).slice(2, 9)}`,
  type,
  content,
  url,
});
function template(
  id: string,
  name: string,
  brand: string,
  category: string,
  style: EmailDocument["style"],
  accent: string,
  background: string,
  color: string,
  heading: string,
  body: string,
  button: string,
  image?: string
): EmailDocument {
  const blocks: EmailBlock[] = [block("heading", heading)];
  if (image) blocks.push(block("image", image, "Campaign product photography"));
  blocks.push(
    block("text", body),
    block("button", button, "https://example.com"),
    block("divider", ""),
    block(
      "text",
      "Good things, delivered. Thanks for being part of our community."
    )
  );
  return {
    id,
    name,
    brand,
    category,
    style,
    accent,
    background,
    color,
    blocks,
  };
}

export const templates: EmailDocument[] = [
  template(
    "daily-ritual",
    "The daily ritual",
    "BOTANICA",
    "E-commerce",
    "editorial",
    "#394b3c",
    "#f3eee5",
    "#29382c",
    "A little care.\nA lot of glow.",
    "Meet your new everyday essentials. Thoughtful ingredients, effortless rituals, and a little moment just for you.",
    "Find your ritual",
    images.skincare
  ),
  template(
    "sound-on",
    "Sound on. World off.",
    "MONO®",
    "Promotional",
    "bold",
    "#F4F1FA",
    "#7646D6",
    "#FFFFFF",
    "SOUND ON.\nWORLD OFF.",
    "Your soundtrack. Your space. Discover a new kind of listening with the MONO collection.",
    "Meet your new sound",
    images.headphones
  ),
  template(
    "coastal-notes",
    "Postcards from the coast",
    "elsewhere.",
    "Newsletter",
    "travel",
    "#a34129",
    "#fbf5ed",
    "#44392f",
    "A slower kind\nof summer.",
    "Salt in the air. Sun on your skin. Your next chapter is waiting on the Mediterranean coast.",
    "Find your elsewhere",
    images.travel
  ),
  template(
    "welcome-home",
    "A warm welcome",
    "orbit",
    "SaaS",
    "minimal",
    "#5b4e93",
    "#f1eef9",
    "#2f2948",
    "Big ideas.\nMeet your new home.",
    "You are in! A little less busywork and a little more possibility. Let’s build something brilliant together.",
    "Explore your workspace"
  ),
  template(
    "order-confirmed",
    "Order, confirmed",
    "FORM & FIELD",
    "Transactional",
    "editorial",
    "#353b31",
    "#f4f1e9",
    "#31392f",
    "Good things\nare on their way.",
    "Your order is confirmed. We are getting everything ready and will send you a tracking link as soon as it ships.",
    "View your order",
    images.skincare
  ),
  template(
    "weekend-escape",
    "The weekend edit",
    "WANDER",
    "Travel",
    "travel",
    "#174d5e",
    "#edf3f1",
    "#174454",
    "Out of office.\nInto the blue.",
    "Trade your everyday for something extraordinary. Our favorite coastal escapes are closer than you think.",
    "Plan your escape",
    images.travel
  ),
  template(
    "new-drop",
    "Meet the new drop",
    "MONO®",
    "E-commerce",
    "bold",
    "#F4F1FA",
    "#7646D6",
    "#FFFFFF",
    "LESS NOISE.\nMORE YOU.",
    "Made for the moments that matter. Explore our latest collection of beautifully simple audio essentials.",
    "Shop the new drop",
    images.headphones
  ),
  template(
    "weekly-brief",
    "The weekly brief",
    "THE EDIT",
    "Newsletter",
    "minimal",
    "#222222",
    "#f1f0ec",
    "#222222",
    "Worth your\nattention.",
    "Fresh perspectives. Thoughtful ideas. Here are three things worth taking a little time for this week.",
    "Read the latest"
  ),
  template(
    "launch-day",
    "It’s launch day",
    "FOCUS",
    "SaaS",
    "bold",
    "#7646D6",
    "#F4F1FA",
    "#170528",
    "YOUR NEXT\nBIG THING.",
    "The tools to turn “one day” into day one. Our latest update is designed to help you do your best work.",
    "See what’s new"
  ),
  template(
    "back-in-stock",
    "Back by popular demand",
    "BOTANICA",
    "Promotional",
    "editorial",
    "#4b573a",
    "#f5f0e5",
    "#35432f",
    "You asked.\nWe listened.",
    "Your favorite everyday essentials are back. A little care for yourself, or someone you love.",
    "Rediscover your favorites",
    images.skincare
  ),
  template(
    "getting-started",
    "Your first steps",
    "orbit",
    "Onboarding",
    "minimal",
    "#574699",
    "#f1eef9",
    "#33284b",
    "Make yourself\nat home.",
    "Three simple steps to make your workspace your own: create your first project, invite your ideas, and start building.",
    "Create your first project"
  ),
  template(
    "thank-you",
    "A little thank you",
    "elsewhere.",
    "Transactional",
    "travel",
    "#a34129",
    "#fbf4ea",
    "#45372d",
    "For the memories.\nAnd the next ones.",
    "Thank you for joining us. We hope your time away brought a little more wonder to your everyday.",
    "Discover your next chapter",
    images.travel
  ),
];

export const categories = [
  "All templates",
  "Newsletter",
  "E-commerce",
  "Promotional",
  "SaaS",
  "Transactional",
  "Onboarding",
  "Travel",
];
export function filterTemplates(query: string, category: string) {
  const search = query.trim().toLowerCase();
  return templates.filter(
    t =>
      (category === "All templates" || t.category === category) &&
      `${t.name} ${t.brand} ${t.category}`.toLowerCase().includes(search)
  );
}
export function freshDocument(
  source: EmailDocument,
  projectId?: string
): EmailDocument {
  return {
    ...source,
    id: crypto.randomUUID(),
    projectId,
    updatedAt: new Date().toISOString(),
    blocks: source.blocks.map(b => ({ ...b, id: crypto.randomUUID() })),
  };
}
