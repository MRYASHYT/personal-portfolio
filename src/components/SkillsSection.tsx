import { resumeData } from "@/data/resumeData";
import FadeInOnScroll from "@/components/FadeInOnScroll";

const SkillsSection = () => {
  const { skills } = resumeData;

  return (
    <section className="lg:ml-[480px] px-10 lg:px-0 lg:pr-16 pb-24">
      <FadeInOnScroll>
        <h2 className="text-[14px] tracking-wide text-muted-foreground mb-12">
          Skills
        </h2>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 text-[14px] border border-border text-foreground hover:bg-foreground hover:text-background transition-colors duration-200 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </FadeInOnScroll>
    </section>
  );
};

export default SkillsSection;
