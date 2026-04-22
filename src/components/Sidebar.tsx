import { resumeData } from "@/data/resumeData";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { personal } = resumeData;

  return (
    <aside className="lg:fixed lg:top-0 lg:left-0 lg:w-[420px] lg:h-screen px-10 pt-8 pb-12 lg:py-8 flex flex-col lg:overflow-y-auto lg:scrollbar-hide">
      {/* Name & Title */}
      <div className="animate-fade-up">
        {personal.image && (
          <img
            src={personal.image}
            alt={personal.name}
            className="w-28 h-28 rounded-2xl object-cover mb-8 grayscale hover:grayscale-0 transition-all duration-500 ease-in-out shadow-2xl ring-1 ring-white/10"
          />
        )}
        <h1 className="text-[36px] font-semibold leading-tight tracking-tight text-foreground">
          {personal.name}
        </h1>
        <p className="text-[15px] font-light text-accent-glow/80 mt-2 leading-relaxed">
          {personal.title}
        </p>
      </div>

      {/* Bio */}
      <div id="about" className="mt-auto lg:mt-10">
        <div className="border-t border-border mb-8" />
        <p className="text-[14px] leading-[1.8] text-muted-foreground max-w-[300px] animate-fade-up-delay-1 whitespace-pre-line">
          {personal.bio}
        </p>
      </div>

      {/* Research Page Link + CV */}
      <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-2">
        <Link
          to="/research"
          className="inline-block text-[14px] text-foreground border border-border px-5 py-2.5 hover:bg-foreground hover:text-background transition-colors duration-200"
        >
          Research Statement →
        </Link>
        <a
          href="/yash_gupta_cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[14px] text-foreground border border-accent-glow/40 px-5 py-2.5 hover:bg-accent-glow/10 transition-colors duration-200"
        >
          Curriculum Vitae ↗
        </a>
      </div>

      {/* Contact Links */}
      <nav className="mt-auto lg:mt-12 space-y-3 animate-fade-up-delay-3">
        <div className="border-t border-border mb-8" />
        <a
          href={`mailto:${personal.email}`}
          className="block text-[15px] text-foreground hover:text-muted-foreground transition-colors duration-200"
        >
          {personal.email} ↗
        </a>
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-[15px] text-foreground hover:text-muted-foreground transition-colors duration-200"
        >
          LinkedIn ↗
        </a>
        {personal.github && (
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[15px] text-foreground hover:text-muted-foreground transition-colors duration-200"
          >
            GitHub ↗
          </a>
        )}
        {personal.scholar && (
          <a
            href={personal.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[15px] text-foreground hover:text-muted-foreground transition-colors duration-200"
          >
            Google Scholar ↗
          </a>
        )}
        {personal.orcid && (
          <a
            href={personal.orcid}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[15px] text-foreground hover:text-muted-foreground transition-colors duration-200"
          >
            ORCID ↗
          </a>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
