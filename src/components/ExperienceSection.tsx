import { resumeData } from "@/data/resumeData";
import FadeInOnScroll from "@/components/FadeInOnScroll";

const ExperienceSection = () => {
  const { experience } = resumeData;

  return (
    <section className="lg:ml-[480px] px-10 lg:px-0 lg:pr-16 pt-8 pb-20">
      {/* About link - top right on desktop */}
      <div className="hidden lg:block fixed top-8 right-16 z-10 animate-fade-up">
        <a
          href="#about"
          className="text-[16px] text-foreground hover:text-muted-foreground transition-colors duration-200"
        >
          About
        </a>
      </div>

      {/* Mobile About link */}
      <div className="lg:hidden flex justify-end mb-8">
        <a
          href="#about"
          className="text-[16px] text-foreground hover:text-muted-foreground transition-colors duration-200"
        >
          About
        </a>
      </div>

      <FadeInOnScroll>
        <h2 className="text-[14px] tracking-wide text-muted-foreground mb-16">
          Experience
        </h2>
      </FadeInOnScroll>

      <div className="space-y-0">
        {experience.map((job, index) => (
          <div key={index}>
            {index > 0 && <div className="border-t border-border" />}
            <FadeInOnScroll>
              <div className="py-14 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
                <div>
                  <h3 className="text-[20px] font-semibold text-foreground leading-snug">
                    {job.title}
                  </h3>
                  <a
                    href="#"
                    className="text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-200 mt-2 inline-block"
                  >
                    {job.company} ↗
                  </a>
                  <p className="text-[14px] text-muted-foreground mt-1">
                    {job.dates}
                  </p>
                  <p className="text-[14px] text-muted-foreground">
                    {job.location}
                  </p>
                </div>

                <ul className="space-y-5 mt-1">
                  {job.responsibilities.map((item, i) => (
                    <li
                      key={i}
                      className="text-[15px] leading-[1.75] text-foreground pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInOnScroll>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
};

export default ExperienceSection;
