import { createClient } from "@supabase/supabase-js";

// types for the data we manage
interface ManagedPublication {
  id: string;
  authors: string;
  title: string;
  venue: string;
  status: string;
  priority: "major" | "minor";
  progress: number;
  lastUpdated: string;
}

interface PortfolioData {
  projects: any[];
  publications: ManagedPublication[];
  blogPosts: any[];
}

export default {
  async scheduled(event: any, env: any, ctx: any) {
    const SCHOLAR_URL = "https://scholar.google.com/citations?hl=en&user=3uROiJIAAAAJ";
    const SUPABASE_URL = env.SUPABASE_URL;
    const SUPABASE_KEY = env.SUPABASE_KEY;

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    try {
      // 1. Scrape Google Scholar
      const response = await fetch(SCHOLAR_URL);
      const html = await response.text();

      // Simple regex-based parsing (since Workers don't have DOMParser)
      // This is a basic approach, for robustness a 3rd party parser or SerpApi is better
      const publications: Partial<ManagedPublication>[] = [];
      
      // Match individual rows
      const rowRegex = /<tr class="gsc_a_tr">([\s\S]*?)<\/tr>/g;
      let match;
      
      while ((match = rowRegex.exec(html)) !== null) {
        const rowHtml = match[1];
        
        // Extract Title
        const titleMatch = rowHtml.match(/<a class="gsc_a_at">([\s\S]*?)<\/a>/);
        const title = titleMatch ? titleMatch[1].trim() : "";
        
        // Extract Authors
        const authorsMatch = rowHtml.match(/<div class="gs_gray">([\s\S]*?)<\/div>/);
        const authors = authorsMatch ? authorsMatch[1].trim() : "";
        
        // Extract Venue (2nd gs_gray)
        const allGray = rowHtml.match(/<div class="gs_gray">([\s\S]*?)<\/div>/g);
        const venue = allGray && allGray[1] ? allGray[1].replace(/<[^>]*>?/gm, '').trim() : "";
        
        // Extract Year
        const yearMatch = rowHtml.match(/<span class="gsc_a_h gsc_a_hc">(\d{4})<\/span>/);
        const year = yearMatch ? yearMatch[1] : "";

        if (title) {
          publications.push({
            id: btoa(title).slice(0, 10), // Deterministic ID
            title,
            authors,
            venue: venue || `Published ${year}`,
            status: "Published",
            priority: "major",
            progress: 100,
            lastUpdated: new Date().toISOString()
          });
        }
      }

      if (publications.length === 0) {
        console.log("No publications found on Scholar profile.");
        return;
      }

      // 2. Fetch current data from Supabase
      const { data: dbData, error: fetchError } = await supabase
        .from("portfolio_config")
        .select("data")
        .eq("id", 1)
        .single();

      if (fetchError) throw fetchError;
      
      const currentData = dbData.data as PortfolioData;
      const existingTitles = new Set(currentData.publications.map(p => p.title.toLowerCase()));

      // 3. Merge new publications
      let updated = false;
      for (const pub of publications) {
        if (!existingTitles.has(pub.title!.toLowerCase())) {
          currentData.publications.push(pub as ManagedPublication);
          updated = true;
          console.log(`New publication detected: ${pub.title}`);
        }
      }

      // 4. Save back if updated
      if (updated) {
        const { error: saveError } = await supabase
          .from("portfolio_config")
          .update({ data: currentData })
          .eq("id", 1);
          
        if (saveError) throw saveError;
        console.log("Database updated with new publications.");
      } else {
        console.log("No new publications to add.");
      }

    } catch (err) {
      console.error("Scholar Sync Error:", err);
    }
  }
};
