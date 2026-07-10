import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, Link, useNavigate } from "react-router";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard, Megaphone, Search, BarChart2,
  CreditCard, Settings, Bell, Sun, Moon, Menu, X,
  ChevronLeft, ChevronRight, Sparkles, LogOut, ChevronDown,
  Plus, Users, MessageSquare,
} from "lucide-react";
import { Logo, LogoIcon } from "../../components/ui/Logo";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { useAuth } from "../../../contexts/AuthContext";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

const primaryNav = [
  { path: "/brand",             labelKey: "nav.overview",          icon: LayoutDashboard, end: true },
  { path: "/brand/campaigns",   labelKey: "nav.campaigns",         icon: Megaphone },
  { path: "/brand/creators",    labelKey: "nav.creators",          icon: Search },
  { path: "/brand/analytics",   labelKey: "nav.analytics",         icon: BarChart2 },
  { path: "/brand/payments",    labelKey: "nav.payments",          icon: CreditCard },
  { path: "/brand/messaging",   labelKey: "nav.messaging",         icon: MessageSquare },
];

function NavItem({ path, label, icon: Icon, badge, end, collapsed, onClick }: any) {
  return (
    <NavLink to={path} end={end} onClick={onClick}
      style={({ isActive }) => ({
        display: "flex", alignItems: "center", gap: collapsed ? 0 : "0.625rem",
        padding: collapsed ? "0.5625rem" : "0.4375rem 0.75rem",
        borderRadius: "0.375rem", justifyContent: collapsed ? "center" : "flex-start",
        textDecoration: "none", position: "relative", transition: "background .12s, color .12s",
        background: isActive ? "var(--sidebar-accent)" : "transparent",
        color: isActive ? "var(--sidebar-accent-foreground)" : "var(--muted-foreground)",
      })}
    >
      {({ isActive }) => (
        <>
          {isActive && <span style={{ position: "absolute", left: 0, top: "18%", bottom: "18%", width: 2.5, borderRadius: "0 2px 2px 0", background: "var(--sidebar-primary)" }} />}
          <Icon size={16} style={{ flexShrink: 0, color: isActive ? "var(--sidebar-primary)" : "currentColor", opacity: isActive ? 1 : 0.5 }} />
          {!collapsed && (
            <>
              <span style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: isActive ? 500 : 400, flex: 1, whiteSpace: "nowrap" }}>{label}</span>
              {badge && (
                <span style={{ minWidth: 17, height: 17, borderRadius: 999, padding: "0 4px", background: "var(--primary)", color: "#fff", fontFamily: f.b, fontSize: "0.625rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{badge}</span>
              )}
            </>
          )}
          {collapsed && badge && <span style={{ position: "absolute", top: 5, right: 5, width: 7, height: 7, borderRadius: "50%", background: "var(--primary)", border: "2px solid var(--sidebar)" }} />}
        </>
      )}
    </NavLink>
  );
}

function Sidebar({ collapsed, onToggle, onClose, isMobile }: any) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation("brandDashboard");
  return (
    <aside style={{ width: collapsed ? 64 : 232, minHeight: "100vh", background: "var(--sidebar)", borderRight: "1px solid var(--sidebar-border)", display: "flex", flexDirection: "column", transition: "width .2s ease", flexShrink: 0, overflow: "hidden", position: isMobile ? "fixed" : "sticky", top: 0, left: isMobile ? 0 : undefined, zIndex: isMobile ? 50 : undefined, height: isMobile ? "100vh" : undefined, boxShadow: isMobile ? "4px 0 24px rgba(0,0,0,0.12)" : "none" }}>
      {/* Logo */}
      <div style={{ height: 60, display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", padding: "0 1rem", borderBottom: "1px solid var(--sidebar-border)", flexShrink: 0 }}>
        {!collapsed && (
          <Link to="/brand" style={{ textDecoration: "none" }}>
            <Logo iconSize={28} textSize="0.9375rem" />
          </Link>
        )}
        {collapsed && <LogoIcon size={28} />}
        {!isMobile && (
          <button onClick={onToggle} style={{ width: 24, height: 24, borderRadius: "0.375rem", background: "var(--muted)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted-foreground)", flexShrink: 0 }}>
            {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
          </button>
        )}
        {isMobile && <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex", marginLeft: "auto" }}><X size={18} /></button>}
      </div>

      {/* Create campaign CTA */}
      {!collapsed && (
        <div style={{ padding: "0.75rem 0.75rem 0" }}>
          <Link to="/brand/campaigns/new" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5625rem 0.875rem", borderRadius: "0.5rem", background: "var(--sidebar-primary)", color: "#fff", textDecoration: "none", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, boxShadow: "var(--shadow-primary)" }}>
            <Plus size={15} /> {t("nav.new_campaign")}
          </Link>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "0.625rem 0.5rem", display: "flex", flexDirection: "column", gap: "0.125rem" }}>
        {!collapsed && <p style={{ padding: "0.375rem 0.75rem", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.09em", opacity: 0.7, marginTop: "0.5rem" }}>Platform</p>}
        {primaryNav.map((item) => <NavItem key={item.path} {...item} label={t(item.labelKey)} collapsed={collapsed} onClick={onClose} />)}
        <div style={{ height: 1, background: "var(--sidebar-border)", margin: "0.5rem 0.5rem" }} />
        <NavItem path="/brand/settings" label={t("nav.settings")} icon={Settings} collapsed={collapsed} onClick={onClose} />
      </nav>

      {/* User section */}
      <div style={{ padding: "0.75rem 0.625rem", borderTop: "1px solid var(--sidebar-border)", flexShrink: 0 }}>
        {collapsed ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link
              to="/brand/settings"
              style={{ width: 32, height: 32, borderRadius: "0.375rem", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", textDecoration: "none" }}
            >
              <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.75rem", color: "#fff" }}>
                {user?.name?.charAt(0).toUpperCase() || "B"}
              </span>
            </Link>
          </div>
        ) : (
          <Link
            to="/brand/settings"
            style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.5rem", borderRadius: "0.625rem", background: "var(--sidebar-accent)", cursor: "pointer", textDecoration: "none" }}
          >
            <div style={{ width: 32, height: 32, borderRadius: "0.375rem", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.75rem", color: "#fff" }}>
                {user?.name?.charAt(0).toUpperCase() || "B"}
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.8125rem", color: "var(--sidebar-foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.name || t("topbar.profile")}</p>
              <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>Brand account</p>
            </div>
          </Link>
        )}
      </div>
    </aside>
  );
}

function Topbar({ onMenuOpen, scrolled }: { onMenuOpen: () => void; scrolled: boolean }) {
  const { theme, setTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t } = useTranslation("brandDashboard");
  const titles: Record<string, string> = {
    "/brand": t("nav.overview"),
    "/brand/campaigns": t("nav.campaigns"),
    "/brand/campaigns/new": "Create Campaign",
    "/brand/creators": t("nav.creators"),
    "/brand/analytics": t("nav.analytics"),
    "/brand/payments": t("nav.payments"),
    "/brand/settings": t("nav.settings"),
    "/brand/messaging": t("nav.messaging"),
  };
  const title = titles[location.pathname] ?? (location.pathname.startsWith("/brand/campaigns/") ? "Campaign Detail" : "Brand Dashboard");

  return (
    <header style={{ height: 60, background: "var(--card)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.25rem", gap: "1rem", flexShrink: 0, position: "sticky", top: 0, zIndex: 30, boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.06)" : "none", transition: "box-shadow .2s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
        <button className="flex lg:hidden" onClick={onMenuOpen} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--foreground)", display: "flex" }}><Menu size={20} /></button>
        <h1 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.0625rem", color: "var(--foreground)", letterSpacing: "-0.015em" }}>{title}</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div className="hidden sm:flex">
          <LanguageSwitcher />
        </div>
        <Link to="/brand/campaigns/new" className="hidden md:inline-flex" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.4375rem 0.875rem", borderRadius: "0.5rem", background: "var(--primary)", color: "#fff", textDecoration: "none", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, boxShadow: "0 2px 6px rgba(37,99,235,0.22)" }}>
          <Plus size={13} /> {t("nav.new_campaign")}
        </Link>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} style={{ width: 32, height: 32, borderRadius: "0.375rem", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--muted)", border: "none", cursor: "pointer", color: "var(--muted-foreground)" }}>
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <div style={{ position: "relative" }}>
          <button onClick={() => setNotificationsOpen(!notificationsOpen)} style={{ width: 32, height: 32, borderRadius: "0.375rem", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--muted)", border: "none", cursor: "pointer", color: "var(--muted-foreground)", position: "relative" }}>
            <Bell size={15} />
            <span style={{ position: "absolute", top: 5, right: 5, width: 7, height: 7, borderRadius: "50%", background: "#EC4899", border: "2px solid var(--card)" }} />
          </button>
          {notificationsOpen && (
            <>
              <div onClick={() => setNotificationsOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
              <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 300, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1rem", boxShadow: "0 10px 40px rgba(0,0,0,0.12)", zIndex: 50 }}>
                <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>{t("topbar.notifications")}</h3>
                <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                  <Bell size={24} style={{ color: "var(--muted-foreground)", margin: "0 auto 0.5rem", opacity: 0.5 }} />
                  <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>{t("topbar.all_caught_up")}</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div style={{ position: "relative" }}>
          <button onClick={() => setProfileOpen((o) => !o)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0.5rem", borderRadius: "2rem", border: "1px solid var(--border)", background: "var(--card)", cursor: "pointer" }}>
            <div style={{ width: 26, height: 26, borderRadius: "0.375rem", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.65rem", color: "#fff" }}>
                {user?.name?.charAt(0).toUpperCase() || "B"}
              </span>
            </div>
            <span className="hidden sm:inline" style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)" }}>{user?.name ? user.name.split(" ")[0] : t("topbar.profile")}</span>
            <ChevronDown size={12} style={{ color: "var(--muted-foreground)" }} />
          </button>
          {profileOpen && (
            <>
              <div onClick={() => setProfileOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 10 }} />
              <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 200, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.75rem", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 20, overflow: "hidden", padding: "0.375rem" }}>
                <div style={{ padding: "0.625rem 0.75rem", borderBottom: "1px solid var(--border)", marginBottom: "0.375rem" }}>
                  <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{user?.name || t("topbar.profile")}</p>
                  <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{user?.email || ""}</p>
                </div>
                <button 
                  onClick={() => logout()}
                  style={{ display: "flex", alignItems: "center", gap: "0.625rem", width: "100%", padding: "0.5rem 0.75rem", borderRadius: "0.375rem", background: "none", border: "none", cursor: "pointer", color: "#991B1B", fontFamily: f.b, fontSize: "0.875rem" }}>
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

export function BrandShell() {
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
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--background)" }}>
      <div className="hidden lg:flex" style={{ height: "100vh", position: "sticky", top: 0, zIndex: 40, flexShrink: 0 }}>
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      </div>
      {mobileOpen && (
        <>
          <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.35)" }} />
          <Sidebar collapsed={false} onToggle={() => {}} onClose={() => setMobileOpen(false)} isMobile />
        </>
      )}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar onMenuOpen={() => setMobileOpen(true)} scrolled={scrolled} />
        <div ref={mainRef} style={{ flex: 1, overflowY: "auto" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
