import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ArrowRight, Mail, MessageSquare, ChevronDown, ChevronUp, Sparkles, MapPin, Clock } from "lucide-react";

const font = { heading: "'Poppins', sans-serif", body: "'Inter', sans-serif" };

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.125rem 0", background: "transparent", border: "none", cursor: "pointer",
          gap: "1rem", textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: font.body, fontWeight: open ? 600 : 400, fontSize: "0.9375rem",
            color: "var(--foreground)", lineHeight: 1.5,
          }}
        >
          {q}
        </span>
        <span style={{ color: "var(--muted-foreground)", flexShrink: 0 }}>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: "1.125rem" }}>
          <p
            style={{
              fontFamily: font.body, fontSize: "0.9rem", color: "var(--muted-foreground)",
              lineHeight: 1.75,
            }}
          >
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

const inputBase: React.CSSProperties = {
  width: "100%",
  height: "2.625rem",
  padding: "0 0.875rem",
  borderRadius: "0.5rem",
  border: "1px solid var(--border)",
  background: "var(--input-background)",
  color: "var(--foreground)",
  fontFamily: font.body,
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
      <label
        style={{
          fontFamily: font.body, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)",
        }}
      >
        {label} {required && <span style={{ color: "var(--brand-pink)" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export function ContactPage() {
  const { t } = useTranslation("contact");
  const [role, setRole] = useState("brand");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: "var(--background)" }}>

      {/* ═══ HERO ═══ */}
      <section
        style={{
          background: "var(--card)", padding: "4rem 1.5rem 5rem",
          borderBottom: "1px solid var(--border)", textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              padding: "0.3125rem 0.875rem", borderRadius: 999,
              background: "var(--secondary)", marginBottom: "1.25rem",
              fontFamily: font.body, fontSize: "0.75rem", fontWeight: 600,
              color: "var(--secondary-foreground)",
            }}
          >
            <MessageSquare size={12} /> {t("hero.label")}
          </div>
          <h1
            style={{
              fontFamily: font.heading, fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "var(--foreground)", lineHeight: 1.15, letterSpacing: "-0.04em",
              marginBottom: "1rem",
            }}
          >
            {t("hero.title")}
          </h1>
          <p
            style={{
              fontFamily: font.body, fontSize: "1rem", color: "var(--muted-foreground)",
              lineHeight: 1.7,
            }}
          >
            {t("hero.desc")}
          </p>
        </div>
      </section>

      {/* ═══ CONTACT FORM + SIDEBAR ═══ */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--background)" }}>
        <div
          style={{
            maxWidth: 1080, margin: "0 auto",
            display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem", alignItems: "start",
          }}
          className="block md:grid"
        >
          {/* Form */}
          <div
            style={{
              background: "var(--card)", border: "1px solid var(--border)",
              borderRadius: "1rem", padding: "2.5rem",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div
                  style={{
                    width: 60, height: 60, borderRadius: "50%",
                    background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1.25rem",
                  }}
                >
                  <Sparkles size={26} style={{ color: "#065F46" }} />
                </div>
                <h3
                  style={{
                    fontFamily: font.heading, fontWeight: 700, fontSize: "1.375rem",
                    color: "var(--foreground)", marginBottom: "0.625rem",
                  }}
                >
                  {t("form.submitted_title")}
                </h3>
                <p style={{ fontFamily: font.body, fontSize: "0.9375rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>
                  {t("form.submitted_desc")}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: "1.5rem", padding: "0.625rem 1.5rem", borderRadius: "0.5rem",
                    border: "1px solid var(--border)", background: "var(--card)",
                    color: "var(--foreground)", fontFamily: font.body, fontSize: "0.875rem",
                    cursor: "pointer",
                  }}
                >
                  {t("form.btn_another")}
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "2rem" }}>
                  <h2 style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", marginBottom: "0.375rem" }}>
                    {t("form.title")}
                  </h2>
                  <p style={{ fontFamily: font.body, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                    {t("form.desc")}
                  </p>
                </div>

                {/* Role selector */}
                <div style={{ marginBottom: "1.75rem" }}>
                  <p style={{ fontFamily: font.body, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.625rem" }}>
                    {t("form.role_label")} <span style={{ color: "var(--brand-pink)" }}>*</span>
                  </p>
                  <div style={{ display: "flex", gap: "0.625rem" }}>
                    {[
                      { value: "brand", label: t("form.role_brand") },
                      { value: "creator", label: t("form.role_creator") },
                      { value: "other", label: t("form.role_other") },
                    ].map((r) => (
                      <button
                        key={r.value}
                        onClick={() => setRole(r.value)}
                        style={{
                          flex: 1, padding: "0.625rem 0.75rem", borderRadius: "0.5rem",
                          border: `1.5px solid ${role === r.value ? "var(--primary)" : "var(--border)"}`,
                          background: role === r.value ? "#EFF6FF" : "var(--card)",
                          color: role === r.value ? "var(--primary)" : "var(--muted-foreground)",
                          fontFamily: font.body, fontSize: "0.875rem", fontWeight: role === r.value ? 600 : 400,
                          cursor: "pointer", transition: "all 0.15s",
                        }}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                    <Field label={t("form.fn_label")} required>
                      <input
                        type="text" placeholder={t("form.fn_ph")}
                        required
                        style={inputBase}
                        onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                      />
                    </Field>
                    <Field label={t("form.ln_label")} required>
                      <input
                        type="text" placeholder={t("form.ln_ph")}
                        required
                        style={inputBase}
                        onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                      />
                    </Field>
                  </div>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <Field label={t("form.email_label")} required>
                      <input
                        type="email" placeholder={t("form.email_ph")}
                        required
                        style={inputBase}
                        onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                      />
                    </Field>
                  </div>

                  {role === "brand" && (
                    <div style={{ marginBottom: "1.25rem" }}>
                      <Field label={t("form.company_label")}>
                        <input
                          type="text" placeholder={t("form.company_ph")}
                          style={inputBase}
                          onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                        />
                      </Field>
                    </div>
                  )}

                  {role === "creator" && (
                    <div style={{ marginBottom: "1.25rem" }}>
                      <Field label={t("form.handle_label")}>
                        <input
                          type="text" placeholder={t("form.handle_ph")}
                          style={inputBase}
                          onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                        />
                      </Field>
                    </div>
                  )}

                  <div style={{ marginBottom: "1.75rem" }}>
                    <Field label={t("form.help_label")} required>
                      <textarea
                        rows={5}
                        placeholder={
                          role === "brand"
                            ? t("form.help_ph_brand")
                            : role === "creator"
                            ? t("form.help_ph_creator")
                            : t("form.help_ph_other")
                        }
                        required
                        style={{
                          ...inputBase,
                          height: "auto",
                          padding: "0.75rem 0.875rem",
                          resize: "vertical",
                          lineHeight: 1.65,
                        }}
                        onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                      />
                    </Field>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%", padding: "0.8125rem", borderRadius: "0.625rem",
                      border: "none", background: "var(--primary)", color: "#fff",
                      fontFamily: font.body, fontSize: "0.9375rem", fontWeight: 500,
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                      boxShadow: "var(--shadow-primary)",
                    }}
                  >
                    {t("form.btn_send")} <ArrowRight size={16} />
                  </button>

                  <p style={{ fontFamily: font.body, fontSize: "0.75rem", color: "var(--muted-foreground)", textAlign: "center", marginTop: "0.875rem" }}>
                    {t("form.policy")}
                  </p>
                </form>
              </>
            )}
          </div>

          {/* Sidebar info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div
              style={{
                background: "var(--card)", border: "1px solid var(--border)",
                borderRadius: "0.875rem", padding: "1.5rem",
              }}
            >
              <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "1rem" }}>
                {t("sidebar.title")}
              </p>
              {[
                { icon: <Mail size={16} />, text: t("sidebar.email") },
                { icon: <MapPin size={16} />, text: t("sidebar.address") },
                { icon: <Clock size={16} />, text: t("sidebar.reply") },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <span style={{ color: "var(--muted-foreground)" }}>{item.icon}</span>
                  <span style={{ fontFamily: font.body, fontSize: "0.875rem", color: "var(--foreground)" }}>{item.text}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "var(--secondary)", border: "1px solid #DDD6FE",
                borderRadius: "0.875rem", padding: "1.5rem",
              }}
            >
              <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.875rem", color: "var(--secondary-foreground)", marginBottom: "0.5rem" }}>
                {t("sidebar.for_brands_title")}
              </p>
              <p style={{ fontFamily: font.body, fontSize: "0.8125rem", color: "var(--secondary-foreground)", lineHeight: 1.6, opacity: 0.85 }}>
                {t("sidebar.for_brands_desc")}
              </p>
            </div>

            <div
              style={{
                background: "#EFF6FF", border: "1px solid #BFDBFE",
                borderRadius: "0.875rem", padding: "1.5rem",
              }}
            >
              <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.875rem", color: "#1E40AF", marginBottom: "0.5rem" }}>
                {t("sidebar.for_creators_title")}
              </p>
              <p style={{ fontFamily: font.body, fontSize: "0.8125rem", color: "#2563EB", lineHeight: 1.6, opacity: 0.9 }}>
                {t("sidebar.for_creators_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.375rem",
                padding: "0.3125rem 0.875rem", borderRadius: 999,
                background: "var(--secondary)",
                fontFamily: font.body, fontSize: "0.75rem", fontWeight: 600,
                color: "var(--secondary-foreground)", marginBottom: "1rem",
              }}
            >
              {t("faq_section.label")}
            </div>
            <h2
              style={{
                fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                color: "var(--foreground)", letterSpacing: "-0.03em", marginBottom: "0.75rem",
              }}
            >
              {t("faq_section.title")}
            </h2>
            <p style={{ fontFamily: font.body, fontSize: "0.9375rem", color: "var(--muted-foreground)" }}>
              {t("faq_section.desc")}
            </p>
          </div>

          <div
            style={{
              background: "var(--background)", border: "1px solid var(--border)",
              borderRadius: "0.875rem", padding: "0 1.5rem",
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => (
              <FAQItem key={idx} q={t(`faqs.${idx}.q`)} a={t(`faqs.${idx}.a`)} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
