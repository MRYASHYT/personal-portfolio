import FadeInOnScroll from "@/components/FadeInOnScroll";
import { resumeData } from "@/data/resumeData";
import { Link } from "react-router-dom";

const Research = () => {
  const { personal } = resumeData;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-10 py-6 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border/50">
        <Link
          to="/"
          className="text-[15px] text-foreground hover:text-accent-glow transition-colors duration-200"
        >
          ← {personal.name}
        </Link>
        <span className="text-[14px] text-muted-foreground">Research</span>
      </nav>

      {/* Content */}
      <div className="max-w-[780px] mx-auto px-10 pt-32 pb-24">
        <FadeInOnScroll>
          <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-foreground mb-4">
            Research
          </h1>
        </FadeInOnScroll>

        {/* Current Research Problem */}
        <FadeInOnScroll>
          <section className="mb-20">
            <h2 className="text-[14px] tracking-wide text-muted-foreground mb-8">
              Current Research Problem
            </h2>
            <blockquote className="border-l-2 border-accent-glow/40 pl-6 py-2">
              <p className="text-[18px] leading-[1.7] text-foreground/90 italic">
                "How do agentic AI systems fail under ambiguous and
                adversarially crafted instructions — and what orchestration
                design patterns make them reliably robust?"
              </p>
            </blockquote>
          </section>
        </FadeInOnScroll>

        <div className="border-t border-border mb-20" />

        {/* Background & Motivation */}
        <FadeInOnScroll>
          <section className="mb-20">
            <h2 className="text-[14px] tracking-wide text-muted-foreground mb-8">
              Background & Motivation
            </h2>
            <div className="space-y-6 text-[15px] leading-[1.85] text-foreground/85">
              <p>
                Agentic AI systems — autonomous agents that plan, use tools, and
                execute multi-step tasks — are rapidly moving from research
                prototypes to production deployment. Yet their failure modes
                remain poorly understood and poorly benchmarked. Standard LLM
                benchmarks measure single-turn accuracy. They tell us almost
                nothing about how an agent behaves when a task requires 15
                sequential steps, tool calls, memory retrieval, and
                self-correction.
              </p>
              <p>
                The problem is not whether agents can complete tasks. The
                problem is whether they fail predictably, detectably, and
                recoverably — three properties that current architectures do not
                guarantee.
              </p>
              <p className="text-foreground/70 italic">
                This gap matters enormously for enterprise deployment, where a
                silently failing agent is more dangerous than one that explicitly
                errors.
              </p>
            </div>
          </section>
        </FadeInOnScroll>

        <div className="border-t border-border mb-20" />

        {/* Methodology */}
        <FadeInOnScroll>
          <section className="mb-20">
            <h2 className="text-[14px] tracking-wide text-muted-foreground mb-8">
              Methodology
            </h2>
            <div className="space-y-6 text-[15px] leading-[1.85] text-foreground/85">
              <p>
                I am building a systematic failure mode taxonomy for agentic
                pipelines by constructing a controlled evaluation environment
                using LangChain and LangGraph. I test agents across 50+
                instruction variants covering ambiguous goals, contradictory
                tool outputs, adversarial mid-task instruction injection, and
                resource-constrained execution environments.
              </p>
              <p>
                I categorize failures into three primary classes —{" "}
                <span className="text-foreground font-medium">
                  instruction drift
                </span>
                ,{" "}
                <span className="text-foreground font-medium">
                  premature termination
                </span>
                , and{" "}
                <span className="text-foreground font-medium">
                  tool-call hallucination
                </span>{" "}
                — and am investigating which architectural patterns (ReAct,
                Plan-and-Execute, Reflexion) are most robust to each failure
                class.
              </p>
            </div>
          </section>
        </FadeInOnScroll>

        <div className="border-t border-border mb-20" />

        {/* Preliminary Findings */}
        <FadeInOnScroll>
          <section className="mb-20">
            <h2 className="text-[14px] tracking-wide text-muted-foreground mb-8">
              Preliminary Findings
            </h2>
            <div className="space-y-6 text-[15px] leading-[1.85] text-foreground/85">
              <p>
                Standard ReAct-style agents show consistent instruction drift
                after 7+ sequential tool calls. Plan-and-Execute architectures
                are more robust to drift but fail more catastrophically on
                unexpected tool outputs. Reflexion-style self-correction
                partially mitigates both but introduces significant latency
                overhead — creating a{" "}
                <span className="text-accent-glow/90 font-medium">
                  reliability-efficiency tradeoff
                </span>{" "}
                that no current framework formally characterizes.
              </p>
            </div>
          </section>
        </FadeInOnScroll>

        <div className="border-t border-border mb-20" />

        {/* Open Questions */}
        <FadeInOnScroll>
          <section className="mb-20">
            <h2 className="text-[14px] tracking-wide text-muted-foreground mb-8">
              Open Questions
            </h2>
            <ul className="space-y-5">
              {[
                "Can failure modes be predicted before execution using instruction complexity metrics?",
                "What is the minimum architectural overhead required for reliable self-correction?",
                "How do failure rates scale with agent autonomy level and tool set size?",
                "Can agentic reliability be formally verified rather than empirically tested?",
              ].map((q, i) => (
                <li
                  key={i}
                  className="text-[15px] leading-[1.75] text-foreground/85 pl-5 relative before:content-['?'] before:absolute before:left-0 before:text-accent-glow/60 before:font-medium"
                >
                  {q}
                </li>
              ))}
            </ul>
          </section>
        </FadeInOnScroll>

        <div className="border-t border-border mb-20" />

        {/* Future Direction */}
        <FadeInOnScroll>
          <section className="mb-20">
            <h2 className="text-[14px] tracking-wide text-muted-foreground mb-8">
              Future Direction
            </h2>
            <p className="text-[15px] leading-[1.85] text-foreground/85">
              I am building toward graduate research focused on AI reliability,
              trustworthy autonomous systems, and multi-agent architectures —
              with the goal of developing formal verification frameworks for
              agentic AI deployment in enterprise environments.
            </p>
          </section>
        </FadeInOnScroll>

        {/* Footer */}
        <div className="border-t border-border pt-12">
          <FadeInOnScroll>
            <div className="flex flex-wrap gap-6 text-[14px] text-muted-foreground">
              <a
                href={`mailto:${personal.email}`}
                className="hover:text-foreground transition-colors duration-200"
              >
                {personal.email} ↗
              </a>
              {personal.github && (
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  GitHub ↗
                </a>
              )}
              {personal.scholar && (
                <a
                  href={personal.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Google Scholar ↗
                </a>
              )}
              {personal.orcid && (
                <a
                  href={personal.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  ORCID ↗
                </a>
              )}
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </main>
  );
};

export default Research;
