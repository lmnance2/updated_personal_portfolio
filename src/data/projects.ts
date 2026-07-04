/**
 * All projects: 6 featured (gallery composition) + archive.
 * Hardcoded at build time. No runtime API calls.
 */

export type ProjectCategory =
  | "ML"
  | "AI"
  | "Frontend"
  | "Backend"
  | "Database"
  | "Full-Stack"
  | "CV"
  | "Mobile"
  | "Research";

export type Project = {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  techTags: string[];
  categories: ProjectCategory[];
  githubUrl?: string;
  featured: boolean;
  featuredSlot?: 1 | 2 | 3 | 4 | 5 | 6;
};

const gh = (repo: string) => `https://github.com/lmnance2/${repo}`;

export const PROJECTS: Project[] = [
  // Featured (slots 1-6, shown in default gallery composition)
  {
    slug: "ursa",
    name: "URSA Spring 2025 Research Framework",
    description:
      "Deep-learning research framework for vehicle classification from multimodal IoT data. Combines spectrograms of audio and vibration with Vision Transformers, and includes self-supervised pretraining for sparse-label regimes.",
    longDescription:
      "Built as my URSA undergraduate research project. Includes supervised and self-supervised pipelines, dataset tooling, and an evaluation harness. Self-supervised pretraining cut training epochs by 40 percent and improved accuracy by more than 20 percent on the held-out set.",
    techTags: ["Python", "PyTorch", "TensorFlow", "NumPy", "Pandas"],
    categories: ["ML", "AI", "Research"],
    githubUrl: gh("URSA"),
    featured: true,
    featuredSlot: 1,
  },
  {
    slug: "law-testing-mvp",
    name: "Law Testing MVP",
    description:
      "React MVP that reads legal documents, compares clauses across versions, and flags risk using a custom OpenAI agent. Shipped as the Disruption Lab law-tech pilot.",
    longDescription:
      "A React and Tailwind frontend wired to a custom OpenAI agent. Handles upload, parse, diff, and flag for legal documents. Used in a UIUC, IBKR, and Bridgewater trading competition variant as the document-grounded chatbot UI.",
    techTags: ["React", "TypeScript", "OpenAI API", "Tailwind"],
    categories: ["AI", "Frontend"],
    githubUrl: gh("Law-Testing-MVP"),
    featured: true,
    featuredSlot: 2,
  },
  {
    slug: "event-consolidator",
    name: "Event Consolidator",
    description:
      "Next.js full-stack app that scrapes, dedupes, and re-publishes campus events into a single feed. Postgres-backed with a typed API layer.",
    longDescription:
      "Next.js App Router on top of Postgres. Includes an ingestion worker that pulls from multiple campus sources, a dedupe pass that handles fuzzy title matches, and a clean public feed. Designed to be drop-in for any university.",
    techTags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    categories: ["Frontend", "Backend", "Full-Stack", "Database"],
    githubUrl: gh("Event-Consolidator"),
    featured: true,
    featuredSlot: 3,
  },
  {
    slug: "cnn-cv-projects",
    name: "CNN Computer Vision Projects",
    description:
      "A pack of TensorFlow and Keras CNN projects for image classification and segmentation. Covers data prep, augmentation, training, and evaluation.",
    longDescription:
      "Five small CNN projects in one repo. Covers image classification on CIFAR variants, a transfer-learning fine-tune, and segmentation on a small medical dataset. Designed as a reference repo I can lift modules out of.",
    techTags: ["Python", "TensorFlow", "Keras", "NumPy"],
    categories: ["ML", "AI", "CV"],
    githubUrl: gh("cnn-cv-projects"),
    featured: true,
    featuredSlot: 4,
  },
  {
    slug: "opencv2-projects",
    name: "OpenCV2 Projects",
    description:
      "Real-time computer vision experiments using OpenCV. Includes face mesh tracking, hand pose, gesture control, and a webcam-driven volume control.",
    longDescription:
      "A toolbox of small but complete real-time CV demos. Each one is a self-contained script with a clear input pipeline, OpenCV processing, and a runnable display loop. Useful as building blocks for larger CV apps.",
    techTags: ["Python", "OpenCV", "NumPy"],
    categories: ["CV", "Backend"],
    githubUrl: gh("OpenCV2-projects"),
    featured: true,
    featuredSlot: 5,
  },
  {
    slug: "webview-wrapper",
    name: "WebView Wrapper (Android)",
    description:
      "Kotlin and Jetpack Compose Android shell that wraps a web app as a native client, with deep-link routing and offline cache hints.",
    longDescription:
      "Android shell I wrote at Brunswick as the host for the LangGraph boating agent demo. Kotlin plus Jetpack Compose, a WebView, custom deep-link routing, and a small JS bridge for native dialogs.",
    techTags: ["Kotlin", "Jetpack Compose", "Android Studio"],
    categories: ["Mobile"],
    githubUrl: gh("webview_wrapper_test"),
    featured: true,
    featuredSlot: 6,
  },

  // Archive
  {
    slug: "friendly-fineprint",
    name: "Friendly Fineprint",
    description:
      "A React Chrome extension that detects ToS and privacy policies on any site, then summarizes and flags potentially harmful clauses.",
    longDescription:
      "React + TypeScript Chrome extension that detects ToS / privacy text on any page. OpenAI API backend extracts, analyzes, and flags non-standard or harmful terms. Built a non-blocking inline summary card with a severity scale.",
    techTags: ["React", "TypeScript", "OpenAI API"],
    categories: ["Frontend", "AI"],
    featured: false,
  },
  {
    slug: "systems-projects",
    name: "Systems Projects",
    description:
      "A semester of low-level C work: a shell, a custom filesystem, and a multithreaded TCP server.",
    longDescription:
      "Rebuilt a Unix-style command shell in C with argument parsing, file manipulation, and the fork/exec/wait pattern. Designed a custom file system in C with inodes, data blocks, and page directories. Built a TCP server/client over epoll and pthreads to handle concurrent CRUD operations.",
    techTags: ["C", "Linux", "Bash"],
    categories: ["Backend"],
    featured: false,
  },
  {
    slug: "ubermate",
    name: "Ubermate Cleaning",
    description:
      "A NOBE student venture matching college students with local cleaners. Next.js frontend and Mongo schemas.",
    longDescription:
      "Multi-page Next.js + Tailwind frontend connecting students with vetted cleaners. Designed MongoDB schemas for user data, service requests, and cleaner profiles.",
    techTags: ["Next.js", "Tailwind", "MongoDB", "React"],
    categories: ["Frontend", "Full-Stack", "Database"],
    featured: false,
  },
  {
    slug: "runbuddies",
    name: "RunBuddies",
    description:
      "An Android app that matches runners by pace and route, with realtime tracking on Google Maps.",
    longDescription:
      "Android app with Google Maps API and real-time route tracking. Matchmaking + Firebase backend for chat and run history with 50+ active users.",
    techTags: ["Java", "Firebase", "Android Studio"],
    categories: ["Mobile", "Backend"],
    featured: false,
  },
  {
    slug: "portfolio",
    name: "This Site",
    description:
      "The site you're on. Built to be readable, opinionated, and easy to extend.",
    longDescription:
      "Next.js 16 App Router, React 19, Tailwind v4. Custom skill graph, accessible reduced-motion paths, and a section carousel for the personal page.",
    techTags: ["Next.js", "React", "TypeScript", "Tailwind"],
    categories: ["Frontend"],
    featured: false,
  },
  {
    slug: "calories-burnt-predictor",
    name: "Calories Burnt Predictor",
    description:
      "Regression model that predicts calories burnt from workout features. Pandas and scikit-learn end to end.",
    longDescription:
      "An early ML project. Includes EDA, feature engineering, and an XGBoost regressor with cross-validation. Clean notebook plus a small CLI predictor.",
    techTags: ["Python", "Pandas", "scikit-learn"],
    categories: ["ML"],
    githubUrl: gh("calories-burnt-predictor"),
    featured: false,
  },
  {
    slug: "titanic-survival",
    name: "Titanic Survival Classification",
    description:
      "Classic Kaggle Titanic dataset, worked end to end with feature engineering, model selection, and a writeup.",
    longDescription:
      "The classic. Implemented as a learning exercise. Includes baseline, feature engineering, hyperparameter search, and a markdown writeup of what moved the score and what did not.",
    techTags: ["Python", "Pandas", "scikit-learn"],
    categories: ["ML"],
    githubUrl: gh("Titanic-Survival-Classification"),
    featured: false,
  },
  {
    slug: "javascript-amazon",
    name: "JavaScript Amazon Project",
    description:
      "Vanilla JS clone of an Amazon-style shopping flow. Cart, checkout, order tracking, no framework.",
    longDescription:
      "Built from a course but extended. Vanilla JS, HTML, CSS only. Cart state in localStorage, simulated checkout, and a tiny order tracking flow.",
    techTags: ["JavaScript", "HTML", "CSS"],
    categories: ["Frontend"],
    githubUrl: gh("Javascript-amazon-project"),
    featured: false,
  },
  {
    slug: "node-express",
    name: "Node Express Tutorial",
    description:
      "Node and Express server with REST routes, middleware, and MongoDB persistence. Backend learning exercise.",
    longDescription:
      "REST API in Node and Express against MongoDB. Includes auth middleware, request logging, error handling, and a small client to exercise the routes.",
    techTags: ["Node", "Express", "MongoDB"],
    categories: ["Backend"],
    githubUrl: gh("Node-Express-Tutorial"),
    featured: false,
  },
];

export const ALL_CATEGORIES: ProjectCategory[] = [
  "ML",
  "AI",
  "Frontend",
  "CV",
  "Backend",
  "Mobile",
  "Full-Stack",
  "Database",
  "Research",
];

export function countByCategory(cat: ProjectCategory | "All") {
  if (cat === "All") return PROJECTS.length;
  return PROJECTS.filter((p) => p.categories.includes(cat)).length;
}
