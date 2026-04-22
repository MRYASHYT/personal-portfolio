import { resumeData } from "@/data/resumeData";

export interface ManagedProject {
  id: string;
  title: string;
  problem: string;
  approach: string;
  finding?: string;
  stack?: string;
  status: string;
  priority: "major" | "minor";
  progress: number;
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

export interface PortfolioData {
  projects: ManagedProject[];
  publications: ManagedPublication[];
  blogPosts: ManagedBlogPost[];
}

const API_ENDPOINT = "/api/portfolio";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function now(): string {
  return new Date().toISOString();
}

// Default state if KV is empty
const getDefaultData = (): PortfolioData => ({
  projects: resumeData.researchProjects.map((p) => ({
    id: generateId(),
    title: p.title,
    problem: p.problem,
    approach: p.approach,
    finding: p.finding,
    stack: p.stack,
    status: p.status,
    priority: "major",
    progress: 20,
    lastUpdated: now(),
  })),
  publications: resumeData.publications.map((p) => ({
    id: generateId(),
    authors: p.authors,
    title: p.title,
    venue: p.venue,
    status: p.status,
    priority: "major",
    progress: 10,
    lastUpdated: now(),
  })),
  blogPosts: resumeData.blogPosts.map((p) => ({
    id: generateId(),
    title: p.title,
    slug: p.slug,
    status: (p.status as any) || "draft",
    content: p.content,
    lastUpdated: now(),
  })),
});

export async function fetchPortfolioData(): Promise<PortfolioData> {
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    
    // Check if data is empty (first initialization)
    if (Object.keys(data).length === 0) {
      return getDefaultData();
    }
    
    return data as PortfolioData;
  } catch (err) {
    console.error("Data fetch error, using local defaults:", err);
    return getDefaultData();
  }
}

export async function savePortfolioData(data: PortfolioData, password?: string): Promise<boolean> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": password || "",
      },
      body: JSON.stringify(data),
    });
    
    return response.ok;
  } catch (err) {
    console.error("Save error:", err);
    return false;
  }
}

// Temporary compatibility helpers for UI components while transitioning
export function getPublicProjects(data: PortfolioData) {
  return data.projects.map((p) => ({
    title: p.title,
    problem: p.problem,
    approach: p.approach,
    finding: p.finding,
    stack: p.stack,
    status: p.status,
  }));
}

export function getPublicPublications(data: PortfolioData) {
  return data.publications.map((p) => ({
    authors: p.authors,
    title: p.title,
    venue: p.venue,
    status: p.status,
  }));
}

export function getPublicBlogPosts(data: PortfolioData) {
  return data.blogPosts
    .filter(p => p.status === "published")
    .map((p) => ({
      title: p.title,
      slug: p.slug,
    }));
}
