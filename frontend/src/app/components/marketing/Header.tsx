import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { Menu, X, Sun, Moon, Sparkles, ChevronDown } from "lucide-react";
import { Logo } from "../ui/Logo";
import { LanguageSwitcher } from "../LanguageSwitcher";

const navLinks = [
  { labelKey: "nav.home",            href: "/" },
  { labelKey: "nav.forBrands",      href: "/brands" },
  { labelKey: "nav.forInfluencers", href: "/influencers" },
  { labelKey: "nav.pricing",         href: "/#pricing" },
];

export function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "var(--card)",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
          transition: "box-shadow 0.2s, border-color 0.2s",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            <Logo iconSize={30} textSize="1.0625rem" />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex"
            style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
          >
            {navLinks.map((link) => {
              const isActive = link.href !== "/" ? pathname.startsWith(link.href) : pathname === "/";
              return (
                <Link
                  key={link.labelKey}
                  to={link.href}
                  style={{
                    padding: "0.4375rem 0.875rem",
                    borderRadius: "0.375rem",
                    textDecoration: "none",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                    background: "transparent",
                    transition: "color 0.12s",
                    position: "relative",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexShrink: 0 }}>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              style={{
                width: 34, height: 34, borderRadius: "0.5rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--muted)", border: "none", cursor: "pointer",
                color: "var(--muted-foreground)",
              }}
              className="hidden md:flex"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <div className="hidden md:flex">
              <LanguageSwitcher />
            </div>
            <Link
              to="/login"
              style={{
                padding: "0.4375rem 0.875rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 400,
                color: "var(--muted-foreground)",
                textDecoration: "none",
              }}
              className="hidden md:inline"
            >
              {t("nav.signIn")}
            </Link>
            <Link
              to="/register"
              style={{
                padding: "0.5rem 1.125rem",
                borderRadius: "0.5rem",
                background: "var(--primary)",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                flexShrink: 0,
              }}
            >
              {t("nav.getStartedFree")}
            </Link>
            {/* Mobile menu toggle */}
            <button
              className="flex md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: 34, height: 34, borderRadius: "0.5rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--muted)", border: "none", cursor: "pointer",
                color: "var(--foreground)",
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: "4rem",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            background: "var(--card)",
            borderTop: "1px solid var(--border)",
            padding: "1.5rem",
            overflowY: "auto",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginBottom: "1.5rem" }}>
            <div style={{ padding: "0.5rem 1rem", marginBottom: "0.5rem" }}>
              <LanguageSwitcher />
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.labelKey}
                to={link.href}
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: "var(--foreground)",
                }}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Link
              to="/login"
              style={{
                padding: "0.75rem 1rem", borderRadius: "0.5rem",
                textDecoration: "none", textAlign: "center",
                fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", fontWeight: 500,
                border: "1px solid var(--border)", color: "var(--foreground)",
              }}
            >
              {t("nav.signIn")}
            </Link>
            <Link
              to="/contact"
              style={{
                padding: "0.75rem 1rem", borderRadius: "0.5rem",
                textDecoration: "none", textAlign: "center",
                fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", fontWeight: 500,
                background: "var(--primary)", color: "#fff",
              }}
            >
              {t("nav.getStartedFreeLong")}
            </Link>
          </div>
        </div>
      )}

      {/* Spacer so content doesn't go under fixed header */}
      <div style={{ height: "4rem" }} />
    </>
  );
}
