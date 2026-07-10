export type CampaignStatus = "draft" | "active" | "paused" | "completed" | "reviewing";

export interface BrandApplicant {
  id: string; name: string; handle: string; avatar: string; color: string;
  platform: string; followers: string; engagement: string;
  iaScore: number; matchScore: number;
  niche: string; location: string;
  status: "pending" | "accepted" | "rejected" | "shortlisted";
  pastCollabs: number; bio: string;
  influencerProfileId?: string;
  targetUserId?: string;
}

export interface ContentSubmission {
  id: string; creatorName: string; creatorColor: string;
  deliverable: string; url: string;
  status: "pending" | "approved" | "revision";
  submittedAt: string; revisionNote?: string;
}

export interface BrandCampaign {
  id: string; title: string; status: CampaignStatus;
  platforms: string[]; category: string; brief: string;
  budget: number; spent: number; deadline: string;
  applicationDeadline: string; submissionDeadline: string;
  applicants: number; accepted: number; submitted: number;
  pendingApprovals: number; matchAvg: number;
  roi: number | null; impressions: number; engagements: number;
  createdAt: string; niches: string[]; followerTiers: string[];
  deliverables: string[]; paymentModel: string;
  spotsTotal: number;
  targetAudience: { gender: string; ageRange: string; location: string };
}

export const brandCampaigns: BrandCampaign[] = [
  {
    id: "bc1", title: "Summer Skincare Lancement", status: "active",
    platforms: ["instagram", "tiktok"], category: "Beauty & Skincare",
    brief: "Authentic lifestyle content showcasing our summer skincare line. Personal, genuine — not promotional.",
    budget: 25000, spent: 12500, deadline: "2024-06-04",
    applicationDeadline: "2024-05-25", submissionDeadline: "2024-06-01",
    applicants: 14, accepted: 5, submitted: 3, pendingApprovals: 3,
    matchAvg: 88, roi: 3.8, impressions: 420000, engagements: 34000,
    createdAt: "2024-05-01", niches: ["Beauty & Skincare", "Lifestyle"],
    followerTiers: ["nano", "micro"], deliverables: ["2 Reels", "3 Stories"],
    paymentModel: "Fixed fee", spotsTotal: 8,
    targetAudience: { gender: "Women", ageRange: "25–40", location: "Morocco, France" },
  },
  {
    id: "bc2", title: "Summer Collection SS24", status: "active",
    platforms: ["instagram"], category: "Fashion & Apparel",
    brief: "SS24 lookbook — storytelling first, elevated Moroccan aesthetic, no flat product shots.",
    budget: 17500, spent: 7000, deadline: "2024-06-08",
    applicationDeadline: "2024-05-28", submissionDeadline: "2024-06-05",
    applicants: 28, accepted: 5, submitted: 1, pendingApprovals: 2,
    matchAvg: 82, roi: null, impressions: 180000, engagements: 14000,
    createdAt: "2024-05-05", niches: ["Fashion & Style", "Lifestyle"],
    followerTiers: ["micro"], deliverables: ["3 Reels", "5 Stories", "1 Carousel"],
    paymentModel: "Fixed fee", spotsTotal: 5,
    targetAudience: { gender: "All", ageRange: "22–38", location: "Morocco, UAE" },
  },
  {
    id: "bc3", title: "Wellness Reset Programme", status: "reviewing",
    platforms: ["instagram", "youtube"], category: "Health & Wellness",
    brief: "Document a 14-day routine with our plant-based products. Real results, real voice.",
    budget: 21000, spent: 0, deadline: "2024-06-12",
    applicationDeadline: "2024-06-01", submissionDeadline: "2024-06-10",
    applicants: 19, accepted: 0, submitted: 0, pendingApprovals: 0,
    matchAvg: 79, roi: null, impressions: 0, engagements: 0,
    createdAt: "2024-05-10", niches: ["Wellness & Nutrition", "Fitness"],
    followerTiers: ["nano", "micro"], deliverables: ["1 YouTube vlog", "2 Reels", "7 Stories"],
    paymentModel: "Milestone-based", spotsTotal: 5,
    targetAudience: { gender: "All", ageRange: "25–45", location: "Morocco" },
  },
  {
    id: "bc4", title: "App Launch — #TechMa", status: "completed",
    platforms: ["tiktok", "instagram"], category: "Tech & Apps",
    brief: "Tutorial-style content for productivity app. Darija or French.",
    budget: 14000, spent: 14000, deadline: "2024-05-15",
    applicationDeadline: "2024-05-05", submissionDeadline: "2024-05-12",
    applicants: 31, accepted: 5, submitted: 5, pendingApprovals: 0,
    matchAvg: 71, roi: 4.1, impressions: 620000, engagements: 51000,
    createdAt: "2024-04-20", niches: ["Tech & Productivity"],
    followerTiers: ["nano", "micro"], deliverables: ["2 TikToks", "3 Stories", "1 Reel"],
    paymentModel: "Fixed fee", spotsTotal: 5,
    targetAudience: { gender: "All", ageRange: "22–40", location: "Morocco" },
  },
  {
    id: "bc5", title: "Autumn Preview — Zara.ma", status: "draft",
    platforms: ["instagram"], category: "Fashion Retail",
    brief: "Autumn preview campaign with 10 local creators. Style-forward, personal storytelling.",
    budget: 37500, spent: 0, deadline: "2024-06-30",
    applicationDeadline: "2024-06-15", submissionDeadline: "2024-06-25",
    applicants: 0, accepted: 0, submitted: 0, pendingApprovals: 0,
    matchAvg: 0, roi: null, impressions: 0, engagements: 0,
    createdAt: "2024-05-20", niches: ["Fashion & Style"],
    followerTiers: ["micro", "macro"], deliverables: ["4 Reels", "1 Carousel"],
    paymentModel: "Fixed fee + gift", spotsTotal: 10,
    targetAudience: { gender: "Women", ageRange: "20–35", location: "Morocco" },
  },
];

export const mockApplicants: BrandApplicant[] = [
  { id: "ap1", name: "Sarah Benjelloun", handle: "@sarah_bj", avatar: "S", color: "#EC4899", platform: "instagram", followers: "98.4K", engagement: "8.3%", iaScore: 87, matchScore: 96, niche: "Lifestyle & Beauty", location: "Casablanca, MA", status: "pending", pastCollabs: 4, bio: "Lifestyle & beauty creator sharing authentic skincare routines and daily life in Casablanca." },
  { id: "ap2", name: "Lina Zahra", handle: "@linaz.beauty", avatar: "L", color: "#7C3AED", platform: "instagram", followers: "67.2K", engagement: "6.1%", iaScore: 79, matchScore: 91, niche: "Beauty & Wellness", location: "Rabat, MA", status: "pending", pastCollabs: 2, bio: "Beauty and wellness content with a focus on clean, natural products for North African skin tones." },
  { id: "ap3", name: "Amina Rifi", handle: "@amina.skincare", avatar: "A", color: "#2563EB", platform: "instagram", followers: "24.1K", engagement: "9.4%", iaScore: 74, matchScore: 84, niche: "Skincare & Fitness", location: "Casablanca, MA", status: "shortlisted", pastCollabs: 1, bio: "Nano creator focused on clean beauty and fitness. High engagement, loyal community of 24K." },
  { id: "ap4", name: "Hana Benali", handle: "@hanab.life", avatar: "H", color: "#10B981", platform: "instagram", followers: "18.3K", engagement: "7.8%", iaScore: 71, matchScore: 79, niche: "Lifestyle & Home", location: "Marrakech, MA", status: "pending", pastCollabs: 0, bio: "Home, lifestyle, and beauty content creator based in Marrakech." },
  { id: "ap5", name: "Nadia Cherkaoui", handle: "@nadia.glam", avatar: "N", color: "#F59E0B", platform: "instagram", followers: "142K", engagement: "2.1%", iaScore: 65, matchScore: 62, niche: "Glamour & Fashion", location: "Paris, FR", status: "rejected", pastCollabs: 7, bio: "Glamour and fashion creator. Larger audience but lower engagement than typical nano/micro." },
  { id: "ap6", name: "Fatima Ouali", handle: "@fatima.wellness", avatar: "F", color: "#059669", platform: "instagram", followers: "14.2K", engagement: "8.9%", iaScore: 77, matchScore: 88, niche: "Wellness & Nutrition", location: "Casablanca, MA", status: "accepted", pastCollabs: 2, bio: "Wellness and nutrition creator. Authentic, engaged community focused on healthy living." },
  { id: "ap7", name: "Yasmine Idrissi", handle: "@yas.beauty", avatar: "Y", color: "#6366F1", platform: "instagram", followers: "31.4K", engagement: "5.6%", iaScore: 72, matchScore: 82, niche: "Beauty & Lifestyle", location: "Fes, MA", status: "accepted", pastCollabs: 3, bio: "Beauty and lifestyle content from Fes. Known for her authentic skincare reviews and tutorials." },
];

export const mockSubmissions: ContentSubmission[] = [
  { id: "s1", creatorName: "Fatima Ouali", creatorColor: "#059669", deliverable: "Instagram Reel #1 (60s)", url: "https://instagram.com/reel/abc123", status: "revision", submittedAt: "27 mai · 14:32", revisionNote: "Please re-shoot with better natural lighting. The first 10 seconds are too dark." },
  { id: "s2", creatorName: "Fatima Ouali", creatorColor: "#059669", deliverable: "Instagram Reel #2 (60s)", url: "https://instagram.com/reel/def456", status: "approved", submittedAt: "27 mai · 14:34" },
  { id: "s3", creatorName: "Yasmine Idrissi", creatorColor: "#6366F1", deliverable: "Instagram Reel #1", url: "https://instagram.com/reel/xyz789", status: "pending", submittedAt: "28 mai · 09:10" },
  { id: "s4", creatorName: "Sarah Benjelloun", creatorColor: "#EC4899", deliverable: "TikTok Video (90s)", url: "https://tiktok.com/@sarah_bj/video/1", status: "approved", submittedAt: "26 mai · 16:20" },
];

export const overviewChartData = [
  { week: "W1 Mai", impressions: 42000, engagements: 3400, spend: 8500 },
  { week: "W2 Mai", impressions: 78000, engagements: 6200, spend: 12000 },
  { week: "W3 Mai", impressions: 114000, engagements: 9100, spend: 15500 },
  { week: "W4 Mai", impressions: 156000, engagements: 12800, spend: 19200 },
  { week: "W1 Jun", impressions: 198000, engagements: 16400, spend: 23000 },
  { week: "W2 Jun", impressions: 220000, engagements: 18900, spend: 26800 },
];

export const brandActivityFeed = [
  { id: 1, type: "application",  icon: "user",    brand: "Sarah Benjelloun",   campaign: "Summer Skincare Lancement",  text: "applied to your campaign",  time: "2h ago",    color: "#EC4899" },
  { id: 2, type: "submission",   icon: "check",   brand: "Fatima Ouali",       campaign: "Summer Skincare Lancement",  text: "submitted Reel #2 — approved",  time: "3h ago",    color: "#10B981" },
  { id: 3, type: "revision",     icon: "alert",   brand: "Fatima Ouali",       campaign: "Summer Skincare Lancement",  text: "revision requested on Reel #1", time: "4h ago",    color: "#F97316" },
  { id: 4, type: "accepted",     icon: "star",    brand: "Yasmine Idrissi",    campaign: "Summer Skincare Lancement",  text: "accepted your collaboration invite", time: "Yesterday", color: "#7C3AED" },
  { id: 5, type: "application",  icon: "user",    brand: "Hana Benali",        campaign: "Summer Collection SS24",     text: "applied to your campaign",  time: "2 days ago",color: "#2563EB" },
  { id: 6, type: "completed",    icon: "trophy",  brand: "App Launch — #TechMa", campaign: "",                        text: "campaign completed — 4.1× ROI achieved", time: "5 days ago", color: "#10B981" },
];
