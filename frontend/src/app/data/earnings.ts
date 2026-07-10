export type TransactionType = "escrow_in" | "payment_released" | "withdrawal" | "bonus";
export type TransactionStatus = "completed" | "pending" | "processing";

export interface Transaction {
  id: string;
  date: string;
  campaign: string;
  brand: string;
  brandColor: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  note?: string;
}

export interface EarningsData {
  totalEarned: number;
  inEscrow: number;
  available: number;
  pendingCount: number;
  monthlyEarned: number;
  monthlyGrowth: number;
}

export const earningsData: EarningsData = {
  totalEarned:    14200,
  inEscrow:        6000,
  available:       2800,
  pendingCount:       2,
  monthlyEarned:   5200,
  monthlyGrowth:    22,
};

export const transactions: Transaction[] = [
  {
    id: "t1",
    date: "17 mai 2024",
    campaign: "App Launch — #TechMa",
    brand: "MarocTech",
    brandColor: "#7C3AED",
    type: "payment_released",
    amount: 2800,
    status: "completed",
    note: "Final payment on content approval",
  },
  {
    id: "t2",
    date: "15 mai 2024",
    campaign: "App Launch — #TechMa",
    brand: "MarocTech",
    brandColor: "#7C3AED",
    type: "escrow_in",
    amount: 2800,
    status: "completed",
    note: "Escrow funded by brand",
  },
  {
    id: "t3",
    date: "14 mai 2024",
    campaign: "App Launch — #TechMa",
    brand: "MarocTech",
    brandColor: "#7C3AED",
    type: "withdrawal",
    amount: -2800,
    status: "completed",
    note: "Withdrawal to Banque Populaire ****4521",
  },
  {
    id: "t4",
    date: "10 mai 2024",
    campaign: "Wellness Reset Programme",
    brand: "NovaBio",
    brandColor: "#10B981",
    type: "escrow_in",
    amount: 4200,
    status: "pending",
    note: "In escrow — released on content approval",
  },
  {
    id: "t5",
    date: "8 mai 2024",
    campaign: "Summer Skincare Lancement",
    brand: "GlowLab Morocco",
    brandColor: "#EC4899",
    type: "escrow_in",
    amount: 5000,
    status: "pending",
    note: "In escrow — 50% on signing, 50% on approval",
  },
  {
    id: "t6",
    date: "2 mai 2024",
    campaign: "Summer Skincare Lancement",
    brand: "GlowLab Morocco",
    brandColor: "#EC4899",
    type: "payment_released",
    amount: 2500,
    status: "completed",
    note: "First milestone: contract signing",
  },
  {
    id: "t7",
    date: "28 avril 2024",
    campaign: "Summer Collection Lookbooks",
    brand: "AtlasBrand",
    brandColor: "#2563EB",
    type: "escrow_in",
    amount: 3500,
    status: "pending",
    note: "In escrow — released on content approval",
  },
  {
    id: "t8",
    date: "21 avril 2024",
    campaign: "Eco-Living Voices",
    brand: "VertMaroc",
    brandColor: "#059669",
    type: "bonus",
    amount: 400,
    status: "completed",
    note: "Performance bonus: 20% above engagement target",
  },
  {
    id: "t9",
    date: "15 avril 2024",
    campaign: "Eco-Living Voices",
    brand: "VertMaroc",
    brandColor: "#059669",
    type: "payment_released",
    amount: 1200,
    status: "completed",
    note: "Monthly retainer — April",
  },
  {
    id: "t10",
    date: "1 avril 2024",
    campaign: "Eco-Living Voices",
    brand: "VertMaroc",
    brandColor: "#059669",
    type: "withdrawal",
    amount: -1200,
    status: "completed",
    note: "Withdrawal to CIH Bank ****8832",
  },
];

export const calendarEvents = [
  { id: "ev1",  date: "2024-06-04", title: "GlowLab — Campaign deadline",      type: "deadline",    color: "#EC4899",  brand: "GlowLab Morocco" },
  { id: "ev2",  date: "2024-06-05", title: "GlowLab — Reels #1 resubmit",      type: "submission",  color: "#EC4899",  brand: "GlowLab Morocco" },
  { id: "ev3",  date: "2024-06-08", title: "AtlasBrand — Campaign deadline",    type: "deadline",    color: "#2563EB",  brand: "AtlasBrand" },
  { id: "ev4",  date: "2024-06-10", title: "NovaBio — Briefing call",           type: "briefing",    color: "#10B981",  brand: "NovaBio" },
  { id: "ev5",  date: "2024-06-12", title: "NovaBio — Campaign deadline",       type: "deadline",    color: "#10B981",  brand: "NovaBio" },
  { id: "ev6",  date: "2024-06-15", title: "MarocTech — Submission deadline",   type: "submission",  color: "#7C3AED",  brand: "MarocTech" },
  { id: "ev7",  date: "2024-06-18", title: "GlowLab — Content goes live",       type: "publication", color: "#EC4899",  brand: "GlowLab Morocco" },
  { id: "ev8",  date: "2024-06-20", title: "AtlasBrand — Payment release",      type: "payment",     color: "#2563EB",  brand: "AtlasBrand" },
  { id: "ev9",  date: "2024-06-22", title: "AtlasBrand — Submission deadline",  type: "submission",  color: "#2563EB",  brand: "AtlasBrand" },
  { id: "ev10", date: "2024-06-25", title: "VertMaroc — Application deadline",  type: "deadline",    color: "#059669",  brand: "VertMaroc" },
  { id: "ev11", date: "2024-06-28", title: "Zara.ma — Content submission",      type: "submission",  color: "#1F2937",  brand: "Zara.ma" },
  { id: "ev12", date: "2024-06-30", title: "NovaBio — Payment release",         type: "payment",     color: "#10B981",  brand: "NovaBio" },
];
