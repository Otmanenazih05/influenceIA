import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Logo } from "../ui/Logo";
import { TwitterIcon, LinkedinIcon, InstagramIcon, TiktokIcon, YoutubeIcon } from "../ui/SocialIcons";

const cols = [
  {
    headingKey: "footer.platform",
    links: [
      { labelKey: "nav.forBrands",        href: "/brands" },
      { labelKey: "nav.forInfluencers",   href: "/influencers" },
      { labelKey: "nav.pricing",           href: "/#pricing" },
      { labelKey: "footer.aiScore",          href: "/#features" },
      { labelKey: "footer.marketplace",       href: "/#features" },
    ],
  },
  {
    headingKey: "footer.company",
    links: [
      { labelKey: "footer.about",             href: "/contact" },
      { labelKey: "footer.blog",              href: "/blog" },
      { labelKey: "footer.careers",           href: "/careers" },
      { labelKey: "footer.press",             href: "/press" },
    ],
  },
  {
    headingKey: "footer.legal",
    links: [
      { labelKey: "footer.privacyPolicy",    href: "/privacy" },
      { labelKey: "footer.termsOfService",  href: "/terms" },
      { labelKey: "footer.cookieSettings",   href: "/cookies" },
    ],
  },
];

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer
      style={{
        background: "#090D16",
        color: "#fff",
        paddingTop: "4rem",
        paddingBottom: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "3rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
          className="grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr]"
        >
          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <Logo iconSize={30} textSize="1rem" color="#fff" />
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.875rem",
                color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: "28ch",
              }}
            >
              {t("footer.description")}
            </p>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.25rem" }}>
              {[
                { icon: <TwitterIcon size={15} />, href: "https://twitter.com/influenceia" },
                { icon: <LinkedinIcon size={15} />, href: "https://linkedin.com/company/influenceia" },
                { icon: <InstagramIcon size={15} />, href: "https://instagram.com/influenceia" },
                { icon: <TiktokIcon size={15} />, href: "https://tiktok.com/@influenceia" },
                { icon: <YoutubeIcon size={15} />, href: "https://youtube.com/@influenceia" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  style={{
                    width: 32, height: 32, borderRadius: "0.5rem",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.6)",
                    transition: "background 0.15s",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.headingKey}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600,
                  color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em",
                  marginBottom: "1rem",
                }}
              >
                {t(col.headingKey)}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {col.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      to={link.href}
                      style={{
                        textDecoration: "none",
                        fontFamily: "'Inter', sans-serif", fontSize: "0.875rem",
                        color: "rgba(255,255,255,0.6)",
                        transition: "color 0.15s",
                      }}
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            {t("footer.copyright")}
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            {t("footer.madeWithCare")}
          </p>
        </div>
      </div>
    </footer>
  );
}
