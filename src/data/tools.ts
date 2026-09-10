export type Tool = {
  id: string;
  name: string;
  maker: string;
  category: string;
  tags: string[];
  blurb: string;
  description: string;
  bestFor: string;
  url: string;
  color: string;
  logo: string;
  stars: string;
  type: "Free tier" | "Open source" | "Paid";
  featured?: boolean;
};

export const categories = ["All tools", "Build", "Design", "Ship", "Think", "Create"];

export const tools: Tool[] = [
  { id: "cursor", name: "Cursor", maker: "Anysphere", category: "Build", tags: ["Code", "Agent", "IDE"], blurb: "The code editor that understands your whole codebase.", description: "A thoughtful, AI-first code editor for moving from a fuzzy idea to a working feature without losing control.", bestFor: "Building products with an AI pair programmer", url: "https://www.cursor.com", color: "#77e5f5", logo: "C", stars: "4.8", type: "Paid", featured: true },
  { id: "v0", name: "v0", maker: "Vercel", category: "Build", tags: ["UI", "React", "Prototype"], blurb: "Turn prompts into production-ready React interfaces.", description: "Describe a product surface in plain language, then refine the generated code in a visual loop.", bestFor: "High-fidelity UI prototypes and React starters", url: "https://v0.dev", color: "#e7eef5", logo: "v0", stars: "4.7", type: "Free tier", featured: true },
  { id: "claude", name: "Claude", maker: "Anthropic", category: "Think", tags: ["Reasoning", "Writing", "Research"], blurb: "A calm, capable thinking partner for complex work.", description: "Long-context reasoning with a clear writing voice and strong attention to nuance.", bestFor: "Research, planning, writing and untangling hard problems", url: "https://claude.ai", color: "#f2a681", logo: "C", stars: "4.9", type: "Free tier", featured: true },
  { id: "perplexity", name: "Perplexity", maker: "Perplexity AI", category: "Think", tags: ["Search", "Research", "Sources"], blurb: "Research the web with answers that show their work.", description: "An answer engine built for quick, source-backed research instead of ten open tabs.", bestFor: "Fast research with citations", url: "https://www.perplexity.ai", color: "#76d8d0", logo: "P", stars: "4.6", type: "Free tier" },
  { id: "figma", name: "Figma", maker: "Figma", category: "Design", tags: ["Design", "Prototyping", "Collab"], blurb: "The shared canvas for shaping what gets built.", description: "Design, prototype and hand off in one collaborative space that your whole team can open.", bestFor: "Interface design and collaborative prototyping", url: "https://www.figma.com", color: "#ff7568", logo: "F", stars: "4.8", type: "Free tier" },
  { id: "bolt", name: "Bolt.new", maker: "StackBlitz", category: "Build", tags: ["Full stack", "Browser", "Deploy"], blurb: "A full-stack app builder that runs in your browser.", description: "Prompt, run and deploy a real web app without local setup. Great for testing an idea's shape.", bestFor: "Going from concept to a shareable app in an afternoon", url: "https://bolt.new", color: "#a9e47a", logo: "B", stars: "4.5", type: "Free tier" },
  { id: "lovable", name: "Lovable", maker: "Lovable", category: "Build", tags: ["Full stack", "No-code", "SaaS"], blurb: "Build a real app by describing what you want.", description: "An accessible route from product idea to working web app, with editable code when you are ready.", bestFor: "Beginners shipping their first useful app", url: "https://lovable.dev", color: "#ff8a69", logo: "L", stars: "4.5", type: "Free tier" },
  { id: "runway", name: "Runway", maker: "Runway AI", category: "Create", tags: ["Video", "Generative", "Motion"], blurb: "Shape cinematic motion from a single sentence.", description: "Generative video tools for concepting, storyboarding and producing visual work.", bestFor: "Visual stories, motion tests and social creative", url: "https://runwayml.com", color: "#c9b7ff", logo: "R", stars: "4.6", type: "Paid" },
  { id: "midjourney", name: "Midjourney", maker: "Midjourney", category: "Create", tags: ["Image", "Art direction", "Concepts"], blurb: "Make a visual direction before you make a moodboard.", description: "A distinctive image generation studio for concept art, worlds and visual exploration.", bestFor: "Art direction and expressive image concepts", url: "https://www.midjourney.com", color: "#e0c4ff", logo: "M", stars: "4.7", type: "Paid" },
  { id: "supabase", name: "Supabase", maker: "Supabase", category: "Ship", tags: ["Database", "Auth", "Backend"], blurb: "The open source backend for your next project.", description: "Postgres database, authentication, storage and edge functions in one clear toolkit.", bestFor: "Shipping a production-ready backend quickly", url: "https://supabase.com", color: "#71e6ac", logo: "S", stars: "4.8", type: "Free tier", featured: true },
  { id: "vercel", name: "Vercel", maker: "Vercel", category: "Ship", tags: ["Deploy", "Frontend", "Edge"], blurb: "Deploy the web without managing the machinery.", description: "A fast, opinionated home for frontend projects with excellent previews and edge delivery.", bestFor: "Deploying web apps with confidence", url: "https://vercel.com", color: "#e7eef5", logo: "▲", stars: "4.8", type: "Free tier" },
  { id: "github-copilot", name: "GitHub Copilot", maker: "GitHub", category: "Build", tags: ["Code", "IDE", "Review"], blurb: "A familiar pair of hands inside your editor.", description: "Code completion and chat grounded in your repositories, right where you already work.", bestFor: "Developers who want AI in an existing workflow", url: "https://github.com/features/copilot", color: "#b9c6ff", logo: "GH", stars: "4.6", type: "Paid" },
];

export const templates = [
  { id: "launch-page", title: "Launch page", eyebrow: "SHIP IN A WEEKEND", description: "A crisp landing page with a waitlist and a story people can scan.", icon: "↗", tools: ["v0", "Figma", "Vercel"] },
  { id: "micro-saas", title: "Micro SaaS", eyebrow: "A REAL PRODUCT", description: "Auth, billing-ready architecture and a place for your first users.", icon: "◇", tools: ["Cursor", "Supabase", "Vercel"] },
  { id: "content-engine", title: "Content engine", eyebrow: "MAKE MORE SIGNAL", description: "Research, shape and publish a repeatable point of view.", icon: "◎", tools: ["Perplexity", "Claude", "Figma"] },
  { id: "visual-world", title: "Visual world", eyebrow: "START WITH A FEELING", description: "A tight visual direction for a campaign, game or new brand.", icon: "✦", tools: ["Midjourney", "Runway", "Figma"] },
];

export const prompts = [
  { title: "The sharp brief", category: "Start here", body: "I want to build [thing] for [specific person]. The moment it should improve is [moment]. Ask me five questions before recommending a stack." },
  { title: "Stress-test the idea", category: "Think", body: "Act as a skeptical product lead. Here is my idea: [idea]. Find the riskiest assumption, the fastest test, and what I should not build yet." },
  { title: "Make it feel real", category: "Build", body: "Turn this feature list into a small, shippable v1: [features]. Suggest the simplest data model, screen list and implementation order." },
  { title: "Find the visual edge", category: "Design", body: "Give me three distinct art directions for [product]. For each, name the audience feeling, type system, color tension and a reference point." },
];