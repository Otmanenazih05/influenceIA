export type AppStatus = "pending" | "accepted" | "submitted" | "revision" | "approved" | "completed" | "rejected";
export type Platform = "instagram" | "tiktok" | "youtube" | "facebook";

export interface Milestone {
  id: string;
  label: string;
  date: string;
  status: "done" | "current" | "upcoming";
}

export interface ContentItem {
  id: string;
  deliverable: string;
  url: string;
  status: "pending" | "submitted" | "revision" | "approved";
  revisionNote?: string;
  submittedAt?: string;
}

export interface RevisionNote {
  id: string;
  from: "brand" | "creator";
  author: string;
  message: string;
  date: string;
}

export interface Application {
  id: string;
  campaignTitle: string;
  brand: string;
  brandColor: string;
  brandIndustry: string;
  platforms: Platform[];
  appliedDate: string;
  deadline: string;
  submissionDeadline: string;
  payment: number;
  status: AppStatus;
  matchScore: number;
  brief: string;
  deliverables: string[];
  milestones: Milestone[];
  contentItems: ContentItem[];
  revisions: RevisionNote[];
  paymentModel: string;
  spotsUsed?: number;
}

export const applications: Application[] = [
  {
    id: "a1",
    campaignTitle: "Summer Skincare Lancement",
    brand: "GlowLab Morocco",
    brandColor: "#EC4899",
    brandIndustry: "Beauty & Skincare",
    platforms: ["instagram", "tiktok"],
    appliedDate: "22 mai 2024",
    deadline: "4 juin 2024",
    submissionDeadline: "28 mai 2024",
    payment: 5000,
    status: "revision",
    matchScore: 96,
    brief: "Authentic lifestyle content showcasing our summer skincare line. Personal, genuine — not overly promotional.",
    deliverables: ["2 Instagram Reels (60s)", "3 Instagram Stories with link sticker", "1 TikTok video (90s)"],
    milestones: [
      { id: "m1", label: "Applied",          date: "22 mai",  status: "done" },
      { id: "m2", label: "Accepted",         date: "23 mai",  status: "done" },
      { id: "m3", label: "Content submitted", date: "27 mai", status: "done" },
      { id: "m4", label: "Under review",     date: "28 mai",  status: "current" },
      { id: "m5", label: "Content approved", date: "–",       status: "upcoming" },
      { id: "m6", label: "Payment released", date: "–",       status: "upcoming" },
    ],
    contentItems: [
      { id: "ci1", deliverable: "Instagram Reel #1 (60s)", url: "https://instagram.com/reel/abc123", status: "revision", revisionNote: "Please re-shoot with better natural lighting. The background is too dark in the first 10 seconds.", submittedAt: "27 mai 14:32" },
      { id: "ci2", deliverable: "Instagram Reel #2 (60s)", url: "https://instagram.com/reel/def456", status: "approved", submittedAt: "27 mai 14:34" },
      { id: "ci3", deliverable: "Instagram Stories (×3)", url: "", status: "pending" },
      { id: "ci4", deliverable: "TikTok video (90s)", url: "", status: "pending" },
    ],
    revisions: [
      { id: "r1", from: "brand", author: "GlowLab Morocco", message: "Hi Sarah! Reel #1 looks great overall but the lighting in the first 10 seconds makes the product look darker than it is. Could you re-shoot just that section and resubmit? Everything else is perfect ✨", date: "28 mai · 09:14" },
      { id: "r2", from: "creator", author: "Sarah B.", message: "Of course! I'll reshoot this afternoon with the natural window light and resubmit by end of day today. 🙏", date: "28 mai · 10:02" },
    ],
    paymentModel: "Milestone-based · Escrow",
  },
  {
    id: "a2",
    campaignTitle: "Summer Collection Lookbooks",
    brand: "AtlasBrand",
    brandColor: "#2563EB",
    brandIndustry: "Fashion & Apparel",
    platforms: ["instagram"],
    appliedDate: "19 mai 2024",
    deadline: "8 juin 2024",
    submissionDeadline: "5 juin 2024",
    payment: 3500,
    status: "accepted",
    matchScore: 88,
    brief: "SS24 lookbook campaign — storytelling-first, not flat product shots. Elevated Moroccan aesthetic.",
    deliverables: ["3 Instagram Reels", "5 Instagram Stories", "1 lifestyle photo series (6 images)"],
    milestones: [
      { id: "m1", label: "Applied",          date: "19 mai", status: "done" },
      { id: "m2", label: "Accepted",         date: "21 mai", status: "done" },
      { id: "m3", label: "Content submitted", date: "–",     status: "upcoming" },
      { id: "m4", label: "Under review",     date: "–",      status: "upcoming" },
      { id: "m5", label: "Content approved", date: "–",      status: "upcoming" },
      { id: "m6", label: "Payment released", date: "–",      status: "upcoming" },
    ],
    contentItems: [
      { id: "ci1", deliverable: "Instagram Reel #1", url: "", status: "pending" },
      { id: "ci2", deliverable: "Instagram Reel #2", url: "", status: "pending" },
      { id: "ci3", deliverable: "Instagram Reel #3", url: "", status: "pending" },
      { id: "ci4", deliverable: "Instagram Stories (×5)", url: "", status: "pending" },
      { id: "ci5", deliverable: "Lifestyle photos (×6)", url: "", status: "pending" },
    ],
    revisions: [],
    paymentModel: "Fixed fee · Escrow",
  },
  {
    id: "a3",
    campaignTitle: "Wellness Reset Programme",
    brand: "NovaBio",
    brandColor: "#10B981",
    brandIndustry: "Health & Wellness",
    platforms: ["instagram", "youtube"],
    appliedDate: "15 mai 2024",
    deadline: "12 juin 2024",
    submissionDeadline: "8 juin 2024",
    payment: 4200,
    status: "pending",
    matchScore: 82,
    brief: "Document a 14-day wellness routine with NovaBio products. Real results, real voice.",
    deliverables: ["1 YouTube vlog (10+ min)", "2 Instagram Reels", "7 Instagram Stories (diary format)"],
    milestones: [
      { id: "m1", label: "Applied",          date: "15 mai", status: "done" },
      { id: "m2", label: "Accepted",         date: "–",      status: "current" },
      { id: "m3", label: "Content submitted", date: "–",     status: "upcoming" },
      { id: "m4", label: "Under review",     date: "–",      status: "upcoming" },
      { id: "m5", label: "Content approved", date: "–",      status: "upcoming" },
      { id: "m6", label: "Payment released", date: "–",      status: "upcoming" },
    ],
    contentItems: [],
    revisions: [],
    paymentModel: "Milestone-based · Escrow",
  },
  {
    id: "a4",
    campaignTitle: "App Launch — #TechMa",
    brand: "MarocTech",
    brandColor: "#7C3AED",
    brandIndustry: "Tech & Apps",
    platforms: ["tiktok", "instagram"],
    appliedDate: "10 mai 2024",
    deadline: "15 juin 2024",
    submissionDeadline: "12 juin 2024",
    payment: 2800,
    status: "completed",
    matchScore: 71,
    brief: "Tutorial-style content for new productivity app. In Darija or French.",
    deliverables: ["2 TikTok tutorial videos", "3 Stories with screenshots", "1 Instagram Reel review"],
    milestones: [
      { id: "m1", label: "Applied",          date: "10 mai", status: "done" },
      { id: "m2", label: "Accepted",         date: "11 mai", status: "done" },
      { id: "m3", label: "Content submitted", date: "14 mai", status: "done" },
      { id: "m4", label: "Under review",     date: "15 mai", status: "done" },
      { id: "m5", label: "Content approved", date: "16 mai", status: "done" },
      { id: "m6", label: "Payment released", date: "17 mai", status: "done" },
    ],
    contentItems: [
      { id: "ci1", deliverable: "TikTok Tutorial #1", url: "https://tiktok.com/@sarah_bj/video/1", status: "approved", submittedAt: "14 mai 11:20" },
      { id: "ci2", deliverable: "TikTok Tutorial #2", url: "https://tiktok.com/@sarah_bj/video/2", status: "approved", submittedAt: "14 mai 11:22" },
      { id: "ci3", deliverable: "Instagram Stories (×3)", url: "https://instagram.com/stories/highlights/xyz", status: "approved", submittedAt: "14 mai 11:30" },
      { id: "ci4", deliverable: "Instagram Reel Review", url: "https://instagram.com/reel/xyz789", status: "approved", submittedAt: "14 mai 11:35" },
    ],
    revisions: [],
    paymentModel: "Fixed fee",
  },
  {
    id: "a5",
    campaignTitle: "Zara x Maroc Creators",
    brand: "Zara.ma",
    brandColor: "#1F2937",
    brandIndustry: "Fashion Retail",
    platforms: ["instagram"],
    appliedDate: "8 mai 2024",
    deadline: "30 juin 2024",
    submissionDeadline: "25 juin 2024",
    payment: 7500,
    status: "rejected",
    matchScore: 84,
    brief: "Autumn preview campaign with 10 local creators. Style-forward, personal storytelling through fashion.",
    deliverables: ["4 Instagram Reels", "1 Carousel post", "Ongoing Stories coverage"],
    milestones: [
      { id: "m1", label: "Applied",   date: "8 mai",  status: "done" },
      { id: "m2", label: "Rejected",  date: "10 mai", status: "current" },
    ],
    contentItems: [],
    revisions: [
      { id: "r1", from: "brand", author: "Zara.ma", message: "Thank you for applying, Sarah. We loved your profile but have selected creators with a stronger fashion-first content history for this campaign. We'd love to work with you on our next campaign — keep an eye out for future opportunities.", date: "10 mai · 15:30" },
    ],
    paymentModel: "Fixed fee + product gift",
  },
];
