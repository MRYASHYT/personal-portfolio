import { usePortfolioData } from "@/hooks/usePortfolioData";
import { getPublicBlogPosts } from "@/utils/dataStore";
import FadeInOnScroll from "@/components/FadeInOnScroll";

const BlogSection = () => {
  const { data, loading } = usePortfolioData();
  const blogPosts = data ? getPublicBlogPosts(data) : [];

  if (loading) return null;

  return (
    <section className="lg:ml-[480px] px-10 lg:px-0 lg:pr-16 pb-12">
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
              <div className="py-5 group cursor-pointer">
                <p className="text-[16px] leading-[1.6] text-foreground group-hover:text-accent-glow transition-colors duration-300">
                  {post.title}
                </p>
                <p className="text-[13px] text-muted-foreground mt-2 group-hover:text-foreground/50 transition-colors duration-300">
                  Coming soon
                </p>
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
