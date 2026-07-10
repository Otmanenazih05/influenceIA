import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../../../lib/api";
import { useAuth } from "../../../contexts/AuthContext";
import { ArrowRight, ArrowLeft, Check, Sparkles, CheckCircle } from "lucide-react";
import { RoleStep, type Role } from "../../components/auth/RoleStep";
import { Logo } from "../../components/ui/Logo";
import { CreatorInfoStep, type CreatorInfo } from "../../components/auth/CreatorInfoStep";
import { BrandInfoStep, type BrandInfo } from "../../components/auth/BrandInfoStep";
import { SocialLinkingStep, type ConnectedAccount } from "../../components/auth/SocialLinkingStep";
import { CredentialsStep, type Credentials } from "../../components/auth/CredentialsStep";
import { useTranslation } from "react-i18next";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

/* ─── Step definitions per role ─── */
const STEPS_CREATOR = (t: any) => [
  { label: t("register.steps_creator.role.label"),     short: t("register.steps_creator.role.short")      },
  { label: t("register.steps_creator.info.label"),     short: t("register.steps_creator.info.short")   },
  { label: t("register.steps_creator.socials.label"),  short: t("register.steps_creator.socials.short")   },
  { label: t("register.steps_creator.account.label"),  short: t("register.steps_creator.account.short")   },
];
const STEPS_BRAND = (t: any) => [
  { label: t("register.steps_brand.role.label"),     short: t("register.steps_brand.role.short")    },
  { label: t("register.steps_brand.company.label"),  short: t("register.steps_brand.company.short") },
  { label: t("register.steps_brand.account.label"),  short: t("register.steps_brand.account.short") },
];
const STEPS_DEFAULT = [
  { label: "Your role",     short: "Role"    },
  { label: "Your info",     short: "Info"    },
  { label: "Link socials",  short: "Socials" },
  { label: "Set password",  short: "Account" },
];

/* ─── Progress stepper ─── */
function Stepper({ steps, current }: { steps: { label: string; short: string }[]; current: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={step.short} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
              <div
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: done ? "#2563EB" : active ? "#2563EB" : "var(--muted)",
                  border: `2px solid ${done || active ? "#2563EB" : "var(--border)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all .2s",
                  boxShadow: active ? "0 0 0 4px rgba(37,99,235,0.15)" : "none",
                }}
              >
                {done
                  ? <Check size={14} color="#fff" strokeWidth={2.5} />
                  : <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.75rem", color: active ? "#fff" : "var(--muted-foreground)" }}>{i + 1}</span>}
              </div>
              <span
                style={{
                  fontFamily: f.b, fontSize: "0.7rem", fontWeight: active ? 600 : 400,
                  color: active ? "var(--foreground)" : done ? "var(--foreground)" : "var(--muted-foreground)",
                  whiteSpace: "nowrap",
                }}
              >
                {step.short}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  width: 52, height: 2, borderRadius: 999,
                  background: i < current ? "#2563EB" : "var(--border)",
                  margin: "0 0.375rem",
                  marginBottom: 18,
                  transition: "background .2s",
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Success screen ─── */
function SuccessScreen({ role }: { role: Role | null }) {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
      <div
        style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "linear-gradient(135deg, #2563EB, #7C3AED)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.5rem",
          boxShadow: "0 8px 24px rgba(37,99,235,0.3)",
        }}
      >
        <CheckCircle size={34} color="#fff" />
      </div>
      <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.625rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.625rem" }}>
        {t("register.success.title")}
      </h2>
      <p style={{ fontFamily: f.b, fontSize: "0.9375rem", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "36ch", margin: "0 auto 2rem" }}>
        {role === "influencer"
          ? t("register.success.influencer_desc")
          : t("register.success.brand_desc")}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 280, margin: "0 auto" }}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            width: "100%", padding: "0.75rem", borderRadius: "0.625rem",
            background: "#2563EB", color: "#fff", border: "none", cursor: "pointer",
            fontFamily: f.b, fontSize: "0.9375rem", fontWeight: 500,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
            boxShadow: "var(--shadow-primary)",
          }}
        >
          {role === "influencer" ? t("register.success.btn_influencer") : t("register.success.btn_brand")}
          <ArrowRight size={16} />
        </button>
        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%", padding: "0.75rem", borderRadius: "0.625rem",
            border: "1px solid var(--border)", background: "var(--card)",
            color: "var(--muted-foreground)", cursor: "pointer",
            fontFamily: f.b, fontSize: "0.875rem",
          }}
        >
          {t("register.success.btn_home")}
        </button>
      </div>
    </div>
  );
}

/* ─── Main RegisterPage ─── */
export function RegisterPage() {
  const { t } = useTranslation("auth");
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();

  // ─── Form state ───
  const [role, setRole] = useState<Role | null>(null);

  const [creatorInfo, setCreatorInfo] = useState<CreatorInfo>({
    firstName: "", lastName: "", country: "", city: "", phone: "",
    niches: [], isAdult: false, termsAccepted: false,
  });

  const [brandInfo, setBrandInfo] = useState<BrandInfo>({
    companyName: "", contactName: "", email: "", phone: "", website: "", industry: "",
  });

  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);

  const [credentials, setCredentials] = useState<Credentials>({
    email: "", password: "", confirmPassword: "",
  });

  // ─── Step config ───
  const steps = role === "brand" ? STEPS_BRAND(t) : STEPS_CREATOR(t);
  // Step indices: 0=Role, 1=Info, 2=Socials(creator only)/Credentials(brand), 3=Credentials(creator only)
  const totalSteps = steps.length;

  // ─── Validation per step ───
  const canContinue = (): boolean => {
    if (step === 0) return role !== null;
    if (step === 1) {
      if (role === "influencer") {
        return !!(creatorInfo.firstName && creatorInfo.lastName && creatorInfo.country && creatorInfo.niches.length > 0 && creatorInfo.isAdult && creatorInfo.termsAccepted);
      }
      return !!(brandInfo.companyName && brandInfo.contactName && brandInfo.email && brandInfo.industry);
    }
    if (step === 2) {
      if (role === "influencer") return connectedAccounts.length > 0;
      // brand: credentials step
      return !!(credentials.email && credentials.password.length >= 8 && credentials.password === credentials.confirmPassword);
    }
    if (step === 3) {
      // creator credentials
      return !!(credentials.email && credentials.password.length >= 8 && credentials.password === credentials.confirmPassword);
    }
    return false;
  };

  const handleContinue = async () => {
    setError("");
    if (step < totalSteps - 1) {
      if (step === 1 && role === "brand") {
        setCredentials((prev) => ({ ...prev, email: brandInfo.email }));
      }
      setStep((s) => s + 1);
    } else {
      // Final step -> Submit to API
      setIsLoading(true);
      try {
        let response;
        if (role === "influencer") {
          const payload = {
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.confirmPassword,
            full_name: `${creatorInfo.firstName} ${creatorInfo.lastName}`.trim(),
            gender: "Not specified",
            country: creatorInfo.country,
            city: creatorInfo.city,
            phone: creatorInfo.phone || "0000000000",
            age_confirmed: creatorInfo.isAdult,
            terms_accepted: creatorInfo.termsAccepted,
          };
          response = await api.post("/api/auth/register/influencer", payload);
          
          // Set login state using correct response fields
          login(response.data.access_token, response.data.data);
          
          // Post social accounts if any were linked
          if (connectedAccounts.length > 0) {
            await api.post("/api/auth/social-accounts", {
              accounts: connectedAccounts.map(acc => ({
                platform: acc.platform,
                handle: acc.handle,
              })),
            });
          }
        } else {
          // Brand registration
          let websiteUrl = brandInfo.website ? brandInfo.website.trim() : "";
          if (websiteUrl && !/^https?:\/\//i.test(websiteUrl)) {
            websiteUrl = `https://${websiteUrl}`;
          }
          const payload = {
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.confirmPassword,
            company_name: brandInfo.companyName,
            contact_name: brandInfo.contactName,
            website: websiteUrl || "https://example.com",
            industry: brandInfo.industry,
            phone: brandInfo.phone || "0000000000",
          };
          response = await api.post("/api/auth/register/brand", payload);
          login(response.data.access_token, response.data.data);
        }
        
        setDone(true);
      } catch (err: any) {
        if (err.response?.data?.errors) {
          const detailedErrors = Object.values(err.response.data.errors).flat().join(" ");
          setError(detailedErrors || "Validation failed.");
        } else {
          setError(err.response?.data?.message || "Registration failed. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  // ─── Which step component to render ───
  const renderStep = () => {
    if (step === 0) {
      return (
        <RoleStep
          selected={role}
          onSelect={(r) => { setRole(r); }}
        />
      );
    }
    if (step === 1) {
      if (role === "influencer") {
        return (
          <CreatorInfoStep
            data={creatorInfo}
            onChange={(d) => setCreatorInfo((prev) => ({ ...prev, ...d }))}
          />
        );
      }
      return (
        <BrandInfoStep
          data={brandInfo}
          onChange={(d) => setBrandInfo((prev) => ({ ...prev, ...d }))}
        />
      );
    }
    if (step === 2 && role === "influencer") {
      return (
        <SocialLinkingStep
          accounts={connectedAccounts}
          onChange={setConnectedAccounts}
        />
      );
    }
    // Last step = credentials (both roles)
    return (
      <CredentialsStep
        data={credentials}
        role={role}
        onChange={(d) => setCredentials((prev) => ({ ...prev, ...d }))}
      />
    );
  };

  const ctaLabel = isLoading ? t("register.footer.btn_creating") : step === totalSteps - 1 ? t("register.footer.btn_create") : step === 0 && role ? t("register.footer.btn_continue") : t("register.footer.btn_continue");
  const accentColor = role === "influencer" ? "#7C3AED" : "#2563EB";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "1.5rem",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          width: "100%", maxWidth: 680,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <Logo iconSize={28} textSize="0.9375rem" />
        </Link>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          {t("register.header.already")}
          <Link to="/login" style={{ color: "#2563EB", fontWeight: 500, textDecoration: "none" }}>
            {t("register.header.signin")}
          </Link>
        </p>
      </div>

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: done ? 520 : step === 0 ? 680 : 560,
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "1.25rem",
          boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
          overflow: "hidden",
          transition: "max-width .3s ease",
        }}
      >
        {!done ? (
          <>
            {/* Card header */}
            <div
              style={{
                padding: "1.5rem 2rem",
                borderBottom: "1px solid var(--border)",
                background: "var(--card)",
              }}
            >
              {/* Stepper */}
              <Stepper steps={steps} current={step} />

              {/* Step label */}
              <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", textAlign: "center", marginTop: "0.875rem" }}>
                {t("register.card.step")} {step + 1} {t("register.card.of")} {totalSteps} — {steps[step].label}
              </p>
              
              {error && (
                <div style={{ marginTop: "1rem", padding: "0.75rem", borderRadius: "0.5rem", background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B", fontFamily: f.b, fontSize: "0.875rem", textAlign: "center" }}>
                  {error}
                </div>
              )}
            </div>

            {/* Card body */}
            <div style={{ padding: "2rem 2rem" }}>
              {renderStep()}
            </div>

            {/* Card footer */}
            <div
              style={{
                padding: "1.25rem 2rem",
                borderTop: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.75rem",
                background: "var(--card)",
              }}
            >
              {step > 0 ? (
                <button
                  onClick={handleBack}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.375rem",
                    padding: "0.625rem 1.125rem", borderRadius: "0.5rem",
                    border: "1px solid var(--border)", background: "var(--card)",
                    color: "var(--muted-foreground)", cursor: "pointer",
                    fontFamily: f.b, fontSize: "0.875rem",
                  }}
                >
                  <ArrowLeft size={15} /> {t("register.footer.btn_back")}
                </button>
              ) : (
                <div />
              )}

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {step === 2 && role === "influencer" && (
                  <button
                    onClick={handleContinue}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)",
                    }}
                  >
                    {t("register.footer.btn_skip")}
                  </button>
                )}
                <button
                  onClick={handleContinue}
                  disabled={!canContinue() || isLoading}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.6875rem 1.5rem", borderRadius: "0.5rem",
                    background: canContinue() && !isLoading ? accentColor : "var(--muted)",
                    color: canContinue() && !isLoading ? "#fff" : "var(--muted-foreground)",
                    border: "none", cursor: canContinue() && !isLoading ? "pointer" : "default",
                    fontFamily: f.b, fontSize: "0.9rem", fontWeight: 500,
                    transition: "all .15s",
                    boxShadow: canContinue() && !isLoading ? `0 4px 12px ${accentColor}30` : "none",
                  }}
                >
                  {ctaLabel}
                  {step < totalSteps - 1 ? <ArrowRight size={16} /> : !isLoading && <Check size={16} />}
                </button>
              </div>
            </div>
          </>
        ) : (
          <SuccessScreen role={role} />
        )}
      </div>

      {/* Bottom note */}
      {!done && (
        <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", marginTop: "1.5rem", textAlign: "center" }}>
          {t("register.footer.note")}
        </p>
      )}
    </div>
  );
}
