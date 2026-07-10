import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, CheckCircle, Shield, FileText, KeyRound } from "lucide-react";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSent(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background)", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 440, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2.5rem 2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <button onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: "0.375rem", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.875rem", padding: 0, marginBottom: "1.5rem" }}>
          <ArrowLeft size={16} /> Back
        </button>

        {sent ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#D1FAE5", color: "#065F46", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
              <CheckCircle size={28} />
            </div>
            <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>Check your inbox</h2>
            <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: "1.75rem" }}>
              We sent a password reset link to <strong>{email}</strong>. Follow the instructions in the email to reset your password.
            </p>
            <Link to="/login" style={{ display: "block", width: "100%", height: "2.625rem", lineHeight: "2.625rem", borderRadius: "0.5rem", background: "var(--primary)", color: "#fff", textDecoration: "none", fontFamily: f.b, fontSize: "0.9rem", fontWeight: 500, textAlign: "center" }}>
              Return to login
            </Link>
          </div>
        ) : (
          <div>
            <div style={{ width: 48, height: 48, borderRadius: "0.5rem", background: "#EFF6FF", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
              <KeyRound size={24} />
            </div>
            <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>Forgot password?</h2>
            <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>Email address</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", height: "2.625rem", padding: "0 0.875rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--input-background)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <button type="submit" style={{ width: "100%", height: "2.625rem", borderRadius: "0.5rem", background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.9rem", fontWeight: 500 }}>
                Send reset link
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export function TermsPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", padding: "4rem 2rem 6rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "3rem 2.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
        <button onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: "0.375rem", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.875rem", padding: 0, marginBottom: "2rem" }}>
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <FileText size={32} style={{ color: "var(--primary)" }} />
          <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.875rem", color: "var(--foreground)", margin: 0 }}>Terms of Service</h1>
        </div>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", marginBottom: "2rem" }}>Last updated: July 8, 2026</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", fontFamily: f.b, fontSize: "0.9375rem", color: "var(--foreground)", lineHeight: 1.75 }}>
          <section>
            <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.25rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>1. Acceptance of Terms</h2>
            <p>By creating an account or accessing the InfluenceIA platform, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.25rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>2. User Roles & Account Security</h2>
            <p>We host two primary user groups: Brands seeking advertising campaigns, and Creators/Influencers offering content deliverables. You are responsible for safeguarding your credentials and agree to provide accurate, up-to-date profile information at all times.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.25rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>3. Campaign Work Progress & Deliverables</h2>
            <p>Creators participating in campaigns agree to submit content deliverables strictly according to the deadlines and guidelines specified by the Brand. All deliverables are subject to Brand review (Approve or Request revision) before payments are eligible for release from escrow.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.25rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>4. Payments & Escrow Services</h2>
            <p>Brand payments for accepted campaigns are held in escrow under pending status, then funded into the secure vault. Escrowed payments will only be released to the Creator upon completion and approval of the mandatory content submissions.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", padding: "4rem 2rem 6rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "3rem 2.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
        <button onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: "0.375rem", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.875rem", padding: 0, marginBottom: "2rem" }}>
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <Shield size={32} style={{ color: "var(--primary)" }} />
          <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.875rem", color: "var(--foreground)", margin: 0 }}>Privacy Policy</h1>
        </div>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", marginBottom: "2rem" }}>Last updated: July 8, 2026</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", fontFamily: f.b, fontSize: "0.9375rem", color: "var(--foreground)", lineHeight: 1.75 }}>
          <section>
            <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.25rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>1. Information We Collect</h2>
            <p>We collect information you provide directly when creating a profile, registering accounts, creating or applying to campaigns, or corresponding with users. This includes contact details, transaction balances, content links, and social channel performance scores.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.25rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>2. How We Use Information</h2>
            <p>Information is utilized to run match scoring algorithms between brands and creators, secure transaction lifecycles in escrow, calculate platform analytics, and send communications regarding campaign and account events.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.25rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>3. Data Sharing & Third-Parties</h2>
            <p>We do not sell your personal data. Profile stats and social channel performance are visible to Brands to establish suitability for campaign participation. Financial transactions are securely handled using authorized standard payment gateways.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
