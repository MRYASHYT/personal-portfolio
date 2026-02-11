export interface ResumeData {
  personal: {
    name: string;
    title: string;
    bio: string;
    email: string;
    phone: string;
    linkedin: string;
  };
  experience: Array<{
    title: string;
    company: string;
    location: string;
    dates: string;
    responsibilities: string[];
  }>;
}

export const resumeData: ResumeData = {
  personal: {
    name: "Alexandra Moore,",
    title: "Senior Producer",
    bio: "A seasoned Senior Producer with 10+ years of experience, I excel in leading complex marketing and design projects from concept to completion.",
    email: "alexandramoore@email.com",
    phone: "(555) 123-4567",
    linkedin: "https://linkedin.com/in/alexandramoore",
  },
  experience: [
    {
      title: "Senior Producer",
      company: "Creative Agency XYZ",
      location: "Remote & New York, NY",
      dates: "June 2022 - Present",
      responsibilities: [
        "Seamlessly facilitate diverse creative experiences: from immersive installations to cinematic narratives. A catalyst for collaboration across all mediums.",
        "Clients include: Lunethra, Driftwell, Clyra, Forgekind and more.",
      ],
    },
    {
      title: "Senior Producer",
      company: "Pixel Studios",
      location: "New York, NY",
      dates: "December 2021 - June 2022",
      responsibilities: [
        "Orchestrated the creation of integrated video, motion, and photo content for multi-platform marketing campaigns, ensuring seamless execution and brand alignment.",
        "Directed all phases of production operations (pre-production, production, post-production), meticulously managing budgets, contracts, and legal requirements to deliver projects on time and within quality standards.",
        "Strategically developed and managed production schedules, creative strategies, and talent relations, optimizing resources to deliver high-quality content within budget parameters.",
        "Clients include: Nestive, Zentrox, Pollenate, Vireo and more.",
      ],
    },
    {
      title: "Content Producer",
      company: "Creative Hub Studio",
      location: "Los Angeles, CA",
      dates: "October 2016 - March 2018",
      responsibilities: [
        "Facilitated clear and efficient communication across cross-functional teams (Marketing, Brand, Creative, IT, QA), ensuring seamless collaboration and project alignment.",
        "Proactively identified and integrated industry trends, emerging technologies, and cultural insights to enhance creative output and maintain brand relevance.",
        "Clients include: Lunethra, Forgekind and more.",
      ],
    },
  ],
};
