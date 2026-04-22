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
      company: "Independent Researcher",
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
