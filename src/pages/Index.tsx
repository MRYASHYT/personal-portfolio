import Sidebar from "@/components/Sidebar";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
    </main>
  );
};

export default Index;
