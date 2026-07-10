export const PHONE_W = 390;
export const PHONE_H = 844;
export const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

/* ─── Status bar ─── */
export function StatusBar({ light = false }) {
  const c = light ? "#fff" : "var(--foreground)";
  return (
    <div style={{ height: 44, background: "transparent", display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 1.375rem 6px", flexShrink: 0, position: "relative", zIndex: 10 }}>
      {/* Dynamic island */}
      <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 126, height: 34, borderRadius: 20, background: "#000" }} />
      <span style={{ fontFamily: f.b, fontWeight: 700, fontSize: "0.875rem", color: c }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
        {/* Signal */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "1.5px" }}>
          {[3, 5, 7, 9].map((h, i) => (
            <div key={i} style={{ width: 3, height: h, borderRadius: 1, background: i < 3 ? c : `${c}40` }} />
          ))}
        </div>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12">
          <path d="M8 9.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill={c} />
          <path d="M4.5 7.2C5.6 6.1 6.7 5.5 8 5.5s2.4.6 3.5 1.7l1-1C11.1 4.7 9.6 4 8 4s-3.1.7-4.5 2.2z" fill={c} opacity=".7" />
          <path d="M1 4C2.8 2.2 5.2 1 8 1s5.2 1.2 7 3l-1 1C12.4 3.4 10.3 2.5 8 2.5S3.6 3.4 2 5z" fill={c} opacity=".4" />
        </svg>
        {/* Battery */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <div style={{ width: 24, height: 12, borderRadius: 3, border: `1.5px solid ${c}`, position: "relative", display: "flex", alignItems: "center", padding: 2 }}>
            <div style={{ width: "75%", height: "100%", borderRadius: 1, background: c }} />
          </div>
          <div style={{ width: 2, height: 5, background: `${c}60`, borderRadius: "0 1px 1px 0" }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Bottom Nav ─── */
export function MobileBottomNav({ items, active }: {
  items: { icon: React.ReactNode; label: string; id: string; primary?: boolean }[];
  active: string;
}) {
  return (
    <div style={{ height: 82, background: "var(--card)", borderTop: "1px solid var(--border)", display: "flex", alignItems: "flex-start", justifyContent: "space-around", padding: "8px 0 0", flexShrink: 0, position: "relative", zIndex: 10 }}>
      {items.map((item) =>
        item.primary ? (
          <button key={item.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", width: 56 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: -24, boxShadow: "0 4px 16px rgba(37,99,235,0.4)", border: "4px solid var(--card)" }}>
              <span style={{ color: "#fff" }}>{item.icon}</span>
            </div>
          </button>
        ) : (
          <button key={item.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: "0 8px" }}>
            <span style={{ color: active === item.id ? "var(--primary)" : "var(--muted-foreground)" }}>{item.icon}</span>
            <span style={{ fontFamily: f.b, fontSize: "0.625rem", color: active === item.id ? "var(--primary)" : "var(--muted-foreground)", fontWeight: active === item.id ? 600 : 400 }}>{item.label}</span>
          </button>
        )
      )}
      {/* Home indicator */}
      <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 134, height: 5, borderRadius: 999, background: "var(--foreground)", opacity: 0.15 }} />
    </div>
  );
}

/* ─── Mobile header ─── */
export function MobileHeader({ title, left, right, border = true }: {
  title?: React.ReactNode; left?: React.ReactNode; right?: React.ReactNode; border?: boolean;
}) {
  return (
    <div style={{ height: 52, background: "var(--card)", borderBottom: border ? "1px solid var(--border)" : "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.125rem", flexShrink: 0 }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>{left}</div>
      {title && <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>{title}</div>}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>{right}</div>
    </div>
  );
}

/* ─── Phone frame wrapper ─── */
interface PhoneFrameProps {
  children: React.ReactNode;
  dark?: boolean;
  label?: string;
  scale?: number;
}

export function PhoneFrame({ children, label, scale = 0.72 }: PhoneFrameProps) {
  const displayW = Math.round(PHONE_W * scale);
  const displayH = Math.round(PHONE_H * scale);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.875rem", flexShrink: 0 }}>
      {/* Outer chrome */}
      <div
        style={{
          width: displayW,
          height: displayH,
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
          borderRadius: Math.round(44 * scale),
        }}
      >
        {/* Inner scale container */}
        <div
          style={{
            width: PHONE_W,
            height: PHONE_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
            background: "var(--background)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {children}
        </div>
        {/* Frame overlay — the physical phone border */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: Math.round(44 * scale),
            border: `${Math.round(10 * scale)}px solid #1A1A2E`,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.3)",
            pointerEvents: "none",
            zIndex: 20,
          }}
        />
      </div>
      {label && (
        <p style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "var(--muted-foreground)", textAlign: "center" }}>{label}</p>
      )}
    </div>
  );
}

/* ─── Shared micro chips ─── */
export function KpiChip({ label, value, color = "var(--primary)", bg = "var(--secondary)" }: {
  label: string; value: string; color?: string; bg?: string;
}) {
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "0.75rem", textAlign: "center", flex: 1 }}>
      <p style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1.25rem", color, letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</p>
      <p style={{ fontFamily: f.b, fontSize: "0.6875rem", color: "var(--muted-foreground)", marginTop: 3 }}>{label}</p>
    </div>
  );
}

export function MobileScroll({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", padding: "0 1.125rem", scrollbarWidth: "none" }}>
      {children}
    </div>
  );
}
