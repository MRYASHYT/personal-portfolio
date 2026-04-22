import { useState, useEffect } from "react";
import { fetchPortfolioData, type PortfolioData } from "@/utils/dataStore";

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const result = await fetchPortfolioData();
      setData(result);
      setLoading(false);
    }
    load();
  }, []);

  return { data, loading };
}
