/**
 * Single source of truth for resume content. Each experience and project lists
 * the skills it touches. The SkillGraph component filters by ALL selected
 * skills using AND logic.
 */

export type SkillGroup = "Languages" | "Frameworks" | "Tools";

export type Skill = {
  name: string;
  group: SkillGroup;
};

export const SKILLS: Skill[] = [
  // Languages
  { name: "Python", group: "Languages" },
  { name: "TypeScript", group: "Languages" },
  { name: "Java", group: "Languages" },
  { name: "C++", group: "Languages" },
  { name: "C", group: "Languages" },
  { name: "JavaScript", group: "Languages" },
  { name: "Kotlin", group: "Languages" },
  { name: "SQL", group: "Languages" },
  { name: "Bash", group: "Languages" },
  // Frameworks
  { name: "React", group: "Frameworks" },
  { name: "Next.js", group: "Frameworks" },
  { name: "Node", group: "Frameworks" },
  { name: "Express", group: "Frameworks" },
  { name: "Tailwind", group: "Frameworks" },
  { name: "Jetpack Compose", group: "Frameworks" },
  { name: "LangGraph", group: "Frameworks" },
  { name: "OpenAI API", group: "Frameworks" },
  { name: "PyTorch", group: "Frameworks" },
  { name: "TensorFlow", group: "Frameworks" },
  { name: "OpenCV", group: "Frameworks" },
  { name: "Pandas", group: "Frameworks" },
  { name: "NumPy", group: "Frameworks" },
  // Tools / Cloud
  { name: "AWS", group: "Tools" },
  { name: "Azure", group: "Tools" },
  { name: "Firebase", group: "Tools" },
  { name: "MongoDB", group: "Tools" },
  { name: "PostgreSQL", group: "Tools" },
  { name: "Linux", group: "Tools" },
  { name: "Android Studio", group: "Tools" },
  { name: "Godot", group: "Tools" },
];

export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  dates: string;
  summary: string;
  bullets: string[];
  skills: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    id: "brunswick",
    company: "Brunswick Corporation",
    role: "Backend Development Intern",
    location: "Champaign, IL",
    dates: "May 2025 to May 2026",
    summary:
      "Built a CV pipeline, a LangGraph boating agent on Azure, and an Android client for a CES demo to the CEO of a $5B company.",
    bullets: [
      "Engineered a computer vision pipeline using template matching and AI integration to extract nautical symbols from PDFs. Improved accuracy by 45%+ and saved an estimated $500K+ annually.",
      "Built an AI boating agent using LangGraph with tool-calling, deployed to Azure and shown by Brunswick at the Consumer Electronics Show (CES).",
      "Developed a full-stack Android app in Kotlin and Jetpack Compose for the agent, integrating LLM API calls and dynamic UI for a CEO-level presentation.",
    ],
    skills: ["Python", "LangGraph", "Azure", "OpenCV", "Kotlin", "Jetpack Compose", "Android Studio"],
  },
  {
    id: "openmind",
    company: "OpenMind AI",
    role: "Software Development Intern",
    location: "Remote",
    dates: "Jan 2026 to May 2026",
    summary:
      "Shipped a gamified habit-loop product in Godot plus a React companion site, designed with a Brown psychology researcher.",
    bullets: [
      "Ideated and developed a gamified approach in Godot to rewire habit loops, working from psychological techniques contributed by a Brown University psychology researcher.",
      "Built and deployed a companion React-based website that wraps the OpenAI API with custom system prompts.",
    ],
    skills: ["Godot", "React", "OpenAI API", "TypeScript", "Tailwind"],
  },
  {
    id: "ursa",
    company: "URSA Undergraduate Research",
    role: "Undergraduate Researcher",
    location: "Champaign, IL",
    dates: "Jan 2025 to May 2025",
    summary:
      "Designed deep-learning pipelines that classify vehicles from multimodal IoT data (audio + vibration) using Vision Transformers.",
    bullets: [
      "Designed a deep-learning pipeline to classify vehicle types from multimodal IoT data (audio + vibration) using spectrograms and Vision Transformers.",
      "Built supervised and self-supervised pipelines to improve accuracy on sparse datasets.",
      "Achieved 20%+ accuracy improvement and 40% reduction in training epochs through self-supervised pretraining.",
    ],
    skills: ["Python", "PyTorch", "TensorFlow", "NumPy", "Pandas"],
  },
  {
    id: "disruption",
    company: "Disruption Lab",
    role: "Project Manager",
    location: "Champaign, IL",
    dates: "Jan 2025 to May 2026",
    summary:
      "Ran market research and shipped a Next.js MVP plus a custom AI chatbot used in a UIUC / IBKR / Bridgewater trading competition.",
    bullets: [
      "Conducted market research and client interviews to launch a subscription model for an AI-powered patent search tool. Connected the client with a $20B+ enterprise partner.",
      "Developed a Next.js MVP that uses AI to review, compare, and store legal documents, streamlining client workflows.",
      "Built a custom AI chatbot (model selection, system prompts, document grounding) and a companion site used in a UIUC, IBKR, and Bridgewater trading competition.",
    ],
    skills: ["Next.js", "React", "TypeScript", "OpenAI API", "Tailwind", "MongoDB"],
  },
];

export type Project = {
  id: string;
  title: string;
  dates: string;
  blurb: string;
  bullets: string[];
  skills: string[];
  /** Composition slot for the gallery layout. */
  variant: "feature" | "wide" | "card" | "terra";
  /** Optional links revealed in the Sheet. */
  github?: string;
  demo?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "friendly-fineprint",
    title: "Friendly Fineprint",
    dates: "Jul 2025",
    blurb:
      "A React Chrome extension that detects ToS and privacy policies on any site, then summarizes and flags potentially harmful clauses.",
    bullets: [
      "React + TypeScript Chrome extension that detects ToS / privacy text on any page.",
      "OpenAI API backend extracts, analyzes, and flags non-standard or harmful terms.",
      "Built a non-blocking inline summary card with a severity scale.",
    ],
    skills: ["React", "TypeScript", "OpenAI API"],
    variant: "feature",
  },
  {
    id: "systems-projects",
    title: "Systems projects",
    dates: "Jan 2026 to May 2026",
    blurb:
      "A semester of low-level C work: a shell, a custom filesystem, and a multithreaded TCP server. The terminal feel earns the terracotta surface.",
    bullets: [
      "Rebuilt a Unix-style command shell in C with argument parsing, file manipulation, and the fork/exec/wait pattern.",
      "Designed a custom file system in C with inodes, data blocks, and page directories.",
      "Built a TCP server/client over epoll and pthreads to handle concurrent CRUD operations.",
    ],
    skills: ["C", "Linux", "Bash"],
    variant: "terra",
  },
  {
    id: "ubermate",
    title: "Ubermate Cleaning",
    dates: "Jan 2025 to May 2025",
    blurb:
      "A NOBE student venture matching college students with local cleaners. I built the Next.js frontend and the Mongo schemas.",
    bullets: [
      "Multi-page Next.js + Tailwind frontend connecting students with vetted cleaners.",
      "Designed MongoDB schemas for user data, service requests, and cleaner profiles.",
    ],
    skills: ["Next.js", "Tailwind", "MongoDB", "React"],
    variant: "card",
  },
  {
    id: "runbuddies",
    title: "RunBuddies",
    dates: "Sep 2022 to Dec 2022",
    blurb:
      "An Android app that matches runners by pace and route, with realtime tracking on Google Maps.",
    bullets: [
      "Android app with Google Maps API and real-time route tracking.",
      "Matchmaking + Firebase backend for chat and run history with 50+ active users.",
    ],
    skills: ["Java", "Firebase", "Android Studio"],
    variant: "card",
  },
  {
    id: "annotated-iliad",
    title: "Annotated Iliad (in progress)",
    dates: "2026",
    blurb:
      "A digital annotated edition of Lattimore's Iliad, with cross-references, character maps, and a search index over the full text.",
    bullets: [
      "Parsed and tokenized a clean public-domain text into a searchable index.",
      "Designed a side-by-side annotation UI for context, glossary, and references.",
      "Next.js + Postgres-backed; full text search across 24 books.",
    ],
    skills: ["Next.js", "TypeScript", "PostgreSQL"],
    variant: "card",
  },
  {
    id: "portfolio",
    title: "this site",
    dates: "2026",
    blurb:
      "The site you're on. Built to be readable, opinionated, and easy to extend as I add projects.",
    bullets: [
      "Next.js 16 App Router, React 19, Tailwind v4.",
      "Custom skill graph, accessible reduced-motion paths, and 7 hidden surprises.",
    ],
    skills: ["Next.js", "React", "TypeScript", "Tailwind"],
    variant: "card",
  },
];

export const EXTRACURRICULARS = [
  { name: "ACM SigAida", role: "Member" },
  { name: "Disruption Lab", role: "Project Manager" },
  { name: "Dev Ada", role: "Member" },
  { name: "NOBE", role: "Builder" },
  { name: "Euchre Club", role: "Member" },
];

export const COURSEWORK = [
  "Data Structures",
  "Algorithms",
  "Discrete Structures",
  "Computer Architecture",
  "Systems Programming",
  "Database Systems",
  "Linear Algebra",
  "Probability and Statistics for CS",
  "Numerical Methods",
  "IBM Data Science",
];
