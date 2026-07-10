import { X, CheckCircle, Instagram, Play, Youtube, Star, TrendingUp, Shield, MessageSquare, Clock, Award } from "lucide-react";
import { TiktokIcon, InstagramIcon, YoutubeIcon } from "../ui/SocialIcons";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

const pastCollabs = [
  { brand: "GlowLab Morocco", brandColor: "#EC4899", category: "Beauty & Skincare", type: "Paid", amount: "5 000 MAD", year: "2024" },
  { brand: "AtlasBrand",      brandColor: "#2563EB", category: "Fashion & Apparel",  type: "Paid", amount: "3 500 MAD", year: "2024" },
  { brand: "MarocTech",       brandColor: "#7C3AED", category: "Tech & Apps",        type: "Paid", amount: "2 800 MAD", year: "2024" },
  { brand: "VertMaroc",       brandColor: "#059669", category: "Sustainability",      type: "Ambassador", amount: "1 200 MAD/mo", year: "2024" },
];

function PlatformCard({ icon, platform, handle, followers, engagement, color, linked }: {
  icon: React.ReactNode; platform: string; handle: string; followers: string;
  engagement: string; color: string; linked: boolean;
}) {
  if (!linked) return null;
  return (
    <div style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "0.875rem 1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.625rem" }}>
        <span style={{ color }}>{icon}</span>
        <span style={{ fontFamily: f.b, fontWeight: 600, fontSize: "0.8125rem", color: "var(--foreground)" }}>{platform}</span>
      </div>
      <p style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1.5rem", color: "var(--foreground)", letterSpacing: "-0.04em", lineHeight: 1 }}>{followers}</p>
      <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)", marginTop: 2, marginBottom: "0.5rem" }}>followers</p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        <TrendingUp size={11} style={{ color: "#10B981" }} />
        <span style={{ fontFamily: f.b, fontSize: "0.75rem", fontWeight: 500, color: "#10B981" }}>{engagement}</span>
        <span style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)" }}>engagement</span>
      </div>
      <p style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)", marginTop: 2 }}>{handle}</p>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const r = 34, circ = 2 * Math.PI * r;
  return (
    <svg width={80} height={80} viewBox="0 0 80 80">
      <circle cx={40} cy={40} r={r} fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth={6} />
      <circle cx={40} cy={40} r={r} fill="none" stroke="#7C3AED" strokeWidth={6} strokeLinecap="round"
        strokeDasharray={`${(score / 100) * circ} ${circ - (score / 100) * circ}`}
        strokeDashoffset={circ / 4}
      />
      <text x={40} y={44} textAnchor="middle" style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1rem", fill: "#fff" }}>{score}</text>
    </svg>
  );
}

interface Props {
  onClose: () => void;
  profile: {
    firstName: string;
    lastName: string;
    bio: string;
    location: string;
    niches: string[];
    website?: string;
  };
}

export function PublicProfileModal({ onClose, profile }: Props) {
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 90, backdropFilter: "blur(3px)" }} />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.25rem",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 780,
            background: "var(--card)",
            borderRadius: "1.25rem",
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
            animation: "fadeUp .22s ease",
          }}
        >
          <style>{`@keyframes fadeUp { from { transform: translateY(16px); opacity:0 } to { transform: translateY(0); opacity:1 } }`}</style>

          {/* Preview bar */}
          <div style={{ background: "#0F172A", padding: "0.625rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
              <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
                Preview — how brands see your profile
              </span>
            </div>
            <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: "0.375rem", background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={14} />
            </button>
          </div>

          {/* Hero */}
          <div style={{ position: "relative", height: 120, background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #312E81 100%)", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
          </div>

          <div style={{ padding: "0 1.75rem 1.75rem" }}>
            {/* Avatar + identity */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: -40, marginBottom: "1.25rem" }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", border: "4px solid var(--card)", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
                  <span style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1.875rem", color: "#fff" }}>{profile.firstName[0]}</span>
                </div>
                {/* IA Score badge */}
                <div style={{ position: "absolute", bottom: -4, right: -4, background: "#7C3AED", borderRadius: "50%", border: "2px solid var(--card)", overflow: "hidden" }}>
                  <ScoreRing score={87} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.625rem", paddingBottom: 4 }}>
                <div style={{ padding: "0.375rem 0.875rem", borderRadius: 999, background: "#ECFDF5", border: "1px solid #A7F3D0", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <CheckCircle size={13} style={{ color: "#10B981" }} />
                  <span style={{ fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600, color: "#065F46" }}>Verified creator</span>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1.5rem", alignItems: "start" }}>
              {/* Left: identity + bio + platforms */}
              <div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.5rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>
                    {profile.location}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                    {profile.niches.map((n) => (
                      <span key={n} style={{ padding: "0.2rem 0.625rem", borderRadius: 999, background: "var(--secondary)", color: "var(--secondary-foreground)", fontFamily: f.b, fontSize: "0.75rem", fontWeight: 500 }}>
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                <p style={{ fontFamily: f.b, fontSize: "0.9rem", color: "var(--muted-foreground)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                  {profile.bio}
                </p>
                {/* Platform stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  <PlatformCard icon={<InstagramIcon size={16} />} platform="Instagram" handle="@sarah_bj" followers="98.4K" engagement="8.3%" color="#E1306C" linked />
                  <PlatformCard icon={<TiktokIcon size={16} />} platform="TikTok" handle="—" followers="" engagement="" color="#010101" linked={false} />
                  <PlatformCard icon={<YoutubeIcon size={16} />} platform="YouTube" handle="—" followers="" engagement="" color="#FF0000" linked={false} />
                </div>

                {/* Past collaborations */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>
                    Past collaborations
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    {pastCollabs.map((c) => (
                      <div key={c.brand} style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.625rem 0.875rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem" }}>
                        <div style={{ width: 28, height: 28, borderRadius: "0.5rem", background: `${c.brandColor}18`, display: "flex", alignItems: "center", justifyContent: "center", color: c.brandColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.75rem", flexShrink: 0 }}>
                          {c.brand[0]}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.8125rem", color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.brand}</p>
                          <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>{c.type} · {c.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: trust signals */}
              <div style={{ width: 200, flexShrink: 0 }}>
                <div style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.125rem", marginBottom: "0.75rem" }}>
                  <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
                      <div style={{ background: "linear-gradient(135deg, #5B21B6, #7C3AED)", borderRadius: "50%", padding: 3 }}>
                        <ScoreRing score={87} />
                      </div>
                      <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>IA Score</p>
                      <span style={{ padding: "0.2rem 0.625rem", borderRadius: 999, background: "#EDE9FE", color: "#5B21B6", fontFamily: f.b, fontSize: "0.7rem", fontWeight: 700 }}>
                        Excellent · Top 18%
                      </span>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {[
                      { icon: <Clock size={13} />,       label: "Response rate",     value: "73%",    color: "#F59E0B" },
                      { icon: <CheckCircle size={13} />, label: "Completion rate",   value: "100%",   color: "#10B981" },
                      { icon: <Star size={13} />,        label: "Brand rating",      value: "4.9/5",  color: "#F59E0B" },
                      { icon: <Award size={13} />,       label: "Campaigns done",    value: "4",      color: "#2563EB" },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "var(--muted-foreground)" }}>
                          {item.icon}
                          <span style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)" }}>{item.label}</span>
                        </div>
                        <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: item.color }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact CTA (brand's perspective) */}
                <button
                  style={{
                    width: "100%", padding: "0.6875rem", borderRadius: "0.625rem",
                    background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer",
                    fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem",
                    boxShadow: "var(--shadow-primary)", marginBottom: "0.5rem",
                  }}
                >
                  <MessageSquare size={14} /> Invite to campaign
                </button>
                <button
                  style={{
                    width: "100%", padding: "0.5625rem", borderRadius: "0.625rem",
                    background: "var(--card)", color: "var(--muted-foreground)", border: "1px solid var(--border)", cursor: "pointer",
                    fontFamily: f.b, fontSize: "0.875rem",
                  }}
                >
                  Save creator
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
