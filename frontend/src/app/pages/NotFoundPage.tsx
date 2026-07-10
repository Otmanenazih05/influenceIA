import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const font = { heading: "'Poppins', sans-serif", body: "'Inter', sans-serif" };

export function NotFoundPage() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1.5rem", textAlign: "center", background: "var(--background)" }}>
      <div style={{ maxWidth: 480 }}>
        <p style={{ fontFamily: font.heading, fontWeight: 800, fontSize: "6rem", color: "var(--muted)", letterSpacing: "-0.06em", lineHeight: 1, marginBottom: "1rem" }}>
          404
        </p>
        <h1 style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "1.75rem", color: "var(--foreground)", letterSpacing: "-0.03em", marginBottom: "0.875rem" }}>
          Page not found
        </h1>
        <p style={{ fontFamily: font.body, fontSize: "0.9375rem", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "2rem" }}>
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          to="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.6875rem 1.5rem", borderRadius: "0.625rem",
            background: "var(--primary)", color: "#fff",
            fontFamily: font.body, fontSize: "0.9375rem", fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Back to homepage <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
