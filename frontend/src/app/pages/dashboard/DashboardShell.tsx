import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate, Link } from "react-router";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard, Compass, FileText, ShoppingBag, CreditCard,
  Calendar, Sparkles, User, MessageSquare, Settings,
  Bell, Sun, Moon, Menu, X, ChevronLeft, ChevronRight,
  Search, LogOut, ChevronDown,
} from "lucide-react";
import { Logo, LogoIcon } from "../../components/ui/Logo";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { useAuth } from "../../../contexts/AuthContext";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

/* ─── Nav items (labels resolved with t() later) ─── */
const primaryNav = [
  { path: "/dashboard",              labelKey: "nav.overview",      icon: LayoutDashboard,  end: true },
  { path: "/dashboard/campaigns",    labelKey: "nav.discover",      icon: Compass },
  { path: "/dashboard/applications", labelKey: "nav.applications",  icon: FileText },
  { path: "/dashboard/marketplace",  labelKey: "nav.marketplace",   icon: ShoppingBag },
  { path: "/dashboard/earnings",     labelKey: "nav.earnings",      icon: CreditCard },
  { path: "/dashboard/calendar",     labelKey: "nav.calendar",      icon: Calendar },
];
const secondaryNav = [
  { path: "/dashboard/coach",        labelKey: "nav.aiCoach",       icon: Sparkles,    ai: true },
  { path: "/dashboard/profile",      labelKey: "nav.myProfile",     icon: User },
  { path: "/dashboard/messaging",    labelKey: "nav.messaging",     icon: MessageSquare },
  { path: "/dashboard/settings",     labelKey: "nav.settings",      icon: Settings },
];

/* ─── Score ring (mini) ─── */
function MiniScoreRing({ score }: { score: number }) {
  const r = 11, circ = 2 * Math.PI * r;
  return (
    <svg width={26} height={26} viewBox="0 0 26 26" style={{ flexShrink: 0 }}>
      <circle cx={13} cy={13} r={r} fill="none" stroke="rgba(124,58,237,0.2)" strokeWidth={3} />
      <circle cx={13} cy={13} r={r} fill="none" stroke="#7C3AED" strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={`${(score / 100) * circ} ${circ}`}
        strokeDashoffset={circ / 4}
      />
      <text x={13} y={16} textAnchor="middle" style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.44rem", fill: "var(--foreground)" }}>{score}</text>
    </svg>
  );
}

/* ─── Nav item ─── */
function NavItem({
  path, labelKey, icon: Icon, badge, ai, collapsed, end,
  onClick,
}: {
  path: string; labelKey: string; icon: any; badge?: number | string;
  ai?: boolean; collapsed?: boolean; end?: boolean; onClick?: () => void;
}) {
  const { t } = useTranslation("influencerDashboard");
  const label = t(labelKey);
  return (
    <NavLink
      to={path}
      end={end}
      onClick={onClick}
      style={({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        gap: collapsed ? 0 : "0.625rem",
        padding: collapsed ? "0.5625rem" : "0.4375rem 0.75rem",
        borderRadius: "0.375rem",
        justifyContent: collapsed ? "center" : "flex-start",
        textDecoration: "none",
        position: "relative",
        transition: "background .12s, color .12s",
        background: isActive
          ? ai ? "var(--ai-surface)" : "var(--sidebar-accent)"
          : "transparent",
        color: isActive
          ? ai ? "var(--ai)" : "var(--sidebar-accent-foreground)"
          : "var(--muted-foreground)",
      })}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span style={{ position: "absolute", left: 0, top: "18%", bottom: "18%", width: 2.5, borderRadius: "0 2px 2px 0", background: ai ? "var(--ai)" : "var(--sidebar-primary)" }} />
          )}
          <Icon
            size={16}
            style={{
              flexShrink: 0,
              color: isActive ? (ai ? "var(--ai)" : "var(--sidebar-primary)") : "currentColor",
              opacity: isActive ? 1 : 0.5,
            }}
          />
          {!collapsed && (
            <>
              <span style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: isActive ? 500 : 400, flex: 1, whiteSpace: "nowrap" }}>
                {label}
              </span>
              {badge !== undefined && (
                <span style={{ minWidth: 17, height: 17, borderRadius: 999, padding: "0 4px", background: "var(--primary)", color: "#fff", fontFamily: f.b, fontSize: "0.625rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {badge}
                </span>
              )}
              {ai && !badge && (
                <span style={{ padding: "0.1rem 0.4rem", borderRadius: 999, background: "var(--ai-surface)", color: "var(--ai)", fontFamily: f.b, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.03em" }}>
                  AI
                </span>
              )}
            </>
          )}
          {collapsed && badge !== undefined && (
            <span style={{ position: "absolute", top: 5, right: 5, width: 7, height: 7, borderRadius: "50%", background: "var(--primary)", border: "2px solid var(--sidebar)" }} />
          )}
        </>
      )}
    </NavLink>
  );
}

/* ─── Sidebar ─── */
function Sidebar({
  collapsed,
  onToggle,
  onClose,
  isMobile,
}: {
  collapsed: boolean;
  onToggle: () => void;
  onClose?: () => void;
  isMobile?: boolean;
}) {
  const { user } = useAuth();
  const { t } = useTranslation("influencerDashboard");
  const navigate = useNavigate();
  const w = collapsed ? 64 : 232;

  return (
    <aside
      style={{
        width: w,
        minHeight: "100vh",
        background: "var(--sidebar)",
        borderRight: "1px solid var(--sidebar-border)",
        display: "flex",
        flexDirection: "column",
        transition: "width .2s ease",
        flexShrink: 0,
        overflow: "hidden",
        position: isMobile ? "fixed" : "sticky",
        top: 0,
        left: isMobile ? 0 : undefined,
        zIndex: isMobile ? 50 : undefined,
        height: isMobile ? "100vh" : undefined,
        boxShadow: isMobile ? "4px 0 24px rgba(0,0,0,0.12)" : "none",
      }}
    >
      {/* Logo row */}
      <div
        style={{
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "0 1rem" : "0 1rem",
          borderBottom: "1px solid var(--sidebar-border)",
          flexShrink: 0,
        }}
      >
        {!collapsed && (
          <Logo iconSize={28} textSize="0.9375rem" />
        )}
        {collapsed && (
          <LogoIcon size={28} />
        )}
        {!isMobile && (
          <button
            onClick={onToggle}
            style={{
              width: 24, height: 24, borderRadius: "0.375rem",
              background: "var(--muted)", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--muted-foreground)", flexShrink: 0,
            }}
          >
            {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
          </button>
        )}
        {isMobile && onClose && (
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex", marginLeft: "auto" }}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* Scrollable nav */}
      <nav style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "0.5rem 0.5rem", display: "flex", flexDirection: "column", gap: "1px" }}>
        {primaryNav.map((item) => (
          <NavItem key={item.path} {...item} collapsed={collapsed} onClick={onClose} />
        ))}

        <div style={{ height: 1, background: "var(--sidebar-border)", margin: "0.375rem 0.5rem 0.375rem" }} />

        {!collapsed && (
          <p style={{ padding: "0.25rem 0.75rem 0.125rem", fontFamily: f.b, fontSize: "0.6875rem", fontWeight: 500, color: "var(--muted-foreground)", letterSpacing: "0.04em", opacity: 0.55 }}>
            {t("nav.tools")}
          </p>
        )}
        {secondaryNav.map((item) => (
          <NavItem key={item.path} {...item} collapsed={collapsed} onClick={onClose} />
        ))}
      </nav>

      {/* User section */}
      <div style={{ padding: "0.75rem 0.625rem", borderTop: "1px solid var(--sidebar-border)", flexShrink: 0 }}>
        {collapsed ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link
              to="/dashboard/profile"
              style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", textDecoration: "none" }}
            >
              <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.8rem", color: "#fff" }}>
                {user?.name?.charAt(0).toUpperCase() || "S"}
              </span>
            </Link>
          </div>
        ) : (
          <Link
            to="/dashboard/profile"
            style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.5rem 0.5rem", borderRadius: "0.625rem", background: "var(--sidebar-accent)", cursor: "pointer", textDecoration: "none" }}
          >
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.8rem", color: "#fff" }}>
                {user?.name?.charAt(0).toUpperCase() || "S"}
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.8125rem", color: "var(--sidebar-foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.name || "Influencer"}
              </p>
              <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>Creator</p>
            </div>
            <MiniScoreRing score={user?.influencer_profile?.ai_score || 85} />
          </Link>
        )}
      </div>
    </aside>
  );
}

/* ─── Topbar ─── */
function Topbar({
  onMenuOpen,
  scrolled,
}: {
  onMenuOpen: () => void;
  scrolled: boolean;
}) {
  const { theme, setTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation("influencerDashboard");

  const pageTitle: Record<string, string> = {
    "/dashboard":              t("nav.overview"),
    "/dashboard/campaigns":    t("nav.discover"),
    "/dashboard/applications": t("nav.applications"),
    "/dashboard/marketplace":  t("nav.marketplace"),
    "/dashboard/earnings":     t("nav.earnings"),
    "/dashboard/calendar":     t("nav.calendar"),
    "/dashboard/coach":        t("nav.aiCoach"),
    "/dashboard/profile":      t("nav.myProfile"),
    "/dashboard/messaging":    t("nav.messaging"),
    "/dashboard/settings":     t("nav.settings"),
  };
  const title = pageTitle[location.pathname] ?? "Dashboard";

  return (
    <header
      style={{
        height: 60,
        background: "var(--card)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.25rem",
        gap: "1rem",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 30,
        boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.06)" : "none",
        transition: "box-shadow .2s",
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
        <button
          className="flex lg:hidden"
          onClick={onMenuOpen}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--foreground)", display: "flex", padding: "0.25rem" }}
        >
          <Menu size={20} />
        </button>
        <h1 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.0625rem", color: "var(--foreground)", letterSpacing: "-0.015em", whiteSpace: "nowrap" }}>
          {title}
        </h1>
      </div>

      {/* Center search — desktop only */}
      <div
        className="hidden md:flex"
        style={{
          flex: 1, maxWidth: 340,
          position: "relative",
        }}
      >
        <Search size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
        <input
          type="search"
          placeholder="Search campaigns, creators…"
          style={{
            width: "100%", height: "2.125rem",
            paddingLeft: "2.125rem", paddingRight: "0.75rem",
            borderRadius: "0.5rem",
            border: "1px solid var(--border)",
            background: "var(--background)",
            color: "var(--foreground)",
            fontFamily: f.b, fontSize: "0.8125rem",
            outline: "none",
          }}
        />
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div className="hidden sm:flex">
          <LanguageSwitcher />
        </div>
        
        {/* Theme */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{ width: 32, height: 32, borderRadius: "0.375rem", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--muted)", border: "none", cursor: "pointer", color: "var(--muted-foreground)" }}
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            style={{ width: 32, height: 32, borderRadius: "0.375rem", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--muted)", border: "none", cursor: "pointer", color: "var(--muted-foreground)", position: "relative" }}
          >
            <Bell size={15} />
            <span style={{ position: "absolute", top: 5, right: 5, width: 8, height: 8, borderRadius: "50%", background: "#EC4899", border: "2px solid var(--card)" }} />
          </button>
          {notificationsOpen && (
            <>
              <div onClick={() => setNotificationsOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
              <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 300, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1rem", boxShadow: "0 10px 40px rgba(0,0,0,0.12)", zIndex: 50 }}>
                <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>Notifications</h3>
                <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                  <Bell size={24} style={{ color: "var(--muted-foreground)", margin: "0 auto 0.5rem", opacity: 0.5 }} />
                  <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>You're all caught up!</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setProfileOpen((o) => !o)}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0.5rem", borderRadius: "2rem", border: "1px solid var(--border)", background: "var(--card)", cursor: "pointer" }}
          >
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.65rem", color: "#fff" }}>
                {user?.name?.charAt(0).toUpperCase() || "S"}
              </span>
            </div>
            <span className="hidden sm:inline" style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)" }}>
              {user?.name ? user.name.split(" ")[0] : "Influencer"}
            </span>
            <ChevronDown size={12} style={{ color: "var(--muted-foreground)" }} />
          </button>

          {profileOpen && (
            <>
              <div onClick={() => setProfileOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 10 }} />
              <div
                style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0,
                  width: 200, background: "var(--card)",
                  border: "1px solid var(--border)", borderRadius: "0.75rem",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 20,
                  overflow: "hidden",
                  padding: "0.375rem",
                }}
              >
                <div style={{ padding: "0.625rem 0.75rem", borderBottom: "1px solid var(--border)", marginBottom: "0.375rem" }}>
                  <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{user?.name || "Influencer"}</p>
                  <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{user?.email || ""}</p>
                </div>
                {[
                  { labelKey: "topbar.my_profile", path: "/dashboard/profile", icon: <User size={14} /> },
                  { labelKey: "topbar.settings",   path: "/dashboard/settings", icon: <Settings size={14} /> },
                ].map((item) => (
                  <button
                    key={item.labelKey}
                    onClick={() => { setProfileOpen(false); navigate(item.path); }}
                    style={{ display: "flex", alignItems: "center", gap: "0.625rem", width: "100%", padding: "0.5rem 0.75rem", borderRadius: "0.375rem", background: "none", border: "none", cursor: "pointer", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.875rem" }}
                  >
                    <span style={{ color: "var(--muted-foreground)" }}>{item.icon}</span>
                    {t(item.labelKey)}
                  </button>
                ))}
                <div style={{ height: 1, background: "var(--border)", margin: "0.375rem 0" }} />
                <button 
                  onClick={() => logout()}
                  style={{ display: "flex", alignItems: "center", gap: "0.625rem", width: "100%", padding: "0.5rem 0.75rem", borderRadius: "0.375rem", background: "none", border: "none", cursor: "pointer", color: "var(--brand-error, #EF4444)", fontFamily: f.b, fontSize: "0.875rem" }}>
                  <LogOut size={14} /> {t("topbar.sign_out")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

/* ─── Shell ─── */
export function DashboardShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 4);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", height: "100dvh", overflow: "hidden", background: "var(--background)" }}>
      {/* Desktop sidebar */}

      <div className="hidden lg:flex" style={{ height: "100%", position: "sticky", top: 0, zIndex: 40, flexShrink: 0 }}>
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      </div>


      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div
            onClick={() => setMobileOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.35)" }}
          />
          <Sidebar
            collapsed={false}
            onToggle={() => {}}
            onClose={() => setMobileOpen(false)}
            isMobile
          />
        </>
      )}

      {/* Main column */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar onMenuOpen={() => setMobileOpen(true)} scrolled={scrolled} />
        <div
          ref={mainRef}
          style={{ flex: 1, overflowY: "auto" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

