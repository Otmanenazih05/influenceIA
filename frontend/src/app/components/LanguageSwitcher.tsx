import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.375rem",
        background: "var(--card)",
        border: "1px solid var(--border)",
        padding: "0.375rem 0.625rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "var(--foreground)",
        transition: "border-color 0.15s"
      }}
      onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--primary)" }}
      onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--border)" }}
    >
      <Globe size={14} style={{ color: "var(--muted-foreground)" }} />
      {i18n.language === "en" ? "EN" : "FR"}
    </button>
  );
}
