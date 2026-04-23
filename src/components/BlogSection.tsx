import { useState } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { getPublicBlogPosts } from "@/utils/dataStore";
import FadeInOnScroll from "@/components/FadeInOnScroll";

const BlogSection = () => {
  const { data, loading } = usePortfolioData();
  const blogPosts = data ? getPublicBlogPosts(data) : [];
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  if (loading) return null;

  return (
    <section className="xl:ml-[480px] px-6 xl:px-0 xl:pr-16 pb-8 xl:pb-12">
      <FadeInOnScroll>
        <h2 className="text-[14px] tracking-wide text-muted-foreground mb-6">
          Research Notes
        </h2>
      </FadeInOnScroll>

      <div className="space-y-0">
        {blogPosts.map((post, index) => (
          <div key={index}>
            {index > 0 && <div className="border-t border-border" />}
            <FadeInOnScroll>
              <div 
                className="py-5 group cursor-pointer"
                onClick={() => setExpandedSlug(expandedSlug === post.slug ? null : post.slug)}
              >
                <div className="flex justify-between items-start">
                  <p className="text-[16px] leading-[1.6] text-foreground group-hover:text-accent-glow transition-colors duration-300">
                    {post.title}
                  </p>
                  <span className="text-[12px] text-muted-foreground ml-4 shrink-0 mt-1">
                    {expandedSlug === post.slug ? "Collapse" : "Read"}
                  </span>
                </div>
                
                {expandedSlug === post.slug && post.content && (
                  <div className="mt-6 text-[15px] leading-[1.8] text-foreground/85 space-y-6 animate-fade-up">
                    {post.content.split('\n\n').map((para, i) => {
                      if (para.startsWith('---')) return <hr key={i} className="border-border/50 my-8" />;
                      
                      // Simple bold handling
                      const parts = para.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={i}>
                          {parts.map((part, j) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={j} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          })}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            </FadeInOnScroll>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
};

export default BlogSection;
