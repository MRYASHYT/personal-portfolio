import { resumeData } from "@/data/resumeData";
import FadeInOnScroll from "@/components/FadeInOnScroll";

const ResearchInterestsSection = () => {
  const { researchInterests } = resumeData;

  return (
    <section className="xl:ml-[480px] px-6 xl:px-0 xl:pr-16 pb-6 xl:pb-10">
      <FadeInOnScroll>
        <h2 className="text-[14px] tracking-wide text-muted-foreground mb-6">
          Research Interests
        </h2>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <ul className="space-y-4">
          {researchInterests.map((interest, index) => (
            <li
              key={index}
              className="text-[15px] leading-[1.75] text-foreground/90 pl-5 relative before:content-['→'] before:absolute before:left-0 before:text-accent-glow/60"
            >
              {interest}
            </li>
          ))}
        </ul>
      </FadeInOnScroll>

      <div className="border-t border-border mt-14" />
    </section>
  );
};

export default ResearchInterestsSection;
