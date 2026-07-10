import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Palette, Type, MousePointer, FormInput, LayoutGrid, Navigation,
  Bell, BarChart2, MessageSquare, Monitor, Sun, Moon, Menu, X,
  ChevronRight, Sparkles
} from "lucide-react";

export type DSSection =
  | "colors" | "typography" | "buttons" | "forms"
  | "cards" | "navigation" | "feedback" | "data"
  | "messaging" | "mockups";

const navItems: { id: DSSection; label: string; icon: React.ReactNode }[] = [
  { id: "colors",     label: "Color Tokens",   icon: <Palette size={16} /> },
  { id: "typography", label: "Typography",      icon: <Type size={16} /> },
  { id: "buttons",    label: "Buttons",         icon: <MousePointer size={16} /> },
  { id: "forms",      label: "Form Inputs",     icon: <FormInput size={16} /> },
  { id: "cards",      label: "Cards",           icon: <LayoutGrid size={16} /> },
  { id: "navigation", label: "Navigation",      icon: <Navigation size={16} /> },
  { id: "feedback",   label: "Feedback",        icon: <Bell size={16} /> },
  { id: "data",       label: "Data Display",    icon: <BarChart2 size={16} /> },
  { id: "messaging",  label: "Messaging UI",    icon: <MessageSquare size={16} /> },
  { id: "mockups",    label: "Mockups",         icon: <Monitor size={16} /> },
];

interface Props {
  activeSection: DSSection;
  onSectionChange: (s: DSSection) => void;
  children: React.ReactNode;
}

export function DSLayout({ activeSection, onSectionChange, children }: Props) {
  const { theme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDark = theme === "dark";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top header */}
      <header
        className="h-14 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-50"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,.06)" }}
      >
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:bg-muted"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex items-center gap-2">
            {/* Logo mark */}
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)" }}
            >
              <Sparkles size={14} color="#fff" />
            </div>
            <span
              className="text-foreground"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "-0.01em" }}
            >
              Influenc<span style={{ color: "var(--brand-blue)" }}>IA</span>
            </span>
          </div>
          <div
            className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded text-xs ml-2"
            style={{ background: "var(--secondary)", color: "var(--secondary-foreground)", fontWeight: 600 }}
          >
            Design System v1.0
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title="Toggle theme"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar overlay on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static top-14 left-0 h-[calc(100vh-3.5rem)] z-40 lg:z-auto
            w-56 border-r border-sidebar-border bg-sidebar flex-shrink-0
            transition-transform duration-200
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <nav className="p-3 space-y-0.5 h-full overflow-y-auto">
            <p
              className="px-2 pt-2 pb-1 text-muted-foreground uppercase tracking-widest"
              style={{ fontSize: "0.65rem", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}
            >
              Components
            </p>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { onSectionChange(item.id); setSidebarOpen(false); }}
                  className={`
                    w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all
                    ${isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }
                  `}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: isActive ? 500 : 400 }}
                >
                  <span className={isActive ? "opacity-100" : "opacity-60"}>{item.icon}</span>
                  {item.label}
                  {isActive && <ChevronRight size={12} className="ml-auto opacity-70" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh-3.5rem)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ─── Shared section helpers ─── */
export function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h2
        className="text-foreground"
        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.625rem", letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-1 text-muted-foreground"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem" }}
        >
          {description}
        </p>
      )}
      <div className="mt-4 h-px bg-border" />
    </div>
  );
}

export function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3
        className="mb-4 text-foreground"
        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "1rem", letterSpacing: "-0.01em" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

export function DSCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card border border-border rounded-xl p-5 ${className}`}>
      {children}
    </div>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-2 text-muted-foreground"
      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em" }}
    >
      {children}
    </p>
  );
}
