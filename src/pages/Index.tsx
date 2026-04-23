import Sidebar from "@/components/Sidebar";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ResearchProjectsSection from "@/components/ResearchProjectsSection";
import PublicationsSection from "@/components/PublicationsSection";
import ResearchInterestsSection from "@/components/ResearchInterestsSection";
import BlogSection from "@/components/BlogSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Sidebar />
      <ExperienceSection />
      <ResearchProjectsSection />
      <PublicationsSection />
      <ResearchInterestsSection />
      <EducationSection />
      <SkillsSection />
      <BlogSection />
    </main>
  );
};

export default Index;
