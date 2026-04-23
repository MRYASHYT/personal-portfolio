export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  dates: string;
  responsibilities: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  location: string;
  dates: string;
  details?: string[];
}

export interface ResearchProject {
  title: string;
  problem: string;
  approach: string;
  finding?: string;
  stack?: string;
  status: string;
}

export interface Publication {
  authors: string;
  title: string;
  venue: string;
  status: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  status?: "draft" | "in-progress" | "ready" | "published";
  content?: string;
}

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    bio: string;
    email: string;
    linkedin: string;
    github?: string;
    website?: string;
    image?: string;
    orcid?: string;
    scholar?: string;
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  researchProjects: ResearchProject[];
  publications: Publication[];
  researchInterests: string[];
  blogPosts: BlogPost[];
}

export const resumeData: ResumeData = {
  personal: {
    name: "Yash Gupta",
    title: "AI Researcher | Agentic Systems & AI Orchestration",
    bio: "I research the design and reliability of agentic AI systems — autonomous agents that plan, orchestrate tools, and execute multi-step tasks with minimal human intervention. My current work focuses on how agentic pipelines fail under ambiguous instructions and how orchestration architectures can be made more robust and verifiable.\n\nCurrently pursuing BTech Computer Science at IITM Janakpuri, Delhi. Building toward graduate research in agentic AI systems and trustworthy autonomous decision-making.",
    email: "research.yashgupta@gmail.com",
    linkedin: "https://linkedin.com/in/mryashdev",
    github: "https://github.com/mryashdev",
    website: "https://mryashdev.in",
    image: "/profile.jpg",
    orcid: "https://orcid.org/0009-0001-7782-5559",
    scholar: "https://scholar.google.com/citations?hl=en&user=3uROiJIAAAAJ",
  },
  experience: [
    {
      title: "Research & Development",
      company: "Independent AI Researcher",
      location: "Delhi, India",
      dates: `${new Date().getFullYear()} — Present`,
      responsibilities: [
        "Building an evaluation framework to systematically test how agentic AI pipelines fail under ambiguous and adversarially crafted instructions",
        "Designing orchestration patterns for multi-agent systems — studying how coordinator agents decompose tasks, delegate to sub-agents, and recover from partial execution failures",
        "Studying task decomposition patterns in LangChain and LangGraph-based agents to identify failure modes in multi-step execution",
        "Professional ML data annotation — evaluating agentic AI outputs for instruction-following accuracy, reasoning consistency, and multi-step task completion quality",
      ],
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science and Engineering (Lateral Entry)",
      school: "Institute of Information Technology and Management (IITM)",
      location: "Janakpuri Campus, Delhi",
      dates: "2025 – 2028 (Expected)",
      details: [
        "Currently pursuing BTech CS with research focus on agentic AI systems, multi-agent orchestration, and reliable autonomous decision-making pipelines.",
      ],
    },
    {
      degree: "Diploma in Computer Engineering",
      school: "Delhi Skill and Entrepreneurship University (DSEU)",
      location: "Rajokri Campus, Delhi",
      dates: "2022 – 2025",
      details: [
        "Completed Diploma in Computer Engineering. Foundation in systems programming, operating systems, and computer architecture.",
      ],
    },
  ],
  skills: [
    "Python",
    "PyTorch",
    "LangChain",
    "LangGraph",
    "OpenAI API",
    "Agentic Pipelines",
    "Multi-Agent Systems",
    "RAG Architecture",
    "Vector Databases",
    "Prompt Engineering",
    "ML Evaluation",
    "Data Annotation",
    "React",
    "REST APIs",
  ],
  researchProjects: [
    {
      title: "AgentStress — Agentic Pipeline Failure Testing Framework",
      problem:
        "How do LLM-based agentic systems break when instructions are vague, contradictory, or intentionally adversarial — and which orchestration patterns handle it best?",
      approach:
        "Building a Python testing framework that sends crafted instruction variants to LangChain and LangGraph agents, logs tool-call sequences, and classifies failures into categories: instruction drift, premature termination, and tool-call hallucination.",
      stack: "Python, LangChain, LangGraph, OpenAI API",
      status: "In development",
    },
    {
      title: "OrchestBot — Multi-Agent Task Delegation System",
      problem:
        "How can a coordinator agent reliably decompose complex user requests into subtasks and delegate them to specialized sub-agents — while maintaining context consistency and handling partial failures?",
      approach:
        "Building a lightweight orchestration layer where a planner agent breaks down user goals into an execution graph, dispatches subtasks to tool-specific agents (search, code, summarize), and merges outputs with conflict detection.",
      stack: "Python, LangGraph, OpenAI API, Redis",
      status: "In development",
    },
  ],
  publications: [
    {
      authors: "Yash Gupta",
      title:
        "Failure Mode Taxonomy of Agentic AI Pipelines Under Ambiguous Instruction Sets",
      venue: "Preprint in preparation",
      status: "Writing in progress",
    },
    {
      authors: "Yash Gupta",
      title:
        "Reliable Task Delegation in Multi-Agent Systems: Context Consistency and Partial Failure Recovery",
      venue: "Preprint in preparation",
      status: "Writing in progress",
    },
  ],
  researchInterests: [
    "Reliability and failure mode analysis of agentic AI systems",
    "Multi-agent orchestration architectures and task decomposition",
    "Trustworthy autonomous decision-making under ambiguous inputs",
    "Tool-augmented language models and agentic memory systems",
    "GPU-efficient deployment of agentic pipelines for enterprise",
    "Evaluation frameworks for multi-step AI task completion",
  ],
  blogPosts: [
    {
      title:
        "ReAct agents drift after 7 tool calls — here is what I found and why benchmarks miss it entirely",
      slug: "react-agent-drift",
      status: "published",
      content: `There is a failure mode in ReAct-style agents that I have been observing repeatedly while building AgentStress, and I have not seen it documented anywhere in the standard benchmarking literature.

I call it **instruction drift**.

Here is what it looks like in practice.

You give a ReAct agent a clear, specific goal — something like *"find the three most cited papers on multi-agent task decomposition published after 2022, summarize their key contributions, and identify the open problem each one leaves unsolved."*

For the first five or six tool calls, the agent behaves correctly. It searches, retrieves, reads, takes notes. Everything looks fine.

Then somewhere around tool call seven or eight — it starts optimizing for something slightly different from the original goal. Not catastrophically wrong. Just... drifted. It starts summarizing papers without identifying open problems. Or it starts retrieving papers from 2021 because one search result was relevant. Or it starts comparing citation counts instead of finding the top three.

The original instruction is still in the context window. The agent has not forgotten it. But the weight of recent tool outputs has quietly overridden it.

By tool call twelve the agent confidently returns a result that partially addresses the goal — and has no idea it missed anything.

---

**Why standard benchmarks miss this completely**

Most agent benchmarks measure one of two things — task completion rate, or final answer accuracy.

Both metrics evaluate the endpoint. They say nothing about trajectory.

An agent that drifts at step 8 but accidentally recovers by step 15 looks identical to an agent that stayed on track the entire time. Both score 1 on task completion. Both produce a correct-looking final answer.

But they are not the same agent. One got lucky. One is reliable.

This distinction matters enormously in production. If your agent is deployed to handle customer support escalations, legal document review, or financial research — you need the reliable one, not the lucky one. And current benchmarks cannot tell the difference.

---

**What I think is happening mechanically**

My working hypothesis — still being tested — is that instruction drift is caused by a combination of two things:

**1. Recency bias in attention.** As the context grows with tool outputs, the attention mechanism naturally weights recent tokens more heavily than distant ones. The original instruction, sitting at the top of the context, gradually loses influence relative to the accumulating tool results.

**2. Implicit goal substitution.** Tool outputs often contain implicit sub-goals — a search result about paper citations implicitly suggests *"rank by citations"* even if the original instruction said *"find most cited."* The agent starts following the implicit goal embedded in its own tool outputs rather than the explicit goal in the original instruction.

Together these create a feedback loop. Each tool call moves the agent slightly further from the original instruction and slightly closer to whatever the most recent tool output implied it should be doing.

---

**Three patterns I have observed so far**

After running initial tests across different instruction types, drift appears in three consistent patterns:

**Pattern 1 — Goal narrowing.** The agent starts with a broad goal and progressively narrows it to whichever sub-component generated the most interesting tool outputs. By the end it has done one part of the task extremely well and missed the rest entirely.

**Pattern 2 — Implicit constraint adoption.** A tool output contains an unstated assumption — for example, a search API returns results filtered to English-language papers. The agent adopts this constraint as if it were part of the original instruction and stops looking for non-English sources, even if the original goal had no language restriction.

**Pattern 3 — Metric substitution.** The agent replaces the original success metric with a proxy that is easier to measure from tool outputs. *"Most impactful papers"* becomes *"most cited papers"* becomes *"papers with citation counts above 500"* — each substitution feeling locally reasonable while drifting from the original intent.

---

**What I am testing next**

Two interventions I want to evaluate:

**Intervention 1 — Instruction anchoring.** Reinject the original instruction into the context every N tool calls, explicitly marked as the primary goal. Does this reduce drift without significantly increasing latency?

**Intervention 2 — Goal consistency checking.** After each tool call, run a lightweight check — either rule-based or a small model call — that compares the agent's current trajectory against the original instruction. Flag and correct deviations before they compound.

Neither of these is novel in isolation. What I am interested in is the tradeoff — how much reliability improvement do you get per unit of added latency and cost? And does the optimal intervention depend on the type of drift occurring?

I do not have answers yet. But the question is clear enough to pursue.

---

**Why this matters for agentic AI deployment**

The practical implication is uncomfortable: agents that score well on current benchmarks may be systematically unreliable in production for long-horizon tasks — and we would not know it from the benchmark numbers alone.

If you are evaluating an agent system for enterprise deployment and you are relying on task completion rate as your primary metric, you are measuring the wrong thing. You are measuring whether the agent gets lucky, not whether it is reliable.

Building evaluation frameworks that capture trajectory reliability — not just endpoint accuracy — is, I think, one of the most important open problems in practical agentic AI right now.

This note is part of an ongoing series documenting what I find while building AgentStress, a framework for systematic failure mode testing of agentic pipelines.`,
    },
    {
      title:
        "Plan-and-Execute vs ReAct vs Reflexion — a reliability comparison nobody has published yet",
      slug: "plan-execute-vs-react",
    },
    {
      title:
        "Why I think agentic AI evaluation is the most important unsolved problem in ML right now",
      slug: "agentic-evaluation-problem",
    },
  ],
};
