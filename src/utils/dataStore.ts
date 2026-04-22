import { resumeData } from "@/data/resumeData";
import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const SUBAPASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(SUBAPASE_URL, SUPABASE_ANON_KEY);

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

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function now(): string {
  return new Date().toISOString();
}

// Default state if Supabase is empty
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
    const { data, error } = await supabase
      .from("portfolio_config")
      .select("data")
      .eq("id", 1)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // Table found but row 1 missing, try to create it
        const defaultData = getDefaultData();
        await supabase.from("portfolio_config").insert([{ id: 1, data: defaultData }]);
        return defaultData;
      }
      throw error;
    }

    // If data is empty object or null, use default
    if (!data?.data || Object.keys(data.data).length === 0) {
      return getDefaultData();
    }
    
    return data.data as PortfolioData;
  } catch (err) {
    console.error("Supabase fetch error, using local defaults:", err);
    return getDefaultData();
  }
}

export async function savePortfolioData(data: PortfolioData, _password?: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("portfolio_config")
      .update({ data })
      .eq("id", 1);
    
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Supabase save error:", err);
    return false;
  }
}

// Compatibility helpers
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
