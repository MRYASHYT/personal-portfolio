import { getPublicProjects } from "@/utils/dataStore";
import FadeInOnScroll from "@/components/FadeInOnScroll";

const ResearchProjectsSection = () => {
  const researchProjects = getPublicProjects();

  return (
    <section className="lg:ml-[480px] px-10 lg:px-0 lg:pr-16 pb-10">
      <FadeInOnScroll>
        <h2 className="text-[14px] tracking-wide text-muted-foreground mb-8">
          Research Projects
        </h2>
      </FadeInOnScroll>

      <div className="space-y-0">
        {researchProjects.map((project, index) => (
          <div key={index}>
            {index > 0 && <div className="border-t border-border" />}
            <FadeInOnScroll>
              <div className="py-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <h3 className="text-[20px] font-semibold text-foreground leading-snug">
                    {project.title}
                  </h3>
                  <span
                    className={`shrink-0 px-3 py-1 text-[12px] tracking-wide border ${
                      project.status === "Live"
                        ? "border-accent-glow/40 text-accent-glow"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {project.status === "Live" ? "● Live" : project.status}
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-[13px] tracking-wide text-muted-foreground mb-2">
                      Problem
                    </p>
                    <p className="text-[15px] leading-[1.75] text-foreground/90">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <p className="text-[13px] tracking-wide text-muted-foreground mb-2">
                      Approach
                    </p>
                    <p className="text-[15px] leading-[1.75] text-foreground/90">
                      {project.approach}
                    </p>
                  </div>

                  {project.finding && (
                    <div className="border-l-2 border-accent-glow/30 pl-5">
                      <p className="text-[13px] tracking-wide text-accent-glow/80 mb-2">
                        Preliminary Finding
                      </p>
                      <p className="text-[15px] leading-[1.75] text-foreground/90 italic">
                        {project.finding}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 pt-2">
                    {project.stack && (
                      <p className="text-[13px] text-muted-foreground">
                        <span className="text-foreground/60">Stack:</span>{" "}
                        {project.stack}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
};

export default ResearchProjectsSection;
