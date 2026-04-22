// Data store utility — reads from localStorage if available, falls back to static data
import { resumeData } from "@/data/resumeData";

const STORAGE_KEYS = {
  projects: "portfolio_research_projects",
  publications: "portfolio_publications",
  blogPosts: "portfolio_blog_posts",
} as const;

export interface ManagedProject {
  id: string;
  title: string;
  problem: string;
  approach: string;
  finding?: string;
  stack?: string;
  status: string;
  priority: "major" | "minor";
  progress: number; // 0-100
  lastUpdated: string;
}

export interface ManagedPublication {
  id: string;
  authors: string;
  title: string;
  venue: string;
  status: string;
  priority: "major" | "minor";
  progress: number;
  lastUpdated: string;
}

export interface ManagedBlogPost {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "in-progress" | "ready" | "published";
  content?: string;
  lastUpdated: string;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function now(): string {
  return new Date().toISOString();
}

// --- Projects ---

export function getProjects(): ManagedProject[] {
  const stored = localStorage.getItem(STORAGE_KEYS.projects);
  if (stored) return JSON.parse(stored);
  // Seed from static data
  return resumeData.researchProjects.map((p) => ({
    id: generateId(),
    title: p.title,
    problem: p.problem,
    approach: p.approach,
    finding: p.finding,
    stack: p.stack,
    status: p.status,
    priority: "major" as const,
    progress: 20,
    lastUpdated: now(),
  }));
}

export function saveProjects(projects: ManagedProject[]): void {
  localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
}

// --- Publications ---

export function getPublications(): ManagedPublication[] {
  const stored = localStorage.getItem(STORAGE_KEYS.publications);
  if (stored) return JSON.parse(stored);
  return resumeData.publications.map((p) => ({
    id: generateId(),
    authors: p.authors,
    title: p.title,
    venue: p.venue,
    status: p.status,
    priority: "major" as const,
    progress: 10,
    lastUpdated: now(),
  }));
}

export function savePublications(pubs: ManagedPublication[]): void {
  localStorage.setItem(STORAGE_KEYS.publications, JSON.stringify(pubs));
}

// --- Blog Posts ---

export function getBlogPosts(): ManagedBlogPost[] {
  const stored = localStorage.getItem(STORAGE_KEYS.blogPosts);
  if (stored) return JSON.parse(stored);
  return resumeData.blogPosts.map((p) => ({
    id: generateId(),
    title: p.title,
    slug: p.slug,
    status: (p.status as any) || "draft",
    content: p.content,
    lastUpdated: now(),
  }));
}

export function saveBlogPosts(posts: ManagedBlogPost[]): void {
  localStorage.setItem(STORAGE_KEYS.blogPosts, JSON.stringify(posts));
}

// --- Public getters (for display components) ---

export function getPublicProjects() {
  return getProjects().map((p) => ({
    title: p.title,
    problem: p.problem,
    approach: p.approach,
    finding: p.finding,
    stack: p.stack,
    status: p.status,
  }));
}

export function getPublicPublications() {
  return getPublications().map((p) => ({
    authors: p.authors,
    title: p.title,
    venue: p.venue,
    status: p.status,
  }));
}

export function getPublicBlogPosts() {
  return getBlogPosts().map((p) => ({
    title: p.title,
    slug: p.slug,
  }));
}
