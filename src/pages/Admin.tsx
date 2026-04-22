import { useState, useEffect } from "react";
import {
  fetchPortfolioData,
  savePortfolioData,
  type ManagedProject,
  type ManagedPublication,
  type ManagedBlogPost,
  type PortfolioData,
} from "@/utils/dataStore";

const ADMIN_PASSWORD = "MRYASHDEV@JAPAN";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function now(): string {
  return new Date().toISOString();
}

// --- Password Gate ---
const PasswordGate = ({ onUnlock }: { onUnlock: (pw: string) => void }) => {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authed_pw", pw);
      onUnlock(pw);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <h1 className="text-[20px] font-semibold text-foreground text-center">
          🔒
        </h1>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Access key"
          autoFocus
          className={`w-full px-4 py-3 bg-card border text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-colors ${
            error ? "border-red-500" : "border-border focus:border-accent-glow/50"
          }`}
        />
        <button
          type="submit"
          className="w-full px-4 py-3 text-[14px] bg-foreground text-background hover:bg-foreground/90 transition-colors"
        >
          Enter
        </button>
      </form>
    </div>
  );
};

// --- Editable Text Field ---
const Field = ({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) => (
  <div className="space-y-1.5">
    <label className="text-[12px] tracking-wide text-muted-foreground uppercase">
      {label}
    </label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 bg-background border border-border text-[14px] text-foreground outline-none focus:border-accent-glow/50 transition-colors resize-y"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-background border border-border text-[14px] text-foreground outline-none focus:border-accent-glow/50 transition-colors"
      />
    )}
  </div>
);

// --- Progress Slider ---
const ProgressSlider = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => (
  <div className="space-y-1.5">
    <div className="flex justify-between">
      <label className="text-[12px] tracking-wide text-muted-foreground uppercase">
        Progress
      </label>
      <span className="text-[12px] text-accent-glow">{value}%</span>
    </div>
    <div className="relative">
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-glow/70 transition-all duration-200"
          style={{ width: `${value}%` }}
        />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
      />
    </div>
  </div>
);

// --- Priority Badge ---
const PriorityToggle = ({
  value,
  onChange,
}: {
  value: "major" | "minor";
  onChange: (v: "major" | "minor") => void;
}) => (
  <div className="flex gap-2">
    {(["major", "minor"] as const).map((p) => (
      <button
        key={p}
        onClick={() => onChange(p)}
        className={`px-3 py-1 text-[12px] tracking-wide border transition-colors ${
          value === p
            ? p === "major"
              ? "border-accent-glow/50 text-accent-glow bg-accent-glow/10"
              : "border-amber-500/50 text-amber-400 bg-amber-500/10"
            : "border-border text-muted-foreground hover:border-border/80"
        }`}
      >
        {p.toUpperCase()}
      </button>
    ))}
  </div>
);

// ======================
// PROJECT PANEL
// ======================
const ProjectPanel = ({ projects, onUpdate }: { projects: ManagedProject[], onUpdate: (projects: ManagedProject[]) => void }) => {
  const [editing, setEditing] = useState<string | null>(null);

  const addNew = () => {
    const newProject: ManagedProject = {
      id: generateId(),
      title: "New Research Project",
      problem: "",
      approach: "",
      stack: "",
      status: "In development",
      priority: "minor",
      progress: 0,
      lastUpdated: now(),
    };
    onUpdate([...projects, newProject]);
    setEditing(newProject.id);
  };

  const update = (id: string, patch: Partial<ManagedProject>) => {
    onUpdate(
      projects.map((p) =>
        p.id === id ? { ...p, ...patch, lastUpdated: now() } : p
      )
    );
  };

  const remove = (id: string) => {
    if (confirm("Delete this project?")) {
      onUpdate(projects.filter((p) => p.id !== id));
      setEditing(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-foreground">
          Research Projects ({projects.length})
        </h2>
        <button
          onClick={addNew}
          className="px-3 py-1.5 text-[13px] border border-accent-glow/40 text-accent-glow hover:bg-accent-glow/10 transition-colors"
        >
          + Add Project
        </button>
      </div>

      {projects.map((p) => (
        <div key={p.id} className="border border-border bg-card">
          <button
            onClick={() => setEditing(editing === p.id ? null : p.id)}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-foreground/5 transition-colors"
          >
            <div className="flex items-center gap-3 text-left">
              <span
                className={`shrink-0 w-2 h-2 rounded-full ${
                  p.priority === "major" ? "bg-accent-glow" : "bg-amber-400"
                }`}
              />
              <span className="text-[14px] text-foreground">{p.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-muted-foreground whitespace-nowrap">
                {p.progress}%
              </span>
              <span className="text-[12px] text-muted-foreground whitespace-nowrap">
                {editing === p.id ? "▲" : "▼"}
              </span>
            </div>
          </button>

          {editing === p.id && (
            <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
              <Field
                label="Title"
                value={p.title}
                onChange={(v) => update(p.id, { title: v })}
              />
              <Field
                label="Problem"
                value={p.problem}
                onChange={(v) => update(p.id, { problem: v })}
                multiline
              />
              <Field
                label="Approach"
                value={p.approach}
                onChange={(v) => update(p.id, { approach: v })}
                multiline
              />
              <Field
                label="Preliminary Finding"
                value={p.finding || ""}
                onChange={(v) => update(p.id, { finding: v || undefined })}
                multiline
              />
              <Field
                label="Stack"
                value={p.stack || ""}
                onChange={(v) => update(p.id, { stack: v || undefined })}
              />
              <Field
                label="Status Text"
                value={p.status}
                onChange={(v) => update(p.id, { status: v })}
              />
              <ProgressSlider
                value={p.progress}
                onChange={(v) => update(p.id, { progress: v })}
              />
              <div className="flex items-center justify-between">
                <PriorityToggle
                  value={p.priority}
                  onChange={(v) => update(p.id, { priority: v })}
                />
                <button
                  onClick={() => remove(p.id)}
                  className="text-[12px] text-red-400 hover:text-red-300 transition-colors"
                >
                  Delete
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Last updated: {new Date(p.lastUpdated).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ======================
// PUBLICATION PANEL
// ======================
const PublicationPanel = ({ publications, onUpdate }: { publications: ManagedPublication[], onUpdate: (pubs: ManagedPublication[]) => void }) => {
  const [editing, setEditing] = useState<string | null>(null);

  const addNew = () => {
    const newPub: ManagedPublication = {
      id: generateId(),
      authors: "Yash Gupta",
      title: "New Publication",
      venue: "Preprint in preparation",
      status: "Research in progress",
      priority: "minor",
      progress: 0,
      lastUpdated: now(),
    };
    onUpdate([...publications, newPub]);
    setEditing(newPub.id);
  };

  const update = (id: string, patch: Partial<ManagedPublication>) => {
    onUpdate(
      publications.map((p) =>
        p.id === id ? { ...p, ...patch, lastUpdated: now() } : p
      )
    );
  };

  const remove = (id: string) => {
    if (confirm("Delete this publication?")) {
      onUpdate(publications.filter((p) => p.id !== id));
      setEditing(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-foreground">
          Publications ({publications.length})
        </h2>
        <button
          onClick={addNew}
          className="px-3 py-1.5 text-[13px] border border-accent-glow/40 text-accent-glow hover:bg-accent-glow/10 transition-colors"
        >
          + Add Publication
        </button>
      </div>

      {publications.map((p) => (
        <div key={p.id} className="border border-border bg-card">
          <button
            onClick={() => setEditing(editing === p.id ? null : p.id)}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-foreground/5 transition-colors"
          >
            <div className="flex items-center gap-3 text-left overflow-hidden">
              <span
                className={`shrink-0 w-2 h-2 rounded-full ${
                  p.priority === "major" ? "bg-accent-glow" : "bg-amber-400"
                }`}
              />
              <span className="text-[14px] text-foreground truncate">
                {p.title}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-muted-foreground whitespace-nowrap">
                {p.progress}%
              </span>
              <span className="text-[12px] text-muted-foreground whitespace-nowrap">
                {editing === p.id ? "▲" : "▼"}
              </span>
            </div>
          </button>

          {editing === p.id && (
            <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
              <Field
                label="Title"
                value={p.title}
                onChange={(v) => update(p.id, { title: v })}
                multiline
              />
              <Field
                label="Authors"
                value={p.authors}
                onChange={(v) => update(p.id, { authors: v })}
              />
              <Field
                label="Venue / Target"
                value={p.venue}
                onChange={(v) => update(p.id, { venue: v })}
              />
              <Field
                label="Status Text"
                value={p.status}
                onChange={(v) => update(p.id, { status: v })}
              />
              <ProgressSlider
                value={p.progress}
                onChange={(v) => update(p.id, { progress: v })}
              />
              <div className="flex items-center justify-between">
                <PriorityToggle
                  value={p.priority}
                  onChange={(v) => update(p.id, { priority: v })}
                />
                <button
                  onClick={() => remove(p.id)}
                  className="text-[12px] text-red-400 hover:text-red-300 transition-colors"
                >
                  Delete
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Last updated: {new Date(p.lastUpdated).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ======================
// BLOG POST PANEL
// ======================
const BlogPanel = ({ posts, onUpdate }: { posts: ManagedBlogPost[], onUpdate: (posts: ManagedBlogPost[]) => void }) => {
  const [editing, setEditing] = useState<string | null>(null);

  const addNew = () => {
    const newPost: ManagedBlogPost = {
      id: generateId(),
      title: "New Research Note",
      slug: "new-note",
      status: "draft",
      content: "",
      lastUpdated: now(),
    };
    onUpdate([...posts, newPost]);
    setEditing(newPost.id);
  };

  const update = (id: string, patch: Partial<ManagedBlogPost>) => {
    onUpdate(
      posts.map((p) =>
        p.id === id ? { ...p, ...patch, lastUpdated: now() } : p
      )
    );
  };

  const remove = (id: string) => {
    if (confirm("Delete this note?")) {
      onUpdate(posts.filter((p) => p.id !== id));
      setEditing(null);
    }
  };

  const statusColors: Record<string, string> = {
    draft: "border-border text-muted-foreground",
    "in-progress": "border-amber-500/40 text-amber-400",
    ready: "border-accent-glow/40 text-accent-glow",
    published: "border-green-500/40 text-green-400",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-foreground">
          Research Notes ({posts.length})
        </h2>
        <button
          onClick={addNew}
          className="px-3 py-1.5 text-[13px] border border-accent-glow/40 text-accent-glow hover:bg-accent-glow/10 transition-colors"
        >
          + Add Note
        </button>
      </div>

      {posts.map((p) => (
        <div key={p.id} className="border border-border bg-card">
          <button
            onClick={() => setEditing(editing === p.id ? null : p.id)}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-foreground/5 transition-colors"
          >
            <span className="text-[14px] text-foreground truncate pr-4">
              {p.title}
            </span>
            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`px-2 py-0.5 text-[11px] border whitespace-nowrap ${
                  statusColors[p.status] || statusColors.draft
                }`}
              >
                {p.status}
              </span>
              <span className="text-[12px] text-muted-foreground whitespace-nowrap">
                {editing === p.id ? "▲" : "▼"}
              </span>
            </div>
          </button>

          {editing === p.id && (
            <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
              <Field
                label="Title"
                value={p.title}
                onChange={(v) => update(p.id, { title: v })}
              />
              <Field
                label="Slug"
                value={p.slug}
                onChange={(v) => update(p.id, { slug: v })}
              />
              <div className="space-y-1.5">
                <label className="text-[12px] tracking-wide text-muted-foreground uppercase">
                  Status
                </label>
                <div className="flex gap-2 flex-wrap">
                  {(
                    ["draft", "in-progress", "ready", "published"] as const
                  ).map((s) => (
                    <button
                      key={s}
                      onClick={() => update(p.id, { status: s })}
                      className={`px-3 py-1 text-[12px] border transition-colors ${
                        p.status === s
                          ? statusColors[s]
                          : "border-border text-muted-foreground/50 hover:border-border/80"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <Field
                label="Content / Notes"
                value={p.content || ""}
                onChange={(v) => update(p.id, { content: v })}
                multiline
              />
              <div className="flex justify-end">
                <button
                  onClick={() => remove(p.id)}
                  className="text-[12px] text-red-400 hover:text-red-300 transition-colors"
                >
                  Delete
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Last updated: {new Date(p.lastUpdated).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ======================
// ADMIN DASHBOARD
// ======================
const Admin = () => {
  const [authed, setAuthed] = useState(
    sessionStorage.getItem("admin_authed_pw") !== null
  );
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [tab, setTab] = useState<"projects" | "publications" | "notes">(
    "projects"
  );

  useEffect(() => {
    if (authed) {
      async function load() {
        const result = await fetchPortfolioData();
        setData(result);
        setLoading(false);
      }
      load();
    }
  }, [authed]);

  const handleUpdate = async (newData: PortfolioData) => {
    setData(newData);
    setSaving(true);
    const pw = sessionStorage.getItem("admin_authed_pw") || "";
    const success = await savePortfolioData(newData, pw);
    if (success) {
      setLastSaved(new Date());
    }
    setSaving(false);
  };

  if (!authed) return <PasswordGate onUnlock={() => setAuthed(true)} />;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-[14px] animate-pulse">Loading database...</p>
      </div>
    );
  }

  const tabs = [
    { key: "projects" as const, label: "Projects" },
    { key: "publications" as const, label: "Publications" },
    { key: "notes" as const, label: "Research Notes" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-40">
        <div className="max-w-[800px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`text-[13px] ${saving ? "text-amber-400 animate-pulse" : "text-accent-glow"}`}>●</span>
            <span className="text-[15px] font-semibold text-foreground">
              {saving ? "Saving Changes..." : "Control Panel"}
            </span>
            {lastSaved && !saving && (
              <span className="text-[11px] text-muted-foreground ml-2">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_authed_pw");
              setAuthed(false);
            }}
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Lock
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-[800px] mx-auto px-6 flex gap-0">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-3 text-[14px] border-b-2 transition-colors ${
                tab === t.key
                  ? "border-accent-glow text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-6 py-8">
        {data && (
          <>
            {tab === "projects" && (
              <ProjectPanel 
                projects={data.projects} 
                onUpdate={(p) => handleUpdate({ ...data, projects: p })} 
              />
            )}
            {tab === "publications" && (
              <PublicationPanel 
                publications={data.publications} 
                onUpdate={(p) => handleUpdate({ ...data, publications: p })} 
              />
            )}
            {tab === "notes" && (
              <BlogPanel 
                posts={data.blogPosts} 
                onUpdate={(p) => handleUpdate({ ...data, blogPosts: p })} 
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Admin;
