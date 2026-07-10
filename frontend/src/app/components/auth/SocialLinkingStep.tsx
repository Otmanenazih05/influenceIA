import { useState } from "react";
import { Search, X, CheckCircle, Plus, AlertCircle, Play, Instagram, Youtube, Facebook } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TiktokIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "../ui/SocialIcons";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

export interface ConnectedAccount {
  platform: Platform;
  handle: string;
  displayName: string;
  followers: string;
  verified: boolean;
}

type Platform = "instagram" | "tiktok" | "youtube" | "facebook";

const PLATFORMS: { id: Platform; label: string; icon: React.ReactNode; color: string; placeholder: string }[] = [
  { id: "instagram", label: "Instagram", icon: <InstagramIcon size={18} />, color: "#E1306C", placeholder: "@yourhandle" },
  { id: "tiktok",    label: "TikTok",    icon: <TiktokIcon size={18} />,      color: "#010101", placeholder: "@yourhandle" },
  { id: "youtube",   label: "YouTube",   icon: <YoutubeIcon size={18} />,   color: "#FF0000", placeholder: "Channel name or URL" },
  { id: "facebook",  label: "Facebook",  icon: <FacebookIcon size={18} />,  color: "#1877F2", placeholder: "Page name or URL" },
];

const MOCK_RESULTS: Record<Platform, Array<{ handle: string; displayName: string; followers: string }>> = {
  instagram: [
    { handle: "@sarah_bj",         displayName: "Sarah Benjelloun",   followers: "98.4K" },
    { handle: "@sarahlif.ma",      displayName: "Sarah Lifestyle MA", followers: "12.1K" },
    { handle: "@sarah.beauty.ma",  displayName: "Sarah Beauty",       followers: "6.7K"  },
  ],
  tiktok: [
    { handle: "@sarah.b.official", displayName: "Sarah B.",    followers: "145K" },
    { handle: "@sarahbn",          displayName: "Sarah BN",    followers: "22.3K" },
  ],
  youtube: [
    { handle: "Sarah Lifestyle Morocco", displayName: "Sarah Lifestyle Morocco", followers: "34.2K subscribers" },
  ],
  facebook: [
    { handle: "Sarah Benjelloun Official", displayName: "Sarah Benjelloun Official", followers: "18.9K followers" },
  ],
};

function PlatformIcon({ platform, size = 16 }: { platform: Platform; size?: number }) {
  const p = PLATFORMS.find((p) => p.id === platform)!;
  return <span style={{ color: p.color, display: "flex" }}>{
    platform === "instagram" ? <InstagramIcon size={size} /> :
    platform === "tiktok"    ? <TiktokIcon size={size} /> :
    platform === "youtube"   ? <YoutubeIcon size={size} /> :
                               <FacebookIcon size={size} />
  }</span>;
}

export function SocialLinkingStep({
  accounts,
  onChange,
}: {
  accounts: ConnectedAccount[];
  onChange: (accounts: ConnectedAccount[]) => void;
}) {
  const { t } = useTranslation("auth", { keyPrefix: "register" });
  const [activePlatform, setActivePlatform] = useState<Platform>("instagram");
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [manualHandle, setManualHandle] = useState("");

  const p = PLATFORMS.find((pl) => pl.id === activePlatform)!;

  const filtered = query.length > 1
    ? MOCK_RESULTS[activePlatform].filter(
        (r) =>
          r.handle.toLowerCase().includes(query.toLowerCase()) ||
          r.displayName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const connect = (result: { handle: string; displayName: string; followers: string }) => {
    if (accounts.find((a) => a.handle === result.handle && a.platform === activePlatform)) return;
    onChange([
      ...accounts,
      {
        platform: activePlatform,
        handle: result.handle,
        displayName: result.displayName,
        followers: result.followers,
        verified: true,
      },
    ]);
    setQuery("");
    setShowResults(false);
  };

  const connectManual = () => {
    if (!manualHandle.trim()) return;
    if (accounts.find((a) => a.handle === manualHandle && a.platform === activePlatform)) return;
    onChange([
      ...accounts,
      {
        platform: activePlatform,
        handle: manualHandle,
        displayName: manualHandle,
        followers: "–",
        verified: false,
      },
    ]);
    setManualHandle("");
    setManualMode(false);
  };

  const remove = (handle: string, platform: Platform) => {
    onChange(accounts.filter((a) => !(a.handle === handle && a.platform === platform)));
  };

  return (
    <div>
      <div style={{ marginBottom: "1.75rem" }}>
        <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.5rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.375rem" }}>
          {t("social_linking.title")}
        </h2>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          {t("social_linking.desc")}
        </p>
      </div>

      {/* Platform tabs */}
      <div
        style={{
          display: "flex", borderBottom: "1px solid var(--border)",
          marginBottom: "1.5rem", gap: 0,
          overflowX: "auto",
        }}
      >
        {PLATFORMS.map((pl) => {
          const connected = accounts.filter((a) => a.platform === pl.id).length;
          const isActive = activePlatform === pl.id;
          return (
            <button
              key={pl.id}
              onClick={() => { setActivePlatform(pl.id); setQuery(""); setManualMode(false); }}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.625rem 1.125rem",
                background: "transparent", border: "none",
                borderBottom: `2px solid ${isActive ? pl.color : "transparent"}`,
                marginBottom: -1,
                cursor: "pointer",
                color: isActive ? pl.color : "var(--muted-foreground)",
                fontFamily: f.b, fontSize: "0.875rem", fontWeight: isActive ? 500 : 400,
                whiteSpace: "nowrap",
                transition: "all .15s",
              }}
            >
              <PlatformIcon platform={pl.id} size={15} />
              {pl.label}
              {connected > 0 && (
                <span
                  style={{
                    width: 18, height: 18, borderRadius: "50%",
                    background: pl.color, color: "#fff",
                    fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {connected}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search panel */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={{ fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", display: "block", marginBottom: "0.375rem" }}>
          {t("social_linking.search_label", { platform: p.label })}
        </label>
        <div style={{ position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
            placeholder={p.placeholder}
            style={{
              width: "100%", height: "2.75rem",
              paddingLeft: "2.5rem", paddingRight: "0.875rem",
              borderRadius: "0.5rem",
              border: "1px solid var(--border)",
              background: "var(--input-background)",
              color: "var(--foreground)",
              fontFamily: f.b, fontSize: "0.9rem",
              outline: "none", boxSizing: "border-box",
              transition: "border-color .15s, box-shadow .15s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = p.color;
              e.target.style.boxShadow = `0 0 0 3px ${p.color}20`;
              setShowResults(true);
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--border)";
              e.target.style.boxShadow = "none";
              setTimeout(() => setShowResults(false), 180);
            }}
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setShowResults(false); }}
              style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}
            >
              <X size={15} />
            </button>
          )}

          {/* Search results dropdown */}
          {showResults && query.length > 1 && (
            <div
              style={{
                position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
                background: "var(--card)", border: "1px solid var(--border)",
                borderRadius: "0.625rem",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 20,
                overflow: "hidden",
              }}
            >
              {filtered.length === 0 ? (
                <div style={{ padding: "1rem 1.125rem", textAlign: "center" }}>
                  <AlertCircle size={16} style={{ color: "var(--muted-foreground)", display: "block", margin: "0 auto 0.5rem" }} />
                  <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                    {t("social_linking.no_results", { query })}
                  </p>
                  <button
                    onMouseDown={() => { setManualMode(true); setShowResults(false); setManualHandle(query); }}
                    style={{
                      marginTop: "0.5rem", padding: "0.375rem 0.875rem", borderRadius: "0.375rem",
                      border: `1px solid ${p.color}40`, background: `${p.color}10`, color: p.color,
                      fontFamily: f.b, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer",
                    }}
                  >
                    {t("social_linking.add_manually_btn")}
                  </button>
                </div>
              ) : (
                <div>
                  <p style={{ padding: "0.625rem 1.125rem 0.375rem", fontFamily: f.b, fontSize: "0.7rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    {t("social_linking.results_on", { platform: p.label })}
                  </p>
                  {filtered.map((result) => {
                    const isConnected = accounts.some((a) => a.handle === result.handle && a.platform === activePlatform);
                    return (
                      <button
                        key={result.handle}
                        onMouseDown={() => connect(result)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          width: "100%", padding: "0.75rem 1.125rem",
                          background: "none", border: "none", cursor: "pointer",
                          textAlign: "left",
                          borderTop: "1px solid var(--border)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div
                            style={{
                              width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                              background: `${p.color}18`, color: p.color,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem",
                            }}
                          >
                            {result.displayName[0]}
                          </div>
                          <div>
                            <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>
                              {result.displayName}
                            </p>
                            <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                              {result.handle} · {result.followers}
                            </p>
                          </div>
                        </div>
                        {isConnected ? (
                          <CheckCircle size={16} style={{ color: "var(--brand-success)", flexShrink: 0 }} />
                        ) : (
                          <span
                            style={{
                              padding: "0.25rem 0.625rem", borderRadius: 999,
                              background: `${p.color}15`, color: p.color,
                              fontFamily: f.b, fontSize: "0.75rem", fontWeight: 500, flexShrink: 0,
                            }}
                          >
                            {t("social_linking.btn_connect")}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Manual mode */}
        {manualMode ? (
          <div
            style={{
              marginTop: "0.75rem", padding: "1rem",
              background: `${p.color}08`, border: `1px solid ${p.color}25`, borderRadius: "0.625rem",
            }}
          >
            <p style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.625rem" }}>
              {t("social_linking.add_manual_title", { platform: p.label })}
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                value={manualHandle}
                onChange={(e) => setManualHandle(e.target.value)}
                placeholder={p.placeholder}
                style={{
                  flex: 1, height: "2.375rem",
                  padding: "0 0.75rem", borderRadius: "0.375rem",
                  border: `1px solid ${p.color}40`,
                  background: "var(--input-background)", color: "var(--foreground)",
                  fontFamily: f.b, fontSize: "0.875rem", outline: "none",
                }}
              />
              <button
                onClick={connectManual}
                style={{
                  padding: "0 1rem", borderRadius: "0.375rem",
                  background: p.color, color: "#fff", border: "none", cursor: "pointer",
                  fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500,
                  display: "flex", alignItems: "center", gap: "0.375rem",
                }}
              >
                <Plus size={14} /> {t("social_linking.btn_add")}
              </button>
              <button
                onClick={() => setManualMode(false)}
                style={{ padding: "0 0.75rem", borderRadius: "0.375rem", background: "var(--muted)", border: "none", cursor: "pointer", color: "var(--muted-foreground)" }}
              >
                <X size={14} />
              </button>
            </div>
            <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.5rem" }}>
              {t("social_linking.manual_hint")}
            </p>
          </div>
        ) : (
          <button
            onClick={() => setManualMode(true)}
            style={{
              marginTop: "0.625rem", background: "none", border: "none", cursor: "pointer", padding: 0,
              fontFamily: f.b, fontSize: "0.8125rem", color: p.color,
              display: "flex", alignItems: "center", gap: "0.375rem",
            }}
          >
            <Plus size={13} /> {t("social_linking.btn_add_manual", { platform: p.label })}
          </button>
        )}
      </div>

      {/* Connected accounts list */}
      {accounts.length > 0 && (
        <div>
          <p style={{ fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.625rem" }}>
            {t("social_linking.connected", { count: accounts.length })}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {accounts.map((acct) => {
              const pl = PLATFORMS.find((p) => p.id === acct.platform)!;
              return (
                <div
                  key={`${acct.platform}:${acct.handle}`}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.875rem",
                    padding: "0.75rem 1rem",
                    background: "var(--card)", border: "1px solid var(--border)",
                    borderRadius: "0.625rem",
                    borderLeft: `3px solid ${pl.color}`,
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${pl.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: pl.color, flexShrink: 0 }}>
                    <PlatformIcon platform={acct.platform} size={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>
                      {acct.displayName}
                    </p>
                    <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                      {acct.handle} · {acct.followers}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                    {acct.verified ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.2rem 0.5rem", borderRadius: 999, background: "rgba(16,185,129,0.1)", color: "#10B981" }}>
                        <CheckCircle size={11} />
                        <span style={{ fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600 }}>{t("social_linking.status_verified")}</span>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.2rem 0.5rem", borderRadius: 999, background: "rgba(245,158,11,0.1)", color: "#D97706" }}>
                        <AlertCircle size={11} />
                        <span style={{ fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600 }}>{t("social_linking.status_pending")}</span>
                      </div>
                    )}
                    <button
                      onClick={() => remove(acct.handle, acct.platform)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex", padding: "0.25rem" }}
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Hint if none connected */}
      {accounts.length === 0 && (
        <div
          style={{
            marginTop: "0.5rem",
            display: "flex", gap: "0.75rem", padding: "0.875rem 1rem",
            background: "var(--muted)", borderRadius: "0.625rem",
          }}
        >
          <AlertCircle size={16} style={{ color: "var(--muted-foreground)", flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
            {t("social_linking.no_accounts_hint")}
          </p>
        </div>
      )}
    </div>
  );
}
