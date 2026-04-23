import { usePortfolioData } from "@/hooks/usePortfolioData";
import { getPublicPublications } from "@/utils/dataStore";
import FadeInOnScroll from "@/components/FadeInOnScroll";

const PublicationsSection = () => {
  const { data, loading } = usePortfolioData();
  const publications = data ? getPublicPublications(data) : [];

  if (loading) return null; // Keep it simple for secondary sections or add skeleton if preferred

  return (
    <section className="xl:ml-[480px] px-6 xl:px-0 xl:pr-16 pb-6 xl:pb-10">
      <FadeInOnScroll>
        <h2 className="text-[14px] tracking-wide text-muted-foreground mb-8">
          Publications
        </h2>
      </FadeInOnScroll>

      <div className="space-y-0">
        {publications.map((pub, index) => (
          <div key={index}>
            {index > 0 && <div className="border-t border-border" />}
            <FadeInOnScroll>
              <div className="py-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
                <div>
                  <p className="text-[15px] text-foreground/90 leading-[1.75]">
                    <span className="text-foreground font-medium">
                      {pub.authors}.
                    </span>{" "}
                    "{pub.title}."
                  </p>
                  <p className="text-[14px] text-muted-foreground mt-2">
                    <span className="text-foreground/70">{pub.venue}</span>
                  </p>
                </div>
                <span className="shrink-0 px-3 py-1 text-[12px] tracking-wide border border-amber-500/30 text-amber-400/80">
                  {pub.status}
                </span>
              </div>
            </FadeInOnScroll>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
};

export default PublicationsSection;
