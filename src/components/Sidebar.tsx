import { resumeData } from "@/data/resumeData";

const Sidebar = () => {
  const { personal } = resumeData;

  return (
    <aside className="lg:fixed lg:top-0 lg:left-0 lg:w-[420px] lg:h-screen px-10 pt-8 pb-12 lg:py-8 flex flex-col">
      {/* Name & Title */}
      <div className="animate-fade-up">
        <h1 className="text-[36px] font-semibold leading-tight tracking-tight text-foreground">
          {personal.name}
        </h1>
        <p className="text-[20px] font-light text-muted-foreground mt-1">
          {personal.title}
        </p>
      </div>

      {/* Bio */}
      <div className="mt-auto lg:mt-32">
        <div className="border-t border-border mb-8" />
        <p className="text-[16px] leading-[1.7] text-muted-foreground max-w-[300px] animate-fade-up-delay-1">
          {personal.bio}
        </p>
      </div>

      {/* Contact Links */}
      <nav className="mt-auto lg:mt-16 space-y-3 animate-fade-up-delay-2">
        <div className="border-t border-border mb-8" />
        <a
          href={`mailto:${personal.email}`}
          className="block text-[15px] text-foreground hover:text-muted-foreground transition-colors duration-200"
        >
          {personal.email} ↗
        </a>
        <a
          href={`tel:${personal.phone.replace(/[^+\d]/g, "")}`}
          className="block text-[15px] text-foreground hover:text-muted-foreground transition-colors duration-200"
        >
          {personal.phone} ↗
        </a>
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-[15px] text-foreground hover:text-muted-foreground transition-colors duration-200"
        >
          Linkedin ↗
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
