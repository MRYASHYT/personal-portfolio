import { resumeData } from "@/data/resumeData";
import FadeInOnScroll from "@/components/FadeInOnScroll";

const EducationSection = () => {
  const { education } = resumeData;

  return (
    <section className="lg:ml-[480px] px-10 lg:px-0 lg:pr-16 pb-20">
      <FadeInOnScroll>
        <h2 className="text-[14px] tracking-wide text-muted-foreground mb-16">
          Education
        </h2>
      </FadeInOnScroll>

      <div className="space-y-0">
        {education.map((edu, index) => (
          <div key={index}>
            {index > 0 && <div className="border-t border-border" />}
            <FadeInOnScroll>
              <div className="py-14 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
                <div>
                  <h3 className="text-[20px] font-semibold text-foreground leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-[15px] text-muted-foreground mt-2">
                    {edu.school}
                  </p>
                  <p className="text-[14px] text-muted-foreground mt-1">
                    {edu.dates}
                  </p>
                  <p className="text-[14px] text-muted-foreground">
                    {edu.location}
                  </p>
                </div>

                {edu.details && (
                  <ul className="space-y-5 mt-1">
                    {edu.details.map((item, i) => (
                      <li
                        key={i}
                        className="text-[15px] leading-[1.75] text-foreground pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
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

export default EducationSection;
