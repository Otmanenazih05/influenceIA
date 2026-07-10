export type Platform = "instagram" | "tiktok" | "youtube" | "facebook";
export type CampaignType = "paid" | "gifted" | "affiliate" | "ambassador";
export type CampaignStatus = "new" | "open" | "closing" | "saved";

export interface MatchReason {
  label: string;
  met: boolean;
  detail: string;
  weight: number;
}

export interface Campaign {
  id: string;
  brand: string;
  brandColor: string;
  brandIndustry: string;
  country: string;
  title: string;
  brief: string;
  platforms: Platform[];
  budget: number;
  deadline: string;
  matchScore: number;
  status: CampaignStatus;
  type: CampaignType;
  niche: string;
  followerMin: number;
  engagementMin: number;
  deliverables: string[];
  targetAudience: { gender: string; ageRange: string; location: string; niche: string };
  paymentModel: string;
  milestones: string[];
  requirements: string[];
  matchReasons: MatchReason[];
  saved: boolean;
  applicants: number;
  spotsLeft: number;
}

export const campaigns: Campaign[] = [
  {
    id: "c1",
    brand: "GlowLab Morocco",
    brandColor: "#EC4899",
    brandIndustry: "Beauty & Skincare",
    country: "Morocco",
    title: "Summer Skincare Lancement",
    brief: "We're looking for authentic lifestyle creators to showcase our new summer skincare line. Content should feel personal, genuine, and inspiring — not overly promotional.",
    platforms: ["instagram", "tiktok"],
    budget: 5000,
    deadline: "4 juin 2024",
    matchScore: 96,
    status: "new",
    type: "paid",
    niche: "Beauty & Lifestyle",
    followerMin: 5000,
    engagementMin: 3,
    deliverables: ["2 Instagram Reels (60s)", "3 Instagram Stories with link sticker", "1 TikTok video (90s)", "All content rights for 6 months"],
    targetAudience: { gender: "Women", ageRange: "25–40", location: "Morocco, France", niche: "Beauty & Lifestyle" },
    paymentModel: "Milestone-based · Escrow",
    milestones: ["50% on contract signing", "50% on content approval"],
    requirements: ["5K+ followers", "3%+ engagement rate", "Beauty or Lifestyle niche", "Morocco or Francophone audience"],
    matchReasons: [
      { label: "Engagement rate",     met: true,  detail: "Your 8.3% exceeds the 3% minimum",          weight: 30 },
      { label: "Audience location",   met: true,  detail: "73% of your audience is in Morocco",          weight: 25 },
      { label: "Content niche",       met: true,  detail: "Lifestyle & Beauty — perfect alignment",       weight: 25 },
      { label: "TikTok account",      met: false, detail: "Linking TikTok would raise this to 99%",       weight: 20 },
    ],
    saved: false,
    applicants: 12,
    spotsLeft: 3,
  },
  {
    id: "c2",
    brand: "AtlasBrand",
    brandColor: "#2563EB",
    brandIndustry: "Fashion & Apparel",
    country: "Morocco",
    title: "Summer Collection — Authentic Lookbooks",
    brief: "AtlasBrand is launching its SS24 collection and needs creators who embody an elevated Moroccan aesthetic. We want storytelling-first content — not flat product shots.",
    platforms: ["instagram"],
    budget: 3500,
    deadline: "8 juin 2024",
    matchScore: 88,
    status: "open",
    type: "paid",
    niche: "Fashion & Lifestyle",
    followerMin: 8000,
    engagementMin: 2.5,
    deliverables: ["3 Instagram Reels", "5 Instagram Stories", "1 lifestyle photo series (6 images)"],
    targetAudience: { gender: "All", ageRange: "22–38", location: "Morocco, UAE", niche: "Fashion & Lifestyle" },
    paymentModel: "Fixed fee · Escrow",
    milestones: ["100% on content approval"],
    requirements: ["8K+ followers", "2.5%+ engagement", "Fashion or Lifestyle content", "High-quality visual aesthetic"],
    matchReasons: [
      { label: "Engagement rate",     met: true,  detail: "Your 8.3% far exceeds 2.5% minimum",           weight: 30 },
      { label: "Content quality",     met: true,  detail: "Your Lifestyle aesthetic matches brand tone",    weight: 30 },
      { label: "Audience location",   met: true,  detail: "Morocco audience alignment",                     weight: 25 },
      { label: "Fashion content",     met: false, detail: "More Fashion posts would increase score",        weight: 15 },
    ],
    saved: true,
    applicants: 28,
    spotsLeft: 5,
  },
  {
    id: "c3",
    brand: "NovaBio",
    brandColor: "#10B981",
    brandIndustry: "Health & Wellness",
    country: "Morocco",
    title: "Wellness Reset — Creator Programme",
    brief: "NovaBio is a new plant-based supplement brand. We want creators who genuinely care about wellness to document a 14-day routine with our products — real results, real voice.",
    platforms: ["instagram", "youtube"],
    budget: 4200,
    deadline: "12 juin 2024",
    matchScore: 82,
    status: "open",
    type: "paid",
    niche: "Wellness & Nutrition",
    followerMin: 3000,
    engagementMin: 4,
    deliverables: ["1 YouTube vlog (10+ min)", "2 Instagram Reels", "7 Instagram Stories (diary format)"],
    targetAudience: { gender: "All", ageRange: "25–45", location: "Morocco, France, Belgium", niche: "Health & Wellness" },
    paymentModel: "Milestone-based · Escrow",
    milestones: ["30% on day 1", "70% on final content approval"],
    requirements: ["3K+ followers", "4%+ engagement", "Wellness or Health niche preferred", "No competing brand deals in past 3 months"],
    matchReasons: [
      { label: "Engagement rate",     met: true,  detail: "Your 8.3% well above 4% required",              weight: 35 },
      { label: "Audience demographics", met: true, detail: "Good age and location match",                  weight: 25 },
      { label: "Wellness content",    met: false, detail: "Limited wellness posts in recent content",       weight: 25 },
      { label: "YouTube channel",     met: false, detail: "Link YouTube to increase match score",           weight: 15 },
    ],
    saved: false,
    applicants: 19,
    spotsLeft: 4,
  },
  {
    id: "c4",
    brand: "VertMaroc",
    brandColor: "#059669",
    brandIndustry: "Sustainability",
    country: "Morocco",
    title: "Eco-Living Voices — Annual Campaign",
    brief: "We're building a year-long campaign with 8 creators who genuinely live sustainably. This is an ambassador role — not a one-off post. We want to co-create, not just sponsor.",
    platforms: ["instagram", "tiktok"],
    budget: 12000,
    deadline: "20 juin 2024",
    matchScore: 79,
    status: "open",
    type: "ambassador",
    niche: "Sustainability & Lifestyle",
    followerMin: 10000,
    engagementMin: 3.5,
    deliverables: ["Monthly Reels (12 over 1 year)", "Weekly Stories mentions", "1 annual YouTube feature"],
    targetAudience: { gender: "All", ageRange: "20–40", location: "Morocco", niche: "Eco-conscious consumers" },
    paymentModel: "Monthly retainer · Escrow",
    milestones: ["Monthly payment of 1 000 MAD", "Bonus on performance milestones"],
    requirements: ["10K+ followers", "3.5%+ engagement", "Sustainability or conscious lifestyle focus", "Clean content, no fast fashion brands"],
    matchReasons: [
      { label: "Engagement rate",     met: true,  detail: "Your 8.3% exceeds the 3.5% requirement",        weight: 30 },
      { label: "Audience size",       met: false, detail: "Your 98K > 10K requirement — great!",            weight: 20 },
      { label: "Eco content",         met: false, detail: "Limited eco/sustainability posts in your feed",  weight: 30 },
      { label: "Brand alignment",     met: true,  detail: "Lifestyle content fits brand direction",         weight: 20 },
    ],
    saved: false,
    applicants: 7,
    spotsLeft: 8,
  },
  {
    id: "c5",
    brand: "MarocTech",
    brandColor: "#7C3AED",
    brandIndustry: "Tech & Apps",
    country: "Morocco",
    title: "App Launch — #TechMa",
    brief: "MarocTech is launching a new productivity app built for Moroccan professionals. We need tech-forward creators who can explain features clearly and authentically, in Darija or French.",
    platforms: ["tiktok", "instagram"],
    budget: 2800,
    deadline: "15 juin 2024",
    matchScore: 71,
    status: "open",
    type: "paid",
    niche: "Tech & Productivity",
    followerMin: 5000,
    engagementMin: 3,
    deliverables: ["2 TikTok tutorial-style videos", "3 Instagram Stories with app screenshots", "1 Instagram Reel review"],
    targetAudience: { gender: "All", ageRange: "22–40", location: "Morocco", niche: "Professionals, Students, Tech users" },
    paymentModel: "Fixed fee",
    milestones: ["100% on delivery"],
    requirements: ["5K+ followers", "3%+ engagement", "Tech or productivity niche preferred"],
    matchReasons: [
      { label: "Engagement rate",     met: true,  detail: "Exceeds the 3% minimum comfortably",             weight: 30 },
      { label: "Audience location",   met: true,  detail: "Morocco audience well-aligned",                  weight: 30 },
      { label: "Tech/Productivity",   met: false, detail: "Your niche is Lifestyle, not Tech",               weight: 25 },
      { label: "Darija/French",       met: true,  detail: "Your content language matches their needs",       weight: 15 },
    ],
    saved: false,
    applicants: 31,
    spotsLeft: 2,
  },
  {
    id: "c6",
    brand: "Zara.ma",
    brandColor: "#1F2937",
    brandIndustry: "Fashion Retail",
    country: "Morocco",
    title: "Zara x Maroc Creators — Autumn Preview",
    brief: "Zara Morocco is partnering with 10 local creators for an early access autumn campaign. We want creators who can style our pieces and tell a personal story through fashion.",
    platforms: ["instagram"],
    budget: 7500,
    deadline: "30 juin 2024",
    matchScore: 84,
    status: "closing",
    type: "paid",
    niche: "Fashion & Style",
    followerMin: 20000,
    engagementMin: 2,
    deliverables: ["4 Instagram Reels", "1 Carousel post (8 images)", "Ongoing Instagram Stories coverage"],
    targetAudience: { gender: "Women", ageRange: "20–35", location: "Morocco", niche: "Fashion & Shopping" },
    paymentModel: "Fixed fee + product gift",
    milestones: ["50% + products on campaign start", "50% on content approval"],
    requirements: ["20K+ followers", "2%+ engagement", "Fashion or Lifestyle focus", "Strong visual storytelling"],
    matchReasons: [
      { label: "Engagement rate",     met: true,  detail: "Your 8.3% > 2% minimum — excellent",             weight: 30 },
      { label: "Visual aesthetic",    met: true,  detail: "Strong Lifestyle aesthetic matches Zara tone",    weight: 30 },
      { label: "Audience size",       met: true,  detail: "98K comfortably exceeds 20K minimum",             weight: 20 },
      { label: "Fashion content",     met: false, detail: "More dedicated fashion posts would boost score",  weight: 20 },
    ],
    saved: false,
    applicants: 64,
    spotsLeft: 1,
  },
];
