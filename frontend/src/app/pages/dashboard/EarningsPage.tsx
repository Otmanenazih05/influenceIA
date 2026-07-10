import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TrendingUp, ArrowDown, Shield, CreditCard, X, ArrowRight, CheckCircle, Clock } from "lucide-react";
import api from "../../../lib/api";

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "processing";
  campaign: string;
  brand: string;
  brandColor: string;
}

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

/* ─── Wallet card ─── */
function WalletCard({ label, value, sub, color, bg, icon, featured }: {
  label: string; value: string; sub?: string; color: string; bg: string;
  icon: React.ReactNode; featured?: boolean;
}) {
  return (
    <div style={{ background: featured ? "linear-gradient(135deg, #1E40AF, #2563EB)" : "var(--card)", border: featured ? "none" : "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.25rem", boxShadow: featured ? "0 8px 24px rgba(37,99,235,0.2)" : "var(--shadow-xs)", position: "relative", overflow: "hidden" }}>
      {featured && <div style={{ position: "absolute", top: -24, right: -24, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <p style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: featured ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)" }}>{label}</p>
        <div style={{ width: 34, height: 34, borderRadius: "0.5rem", background: featured ? "rgba(255,255,255,0.15)" : bg, display: "flex", alignItems: "center", justifyContent: "center", color: featured ? "#fff" : color }}>
          {icon}
        </div>
      </div>
      <p style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1.875rem", color: featured ? "#fff" : "var(--foreground)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
        {value}
      </p>
      <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: featured ? "rgba(255,255,255,0.6)" : "var(--muted-foreground)", marginTop: "0.375rem" }}>MAD</p>
      {sub && <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: featured ? "rgba(255,255,255,0.55)" : "var(--muted-foreground)", marginTop: "0.25rem" }}>{sub}</p>}
    </div>
  );
}

/* ─── Withdraw modal ─── */
function WithdrawModal({ onClose, available }: { onClose: () => void; available: number }) {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [step, setStep] = useState<"amount" | "method" | "confirm" | "done">("amount");
  const [amount, setAmount] = useState(String(available));
  const [method, setMethod] = useState("bank");
  const methods = [
    { id: "bank",   label: isFr ? "Virement bancaire" : "Bank transfer",     sub: "Banque Populaire ****4521", time: isFr ? "2 à 3 jours ouvrables" : "2–3 business days" },
    { id: "cih",    label: "CIH Bank",           sub: "CIH ****8832",              time: isFr ? "2 à 3 jours ouvrables" : "2–3 business days" },
    { id: "wallet", label: isFr ? "Portefeuille mobile" : "Mobile wallet",      sub: "Orange Money / Inwi Money", time: isFr ? "Instantané" : "Instant" },
  ];
  const selected = methods.find((m) => m.id === method);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 440, background: "var(--card)", borderRadius: "1rem", padding: "1.75rem", boxShadow: "0 16px 48px rgba(0,0,0,0.18)", zIndex: 1 }}>
        {step === "done" ? (
          <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <CheckCircle size={28} style={{ color: "#10B981" }} />
            </div>
            <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.25rem", color: "var(--foreground)", marginBottom: "0.375rem" }}>
              {isFr ? "Retrait initié" : "Withdrawal initiated"}
            </p>
            <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.65, marginBottom: "1.5rem" }}>
              {isFr ? `${Number(amount).toLocaleString()} MAD arrivera sur votre compte d'ici ${selected?.time}.` : `${amount} MAD will arrive in your account within ${selected?.time ?? "2-3 days"}.`}
            </p>
            <button onClick={onClose} style={{ padding: "0.625rem 1.5rem", borderRadius: "0.5rem", background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500 }}>
              {isFr ? "Retour aux revenus" : "Back to earnings"}
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.125rem", color: "var(--foreground)" }}>
                {step === "amount" ? (isFr ? "Quel montant ?" : "How much?") : step === "method" ? (isFr ? "Choisir la méthode" : "Choose method") : (isFr ? "Confirmer le retrait" : "Confirm withdrawal")}
              </p>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}>
                <X size={18} />
              </button>
            </div>

            {step === "amount" && (
              <>
                <div style={{ padding: "1.25rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.75rem", marginBottom: "1.5rem", textAlign: "center" }}>
                  <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>{isFr ? "Solde disponible" : "Available balance"}</p>
                  <p style={{ fontFamily: f.h, fontWeight: 800, fontSize: "2.25rem", color: "#10B981", letterSpacing: "-0.04em" }}>{available.toLocaleString()}</p>
                  <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>MAD</p>
                </div>
                <label style={{ display: "block", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
                  {isFr ? "Montant du retrait" : "Withdrawal amount"}
                </label>
                <div style={{ position: "relative", marginBottom: "1rem" }}>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    max={available}
                    style={{ width: "100%", height: "3rem", padding: "0 3.5rem 0 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--input-background)", color: "var(--foreground)", fontFamily: f.h, fontSize: "1.25rem", fontWeight: 700, outline: "none", boxSizing: "border-box" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                  />
                  <span style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>MAD</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                  {[500, 1000, available].map((v) => (
                    <button key={v} onClick={() => setAmount(String(v))} style={{ padding: "0.375rem 0.875rem", borderRadius: "2rem", border: "1px solid var(--border)", background: Number(amount) === v ? "var(--primary)" : "var(--muted)", color: Number(amount) === v ? "#fff" : "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500 }}>
                      {v === available ? (isFr ? "Tout" : "All") : `${v.toLocaleString()}`}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep("method")}
                  disabled={!amount || Number(amount) <= 0 || Number(amount) > available}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "none", background: Number(amount) > 0 && Number(amount) <= available ? "var(--primary)" : "var(--muted)", color: Number(amount) > 0 && Number(amount) <= available ? "#fff" : "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.9rem", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                >
                  {isFr ? "Choisir la méthode" : "Choose method"} <ArrowRight size={15} />
                </button>
              </>
            )}

            {step === "method" && (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
                  {methods.map((m) => (
                    <button key={m.id} onClick={() => setMethod(m.id)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1rem", borderRadius: "0.625rem", border: `1.5px solid ${method === m.id ? "var(--primary)" : "var(--border)"}`, background: method === m.id ? "#EFF6FF" : "var(--card)", cursor: "pointer", textAlign: "left" }}>
                      <div>
                        <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{m.label}</p>
                        <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{m.sub} · {m.time}</p>
                      </div>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${method === m.id ? "var(--primary)" : "var(--border)"}`, background: method === m.id ? "var(--primary)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {method === m.id && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />}
                      </div>
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.625rem" }}>
                  <button onClick={() => setStep("amount")} style={{ flex: 1, padding: "0.625rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem" }}>{isFr ? "Retour" : "Back"}</button>
                  <button onClick={() => setStep("confirm")} style={{ flex: 2, padding: "0.625rem", borderRadius: "0.5rem", border: "none", background: "var(--primary)", color: "#fff", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500 }}>{isFr ? "Suivant" : "Review"} <ArrowRight size={14} /></button>
                </div>
              </>
            )}

            {step === "confirm" && (
              <>
                <div style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1rem", marginBottom: "1.5rem" }}>
                  {[
                    { l: isFr ? "Montant" : "Amount",  v: `${Number(amount).toLocaleString()} MAD` },
                    { l: isFr ? "Vers" : "To",      v: selected?.label ?? "" },
                    { l: isFr ? "Compte" : "Account", v: selected?.sub ?? "" },
                    { l: isFr ? "Arrivée" : "Arrives", v: selected?.time ?? "" },
                  ].map((item) => (
                    <div key={item.l} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>{item.l}</span>
                      <span style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)" }}>{item.v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.625rem" }}>
                  <button onClick={() => setStep("method")} style={{ flex: 1, padding: "0.625rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem" }}>{isFr ? "Retour" : "Back"}</button>
                  <button onClick={async () => {
                    try {
                      await api.post('/api/payments/withdraw', { amount: Number(amount) });
                      setStep("done");
                    } catch (err) {
                      console.error(err);
                      alert(isFr ? "Échec du retrait" : "Failed to withdraw");
                    }
                  }} style={{ flex: 2, padding: "0.625rem", borderRadius: "0.5rem", border: "none", background: "#10B981", color: "#fff", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500 }}>{isFr ? "Confirmer le retrait" : "Confirm withdrawal"}</button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Transaction row ─── */
function TransactionRow({ t }: { t: Transaction }) {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const typeConfig = {
    payment_released: { label: isFr ? "Paiement reçu" : "Payment received", icon: <ArrowDown size={14} />, colorClass: "#10B981", positive: true },
    escrow_in:        { label: isFr ? "En séquestre" : "In escrow",        icon: <Shield size={14} />,    colorClass: "#7C3AED", positive: false },
    withdrawal:       { label: isFr ? "Retrait" : "Withdrawal",        icon: <CreditCard size={14} />,colorClass: "#6B7280", positive: false },
    bonus:            { label: isFr ? "Bonus" : "Bonus",             icon: <TrendingUp size={14} />,colorClass: "#2563EB", positive: true },
  } as const;
  const tc = typeConfig[t.type as keyof typeof typeConfig] || typeConfig.payment_released;
  const statusConfig = {
    completed:  { label: isFr ? "Complété" : "Completed",  color: "#065F46", bg: "#D1FAE5" },
    pending:    { label: isFr ? "En attente" : "Pending",    color: "#5B21B6", bg: "#EDE9FE" },
    processing: { label: isFr ? "En cours" : "Processing", color: "#92400E", bg: "#FEF3C7" },
  };
  const sc = statusConfig[t.status as keyof typeof statusConfig] || statusConfig.completed;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.875rem 1.125rem", borderBottom: "1px solid var(--border)" }}>
      <div style={{ width: 36, height: 36, borderRadius: "0.625rem", background: `${t.brandColor}18`, display: "flex", alignItems: "center", justifyContent: "center", color: t.brandColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>
        {t.brand[0]}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.campaign}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", fontFamily: f.b, fontSize: "0.75rem", color: tc.colorClass }}>
            {tc.icon}{tc.label}
          </span>
          <span style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)" }}>{t.date}</span>
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9375rem", color: tc.positive ? "#10B981" : t.amount < 0 ? "#6B7280" : "var(--foreground)" }}>
          {t.amount > 0 ? "+" : ""}{t.amount.toLocaleString()} MAD
        </p>
        <span style={{ padding: "0.1rem 0.4rem", borderRadius: 999, background: sc.bg, color: sc.color, fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600 }}>
          {sc.label}
        </span>
      </div>
    </div>
  );
}

export function EarningsPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [txFilter, setTxFilter] = useState<"all" | "received" | "pending" | "withdrawn">("all");
  const [earningsData, setEarningsData] = useState({ totalEarned: 0, inEscrow: 0, available: 0, pendingCount: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/api/payments/influencer-summary');
        const d = res.data.data;
        setEarningsData({
          totalEarned: d.total_earned || 0,
          inEscrow: d.total_pending || 0,
          available: d.available_balance || 0,
          pendingCount: d.transactions?.data?.filter((t: any) => t.status === 'in_escrow').length || 0
        });
        
        const mappedTx: Transaction[] = (d.transactions?.data || []).map((t: any) => {
          let type = "payment_released";
          if (t.status === "in_escrow") type = "escrow_in";
          else if (t.status === "pending") type = "escrow_in"; // Simplify
          
          return {
            id: t.id.toString(),
            type,
            amount: t.amount,
            date: new Date(t.created_at).toLocaleDateString(),
            status: t.status === "released" ? "completed" : "pending",
            campaign: t.application?.campaign?.title || "Campaign",
            brand: t.application?.campaign?.brand_profile?.company_name || "Brand",
            brandColor: "#2563EB"
          };
        });
        setTransactions(mappedTx);
      } catch (err) {
        console.error("Failed to load earnings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredTx = useMemo(() => {
    return transactions.filter((t) => {
      if (txFilter === "received") return t.type === "payment_released" || t.type === "bonus";
      if (txFilter === "pending")  return t.type === "escrow_in";
      if (txFilter === "withdrawn") return t.type === "withdrawal";
      return true;
    });
  }, [txFilter, transactions]);

  return (
    <div style={{ padding: "1.75rem 1.5rem 3rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
          {isFr ? "Revenus & Paiements" : "Earnings & Payments"}
        </h1>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          {isFr ? "Votre portefeuille, solde séquestre et historique complet des transactions" : "Your wallet, escrow balance, and full transaction history"}
        </p>
      </div>

      {/* Wallet summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        <WalletCard
          label={isFr ? "Revenus cumulés (total)" : "Total Earned (all time)"}
          value={earningsData.totalEarned.toLocaleString()}
          color="#1D4ED8" bg="#DBEAFE" featured
          icon={<TrendingUp size={16} />}
        />
        <WalletCard
          label={isFr ? "En séquestre" : "In Escrow"}
          value={earningsData.inEscrow.toLocaleString()}
          sub={isFr ? `${earningsData.pendingCount} campagnes en cours` : `${earningsData.pendingCount} campaigns in progress`}
          color="#5B21B6" bg="#EDE9FE"
          icon={<Shield size={16} />}
        />
        <WalletCard
          label={isFr ? "Disponible pour retrait" : "Available to Withdraw"}
          value={earningsData.available.toLocaleString()}
          sub={isFr ? "Prêt pour le retrait" : "Ready for withdrawal"}
          color="#065F46" bg="#D1FAE5"
          icon={<ArrowDown size={16} />}
        />
      </div>

      {/* Withdraw CTA */}
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          <div style={{ width: 44, height: 44, borderRadius: "0.75rem", background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", color: "#10B981", flexShrink: 0 }}>
            <ArrowDown size={20} />
          </div>
          <div>
            <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)", marginBottom: "0.125rem" }}>
              {earningsData.available.toLocaleString()} {isFr ? "MAD disponibles" : "MAD available"}
            </p>
            <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>
              {isFr ? "Transfert vers votre banque ou portefeuille mobile sous 2 à 3 jours ouvrables" : "Transfer to your bank or mobile wallet in 2–3 business days"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowWithdraw(true)}
          style={{ padding: "0.6875rem 1.5rem", borderRadius: "0.625rem", background: "#10B981", color: "#fff", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.9rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5rem", boxShadow: "0 4px 12px rgba(16,185,129,0.25)", flexShrink: 0 }}
        >
          {isFr ? "Retirer" : "Withdraw"} <ArrowRight size={15} />
        </button>
      </div>

      {/* Escrow note */}
      <div style={{ display: "flex", gap: "0.75rem", padding: "0.875rem 1rem", background: "#EDE9FE", border: "1px solid #DDD6FE", borderRadius: "0.75rem", marginBottom: "1.5rem" }}>
        <Shield size={16} style={{ color: "#7C3AED", flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "#5B21B6", lineHeight: 1.65 }}>
          <strong>{earningsData.inEscrow.toLocaleString()} MAD</strong> {isFr ? "est retenu en séquestre pour" : "is held in escrow across"} {earningsData.pendingCount} {isFr ? "campagnes actives. Les fonds sont débloqués automatiquement lorsque votre contenu est approuvé par la marque." : "active campaigns. Funds are released automatically when your content is approved by the brand."}
        </p>
      </div>

      {/* Transaction history */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>
            {isFr ? "Historique des transactions" : "Transaction history"}
          </h2>
          <div style={{ display: "flex", gap: "0.25rem", background: "var(--muted)", borderRadius: "0.5rem", padding: "0.25rem" }}>
            {(["all","received","pending","withdrawn"] as const).map((tab) => {
              const tabLabels = {
                all: isFr ? "Tout" : "All",
                received: isFr ? "Reçus" : "Received",
                pending: isFr ? "En attente" : "Pending",
                withdrawn: isFr ? "Retirés" : "Withdrawn"
              };
              return (
                <button key={tab} onClick={() => setTxFilter(tab)}
                  style={{ padding: "0.3125rem 0.75rem", borderRadius: "0.375rem", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: txFilter === tab ? 500 : 400, background: txFilter === tab ? "var(--card)" : "transparent", color: txFilter === tab ? "var(--foreground)" : "var(--muted-foreground)", textTransform: "capitalize", transition: "all .15s", whiteSpace: "nowrap", boxShadow: txFilter === tab ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
                  {tabLabels[tab]}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", overflow: "hidden" }}>
          {loading ? (
             <div style={{ padding: "3rem", textAlign: "center", color: "var(--muted-foreground)" }}>
               {isFr ? "Chargement des transactions..." : "Loading transactions..."}
             </div>
          ) : filteredTx.length > 0
            ? filteredTx.map((t) => <TransactionRow key={t.id} t={t} />)
            : (
              <div style={{ padding: "3rem", textAlign: "center" }}>
                <Clock size={24} style={{ color: "var(--muted-foreground)", display: "block", margin: "0 auto 0.75rem" }} />
                <p style={{ fontFamily: f.b, fontSize: "0.9rem", color: "var(--muted-foreground)" }}>
                  {isFr ? "Aucune transaction ne correspond à ce filtre." : "No transactions match this filter."}
                </p>
              </div>
            )
          }
        </div>
      </div>

      {showWithdraw && <WithdrawModal onClose={() => setShowWithdraw(false)} available={earningsData.available} />}
    </div>
  );
}
