import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Shield, TrendingUp, ArrowDown, CreditCard, CheckCircle, Clock, AlertCircle, ChevronRight, Download, X } from "lucide-react";
import api from "../../../lib/api";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

/* ─── Summary card ─── */
function SummaryCard({ label, value, sub, icon, iconBg, iconColor, featured }: {
  label: string; value: string; sub?: string; icon: React.ReactNode;
  iconBg: string; iconColor: string; featured?: boolean;
}) {
  return (
    <div style={{
      background: featured ? "linear-gradient(135deg, #1E40AF, #2563EB)" : "var(--card)",
      border: featured ? "none" : "1px solid var(--border)",
      borderRadius: "0.875rem", padding: "1.25rem",
      boxShadow: featured ? "0 8px 24px rgba(37,99,235,0.2)" : "var(--shadow-xs)",
      position: "relative", overflow: "hidden",
    }}>
      {featured && <div style={{ position: "absolute", top: -24, right: -24, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <p style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: featured ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)" }}>{label}</p>
        <div style={{ width: 32, height: 32, borderRadius: "0.5rem", background: featured ? "rgba(255,255,255,0.15)" : iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: featured ? "#fff" : iconColor }}>
          {icon}
        </div>
      </div>
      <p style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1.75rem", color: featured ? "#fff" : "var(--foreground)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
        {value}
      </p>
      <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: featured ? "rgba(255,255,255,0.6)" : "var(--muted-foreground)", marginTop: "0.25rem" }}>MAD{sub ? " · " + sub : ""}</p>
    </div>
  );
}

/* ─── Campaign payment row ─── */
function CampaignPaymentRow({ c }: { c: { id: number | string; title: string; status: string; escrowed: number; released: number; pending: number } }) {
  const statusCfg: Record<string, { label: string; color: string; bg: string; dot: string }> = {
    active:    { label: "Active",    color: "#065F46", bg: "#D1FAE5", dot: "#10B981" },
    reviewing: { label: "Reviewing", color: "#92400E", bg: "#FEF3C7", dot: "#F59E0B" },
    completed: { label: "Completed", color: "#5B21B6", bg: "#EDE9FE", dot: "#7C3AED" },
    draft:     { label: "Draft",     color: "#6B7280", bg: "var(--muted)", dot: "#9CA3AF" },
  };
  const sc = statusCfg[c.status] ?? statusCfg.draft;
  const pct = (c.escrowed || 0) > 0 ? Math.round(((c.released || 0) / (c.escrowed || 1)) * 100) : 0;
  const color = pct === 100 ? "#10B981" : pct > 50 ? "#2563EB" : "#F59E0B";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 120px 100px", gap: "1rem", alignItems: "center", padding: "0.875rem 1.125rem", borderBottom: "1px solid var(--border)" }}>
      <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</p>
      <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>{c.escrowed.toLocaleString()} MAD</p>
      <div>
        <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "#10B981" }}>{c.released.toLocaleString()} MAD</p>
        <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>released</p>
      </div>
      <div>
        <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: c.pending > 0 ? "#F59E0B" : "var(--muted-foreground)" }}>{c.pending.toLocaleString()} MAD</p>
        <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>pending</p>
      </div>
      <div>
        {c.escrowed > 0 && (
          <>
            <div style={{ height: 5, borderRadius: 999, background: "var(--muted)", overflow: "hidden", marginBottom: 2 }}>
              <div style={{ height: "100%", width: `${pct}%`, borderRadius: 999, background: color }} />
            </div>
            <p style={{ fontFamily: f.b, fontSize: "0.68rem", color: "var(--muted-foreground)" }}>{pct}% released</p>
          </>
        )}
      </div>
      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.2rem 0.625rem", borderRadius: 999, background: sc.bg, color: sc.color, fontFamily: f.b, fontSize: "0.72rem", fontWeight: 600 }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.dot }} />{sc.label}
      </span>
    </div>
  );
}

/* ─── Transaction row ─── */
function TransactionRow({ t, i, total }: { t: any; i: number; total: number }) {
  const typeConfig: Record<string, { label: string; icon: React.ReactNode; color: string; sign: string }> = {
    payment_released: { label: "Payment released", icon: <CheckCircle size={13} />, color: "#10B981", sign: "−" },
    escrow_funded:    { label: "Escrow funded",     icon: <Shield size={13} />,      color: "#2563EB", sign: "−" },
    invoice:          { label: "Invoice settled",   icon: <CreditCard size={13} />,  color: "#7C3AED", sign: "−" },
  };
  const tc = typeConfig[t.type] ?? typeConfig.invoice;
  const statusCfg = {
    completed: { label: "Completed", color: "#065F46", bg: "#D1FAE5" },
    pending:   { label: "In escrow",  color: "#5B21B6", bg: "#EDE9FE" },
  };
  const sc = statusCfg[t.status as keyof typeof statusCfg] ?? statusCfg.pending;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.875rem 1.125rem", borderBottom: i < total - 1 ? "1px solid var(--border)" : "none" }}>
      <div style={{ width: 34, height: 34, borderRadius: "0.5rem", background: `${tc.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: tc.color, flexShrink: 0 }}>
        {tc.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {t.campaign}
        </p>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: 1, flexWrap: "wrap" }}>
          <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: tc.color, fontWeight: 500, display: "flex", alignItems: "center", gap: "0.2rem" }}>{tc.icon}{tc.label}</span>
          <span style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)" }}>{t.creator} · {t.date}</span>
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9375rem", color: t.status === "pending" ? "var(--muted-foreground)" : "var(--foreground)" }}>
          {tc.sign}{t.amount.toLocaleString()} MAD
        </p>
        <span style={{ padding: "0.1rem 0.4rem", borderRadius: 999, background: sc.bg, color: sc.color, fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600 }}>{sc.label}</span>
      </div>
    </div>
  );
}

/* ─── Fund escrow modal ─── */
function FundEscrowModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"form" | "done">("form");
  const [amount, setAmount] = useState("");
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 440, background: "var(--card)", borderRadius: "1rem", padding: "1.75rem", boxShadow: "0 16px 48px rgba(0,0,0,0.18)", zIndex: 1 }}>
        {step === "done" ? (
          <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <CheckCircle size={24} style={{ color: "#10B981" }} />
            </div>
            <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.125rem", color: "var(--foreground)", marginBottom: "0.375rem" }}>Escrow funded!</p>
            <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              {Number(amount).toLocaleString()} MAD has been secured in escrow. Creators will receive payment upon content approval.
            </p>
            <button onClick={onClose} style={{ padding: "0.5625rem 1.5rem", borderRadius: "0.5rem", background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500 }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div>
                <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.0625rem", color: "var(--foreground)", marginBottom: "0.25rem" }}>Fund escrow</p>
                <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>Secure payments before campaign starts.</p>
              </div>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}><X size={18} /></button>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              {[5000, 10000, 25000].map((v) => (
                <button key={v} onClick={() => setAmount(String(v))} style={{ padding: "0.375rem 0.875rem", borderRadius: "2rem", border: "1px solid var(--border)", background: Number(amount) === v ? "var(--primary)" : "var(--muted)", color: Number(amount) === v ? "#fff" : "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500 }}>
                  {v.toLocaleString()}
                </button>
              ))}
            </div>
            <label style={{ display: "block", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
              Amount (MAD)
            </label>
            <div style={{ position: "relative", marginBottom: "1.25rem" }}>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" style={{ width: "100%", height: "3rem", padding: "0 3.5rem 0 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--input-background)", color: "var(--foreground)", fontFamily: f.h, fontSize: "1.25rem", fontWeight: 700, outline: "none", boxSizing: "border-box" }} onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; }} onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }} />
              <span style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>MAD</span>
            </div>
            <div style={{ padding: "0.75rem 1rem", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "0.5rem", marginBottom: "1.25rem" }}>
              <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "#1E40AF", lineHeight: 1.6 }}>
                <strong>Escrow protection:</strong> Funds are held securely and only released when content is approved. You retain full control.
              </p>
            </div>
            <button
              onClick={() => amount && Number(amount) > 0 && setStep("done")}
              disabled={!amount || Number(amount) <= 0}
              style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "none", background: amount && Number(amount) > 0 ? "var(--primary)" : "var(--muted)", color: amount && Number(amount) > 0 ? "#fff" : "var(--muted-foreground)", cursor: amount && Number(amount) > 0 ? "pointer" : "default", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, boxShadow: amount ? "var(--shadow-primary)" : "none" }}
            >
              Fund escrow
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function BrandPaymentsPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [txFilter, setTxFilter] = useState<"all" | "released" | "escrow" | "invoice">("all");
  const [showFund, setShowFund] = useState(false);
  const [data, setData] = useState({
    totalEscrowed: 0,
    totalReleased: 0,
    pendingApproval: 0,
    availableBalance: 0,
    transactions: [] as any[],
    campaigns: [] as any[],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sumRes, campRes] = await Promise.all([
          api.get("/api/payments/brand-summary"),
          api.get("/api/campaigns/mine")
        ]);
        
        const sd = sumRes.data.data || {};
        const txs = (sd.transactions?.data || []).map((t: any) => ({
          id: t.id,
          type: t.status === "released" ? "payment_released" : "escrow_funded",
          campaign: t.application?.campaign?.title || "Campaign",
          creator: t.application?.influencer_profile?.full_name || "Creator",
          amount: t.amount,
          date: new Date(t.created_at).toLocaleDateString(),
          status: t.status === "released" ? "completed" : "pending"
        }));

        const camps = (campRes.data.data || []).map((c: any) => ({
          id: c.id,
          title: c.title,
          status: c.status,
          escrowed: c.payment_escrowed || 0,
          released: c.payment_released || 0,
          pending: c.payment_pending || 0
        }));

        setData({
          totalEscrowed: sd.total_in_escrow || 0,
          totalReleased: sd.total_released || 0,
          pendingApproval: sd.total_in_escrow || 0,
          availableBalance: 150000, // Mock wallet balance for UI
          transactions: txs,
          campaigns: camps
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredTx = data.transactions.filter((t) => {
    if (txFilter === "released") return t.type === "payment_released";
    if (txFilter === "escrow")   return t.type === "escrow_funded";
    if (txFilter === "invoice")  return t.type === "invoice";
    return true;
  });

  if (isLoading) return <div style={{ padding: "3rem", color: "var(--muted-foreground)" }}>Loading...</div>;

  return (
    <div style={{ padding: "1.75rem 1.5rem 4rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
            {isFr ? "Centre de paiements" : "Payments Center"}
          </h1>
          <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            {isFr ? "Escrow de campagne, paiements et historique" : "Campaign escrow, payments, and transaction history"}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.625rem" }}>
          <button style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.5rem 0.875rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem" }}>
            <Download size={14} /> Export
          </button>
          <button
            onClick={() => setShowFund(true)}
            style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, boxShadow: "var(--shadow-primary)" }}
          >
            <Shield size={14} /> Fund escrow
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.875rem", marginBottom: "1.5rem" }}>
        <SummaryCard label="Total escrowed"     value={data.totalEscrowed.toLocaleString()} sub="across all campaigns" icon={<Shield size={16} />}      iconBg="#DBEAFE" iconColor="#1D4ED8" featured />
        <SummaryCard label="Released to creators" value={data.totalReleased.toLocaleString()} sub="paid out"            icon={<CheckCircle size={16} />} iconBg="#D1FAE5" iconColor="#065F46" />
        <SummaryCard label="Pending approval"   value={data.pendingApproval.toLocaleString()} sub="awaiting review"    icon={<Clock size={16} />}       iconBg="#FEF3C7" iconColor="#92400E" />
        <SummaryCard label="Available balance"  value={data.availableBalance.toLocaleString()} sub="in platform wallet" icon={<CreditCard size={16} />} iconBg="#EDE9FE" iconColor="#5B21B6" />
      </div>

      {/* Escrow protection callout */}
      <div style={{ display: "flex", gap: "0.875rem", padding: "1rem 1.25rem", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "0.875rem", marginBottom: "1.5rem" }}>
        <Shield size={18} style={{ color: "#1D4ED8", flexShrink: 0, marginTop: 1 }} />
        <div>
          <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "#1E40AF", marginBottom: "0.25rem" }}>How InfluencIA Escrow works</p>
          <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "#1D4ED8", lineHeight: 1.65, opacity: 0.9 }}>
            Campaign funds are held in a secure escrow account before any work begins. Creators can only receive payment when you manually approve their submitted content. This protects both parties.
          </p>
        </div>
      </div>

      {/* Per-campaign breakdown */}
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", overflow: "hidden", marginBottom: "1.5rem" }}>
        <div style={{ padding: "1rem 1.125rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>Payment by campaign</h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 720 }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 120px 100px", gap: "1rem", padding: "0.5rem 1.125rem", background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              {["Campaign", "Total escrow", "Released", "Pending", "Progress", "Status"].map((h) => (
                <span key={h} style={{ fontFamily: f.b, fontSize: "0.72rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
              ))}
            </div>
            {data.campaigns.map((c) => <CampaignPaymentRow key={c.id} c={c} />)}
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>Transaction history</h2>
          <div style={{ display: "flex", gap: "0.25rem", background: "var(--muted)", borderRadius: "0.5rem", padding: "0.25rem" }}>
            {(["all", "released", "escrow", "invoice"] as const).map((tab) => (
              <button key={tab} onClick={() => setTxFilter(tab)}
                style={{ padding: "0.3125rem 0.75rem", borderRadius: "0.375rem", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: txFilter === tab ? 500 : 400, background: txFilter === tab ? "var(--card)" : "transparent", color: txFilter === tab ? "var(--foreground)" : "var(--muted-foreground)", textTransform: "capitalize", boxShadow: txFilter === tab ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
                {tab === "released" ? "Payments" : tab === "escrow" ? "Escrow" : tab}
              </button>
            ))}
          </div>
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", overflow: "hidden" }}>
          {filteredTx.length > 0
            ? filteredTx.map((t, i) => <TransactionRow key={t.id} t={t} i={i} total={filteredTx.length} />)
            : <div style={{ padding: "3rem", textAlign: "center" }}><p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>No transactions match this filter.</p></div>
          }
        </div>
      </div>

      {showFund && <FundEscrowModal onClose={() => setShowFund(false)} />}
    </div>
  );
}
