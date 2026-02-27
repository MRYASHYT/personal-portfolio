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

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    bio: string;
    email: string;
    phone: string;
    linkedin: string;
    github?: string;
    website?: string;
    image?: string;
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}

export const resumeData: ResumeData = {
  personal: {
    name: "Yash Gupta,",
    title: "Developer",
    bio: "I'm a Product-Focused Developer and Creative Technologist from India, working across AI/ML, blockchain, automation, and full-stack development. I enjoy turning bold ideas into real-world, scalable, and smart applications.",
    email: "contact@mryashdev.in",
    phone: "+91 8595997079",
    linkedin: "https://linkedin.com/in/mryashdev",
    github: "https://github.com/mryashdev",
    website: "https://mryashdev.in",
    image: "/profile.jpg",
  },
  experience: [
    {
      title: "Fresher — Seeking First Opportunity",
      company: "Open to Roles",
      location: "Delhi, India",
      dates: "Present",
      responsibilities: [
        "Motivated and detail-oriented B.Tech CSE student with hands-on project experience and a solid understanding of AI, development, and automation.",
        "Building intelligent systems using OpenAI, n8n, and APIs to automate workflows and create smart tools.",
        "Developing high-performance websites and platforms with modern tech stacks, built for speed, scale, and security.",
        "Creating cross-platform mobile apps using Flutter, with clean UI and smooth UX for both Android and iOS.",
        "Building smart contracts and decentralized apps (dApps) using Solidity and Web3 for secure, transparent systems.",
      ],
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science and Engineering (Lateral Entry)",
      school: "Institute of Technology and Management",
      location: "Janakpuri Campus, Delhi",
      dates: "2025 – 2028 (Expected)",
      details: [
        "Currently pursuing Bachelor's with focus on software development, AI/ML.",
      ],
    },
    {
      degree: "Diploma in Computer Engineering",
      school: "Delhi Skill and Entrepreneurship University (DSEU)",
      location: "Rajokri Campus, Delhi",
      dates: "2022 – 2025",
      details: [
        "Completed diploma with focus on computer engineering fundamentals. Percentage: 62%.",
      ],
    },
  ],
  skills: [
    "AI & Automation",
    "OpenAI",
    "n8n",
    "React",
    "Node.js",
    "HTML & CSS",
    "Flutter",
    "Solidity",
    "Web3",
    "Blockchain",
    "Full-Stack Development",
    "Mobile App Development",
  ],
};
