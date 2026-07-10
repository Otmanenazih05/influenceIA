export type FollowerTier = "nano" | "micro" | "macro";
export type Platform = "instagram" | "tiktok" | "youtube" | "facebook";

export interface PlatformStat {
  handle: string;
  followers: string;
  followersRaw: number;
  engagement: string;
  avgViews?: string;
  verified: boolean;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  color: string;
  gradient: [string, string];
  verified: boolean;
  location: string;
  country: string;
  niches: string[];
  bio: string;
  iaScore: number;
  platforms: Partial<Record<Platform, PlatformStat>>;
  primaryPlatform: Platform;
  followerTier: FollowerTier;
  totalFollowers: string;
  totalFollowersRaw: number;
  topEngagement: string;
  audienceDemographics: {
    genderSplit: { female: number; male: number };
    ageGroups: { label: string; pct: number }[];
    topLocations: { label: string; pct: number }[];
    languages: string[];
  };
  scoreBreakdown: { label: string; score: number; color: string }[];
  matchScore: number;
  pastCollabs: number;
  responseRate: number;
  completionRate: number;
  brandRating: number;
  saved: boolean;
  contentSamples: { bg: [string, string]; label: string }[];
}

export const creators: Creator[] = [
  {
    id: "cr1",
    name: "Sarah Benjelloun",
    handle: "@sarah_bj",
    avatar: "S", color: "#EC4899", gradient: ["#FCE7F3", "#EDE9FE"],
    verified: true,
    location: "Casablanca, Morocco", country: "Morocco",
    niches: ["Lifestyle", "Beauty & Skincare"],
    bio: "Lifestyle & beauty creator based in Casablanca. Sharing authentic skincare routines, fashion finds, and everyday city moments. Known for honest reviews and genuine audience connections.",
    iaScore: 87,
    platforms: {
      instagram: { handle: "@sarah_bj", followers: "98.4K", followersRaw: 98400, engagement: "8.3%", verified: true },
    },
    primaryPlatform: "instagram",
    followerTier: "micro",
    totalFollowers: "98.4K", totalFollowersRaw: 98400,
    topEngagement: "8.3%",
    audienceDemographics: {
      genderSplit: { female: 78, male: 22 },
      ageGroups: [{ label: "18–24", pct: 32 }, { label: "25–34", pct: 41 }, { label: "35–44", pct: 18 }, { label: "45+", pct: 9 }],
      topLocations: [{ label: "Morocco", pct: 73 }, { label: "France", pct: 12 }, { label: "Belgium", pct: 8 }, { label: "Other", pct: 7 }],
      languages: ["French", "Darija", "English"],
    },
    scoreBreakdown: [
      { label: "Engagement rate",      score: 9.2, color: "#10B981" },
      { label: "Audience authenticity", score: 8.7, color: "#2563EB" },
      { label: "Content consistency",  score: 8.0, color: "#7C3AED" },
      { label: "Platform coverage",    score: 6.5, color: "#F59E0B" },
      { label: "Campaign track record",score: 7.8, color: "#EC4899" },
    ],
    matchScore: 96, pastCollabs: 4, responseRate: 73, completionRate: 100, brandRating: 4.9,
    saved: false,
    contentSamples: [{ bg: ["#FCE7F3","#EDE9FE"], label: "Skincare routine" }, { bg: ["#DBEAFE","#EDE9FE"], label: "GRWM reel" }, { bg: ["#D1FAE5","#DBEAFE"], label: "Summer lookbook" }],
  },
  {
    id: "cr2",
    name: "Lina Zahra",
    handle: "@linaz.beauty",
    avatar: "L", color: "#7C3AED", gradient: ["#EDE9FE", "#DBEAFE"],
    verified: true,
    location: "Rabat, Morocco", country: "Morocco",
    niches: ["Beauty & Skincare", "Wellness"],
    bio: "Beauty and wellness creator focused on clean, natural products for North African skin tones. Dermatology-informed content with a warm, approachable style.",
    iaScore: 79,
    platforms: {
      instagram: { handle: "@linaz.beauty", followers: "67.2K", followersRaw: 67200, engagement: "6.1%", verified: true },
      tiktok:    { handle: "@linaz.beauty", followers: "28.1K", followersRaw: 28100, engagement: "7.4%", avgViews: "14K", verified: false },
    },
    primaryPlatform: "instagram",
    followerTier: "micro",
    totalFollowers: "95.3K", totalFollowersRaw: 95300,
    topEngagement: "7.4%",
    audienceDemographics: {
      genderSplit: { female: 84, male: 16 },
      ageGroups: [{ label: "18–24", pct: 38 }, { label: "25–34", pct: 39 }, { label: "35–44", pct: 16 }, { label: "45+", pct: 7 }],
      topLocations: [{ label: "Morocco", pct: 69 }, { label: "France", pct: 16 }, { label: "Algeria", pct: 7 }, { label: "Other", pct: 8 }],
      languages: ["French", "Darija"],
    },
    scoreBreakdown: [
      { label: "Engagement rate",      score: 8.1, color: "#10B981" },
      { label: "Audience authenticity", score: 8.2, color: "#2563EB" },
      { label: "Content consistency",  score: 7.6, color: "#7C3AED" },
      { label: "Platform coverage",    score: 7.8, color: "#F59E0B" },
      { label: "Campaign track record",score: 6.8, color: "#EC4899" },
    ],
    matchScore: 91, pastCollabs: 2, responseRate: 88, completionRate: 100, brandRating: 4.7,
    saved: false,
    contentSamples: [{ bg: ["#EDE9FE","#FCE7F3"], label: "Skincare review" }, { bg: ["#FEF3C7","#D1FAE5"], label: "Morning routine" }, { bg: ["#DBEAFE","#EDE9FE"], label: "Clean beauty" }],
  },
  {
    id: "cr3",
    name: "Amina Rifi",
    handle: "@amina.rifi",
    avatar: "A", color: "#2563EB", gradient: ["#DBEAFE", "#EDE9FE"],
    verified: true,
    location: "Casablanca, Morocco", country: "Morocco",
    niches: ["Fitness & Health", "Lifestyle"],
    bio: "Fitness and healthy lifestyle creator. Authentic workout content, nutrition tips, and wellness routines. Community of 24K highly engaged followers who trust her real-life fitness journey.",
    iaScore: 74,
    platforms: {
      instagram: { handle: "@amina.rifi", followers: "24.1K", followersRaw: 24100, engagement: "9.4%", verified: true },
      tiktok:    { handle: "@aminarifi.fit", followers: "11.8K", followersRaw: 11800, engagement: "11.2%", avgViews: "22K", verified: false },
    },
    primaryPlatform: "instagram",
    followerTier: "nano",
    totalFollowers: "35.9K", totalFollowersRaw: 35900,
    topEngagement: "11.2%",
    audienceDemographics: {
      genderSplit: { female: 62, male: 38 },
      ageGroups: [{ label: "18–24", pct: 44 }, { label: "25–34", pct: 36 }, { label: "35–44", pct: 14 }, { label: "45+", pct: 6 }],
      topLocations: [{ label: "Morocco", pct: 81 }, { label: "France", pct: 10 }, { label: "UAE", pct: 5 }, { label: "Other", pct: 4 }],
      languages: ["Darija", "French", "English"],
    },
    scoreBreakdown: [
      { label: "Engagement rate",      score: 9.6, color: "#10B981" },
      { label: "Audience authenticity", score: 8.8, color: "#2563EB" },
      { label: "Content consistency",  score: 7.2, color: "#7C3AED" },
      { label: "Platform coverage",    score: 7.5, color: "#F59E0B" },
      { label: "Campaign track record",score: 5.8, color: "#EC4899" },
    ],
    matchScore: 84, pastCollabs: 1, responseRate: 95, completionRate: 100, brandRating: 5.0,
    saved: true,
    contentSamples: [{ bg: ["#DBEAFE","#D1FAE5"], label: "Workout reel" }, { bg: ["#FEF3C7","#DBEAFE"], label: "Meal prep" }, { bg: ["#D1FAE5","#EDE9FE"], label: "Progress update" }],
  },
  {
    id: "cr4",
    name: "Yasmine Idrissi",
    handle: "@yas.beauty",
    avatar: "Y", color: "#6366F1", gradient: ["#EEF2FF", "#EDE9FE"],
    verified: true,
    location: "Fes, Morocco", country: "Morocco",
    niches: ["Beauty & Skincare", "Fashion & Style"],
    bio: "Beauty and fashion content creator from Fes. Known for authentic skincare reviews, tutorials, and style inspiration that blends Moroccan heritage with contemporary aesthetics.",
    iaScore: 72,
    platforms: {
      instagram: { handle: "@yas.beauty", followers: "31.4K", followersRaw: 31400, engagement: "5.6%", verified: true },
    },
    primaryPlatform: "instagram",
    followerTier: "micro",
    totalFollowers: "31.4K", totalFollowersRaw: 31400,
    topEngagement: "5.6%",
    audienceDemographics: {
      genderSplit: { female: 82, male: 18 },
      ageGroups: [{ label: "18–24", pct: 36 }, { label: "25–34", pct: 43 }, { label: "35–44", pct: 15 }, { label: "45+", pct: 6 }],
      topLocations: [{ label: "Morocco", pct: 77 }, { label: "France", pct: 14 }, { label: "Tunisia", pct: 4 }, { label: "Other", pct: 5 }],
      languages: ["French", "Darija"],
    },
    scoreBreakdown: [
      { label: "Engagement rate",      score: 7.4, color: "#10B981" },
      { label: "Audience authenticity", score: 7.8, color: "#2563EB" },
      { label: "Content consistency",  score: 7.5, color: "#7C3AED" },
      { label: "Platform coverage",    score: 5.5, color: "#F59E0B" },
      { label: "Campaign track record",score: 6.9, color: "#EC4899" },
    ],
    matchScore: 82, pastCollabs: 3, responseRate: 82, completionRate: 100, brandRating: 4.8,
    saved: false,
    contentSamples: [{ bg: ["#EEF2FF","#EDE9FE"], label: "Skincare tutorial" }, { bg: ["#FCE7F3","#FEF3C7"], label: "Outfit lookbook" }, { bg: ["#DBEAFE","#D1FAE5"], label: "Product review" }],
  },
  {
    id: "cr5",
    name: "Karim El Amrani",
    handle: "@karim.tech.ma",
    avatar: "K", color: "#0EA5E9", gradient: ["#E0F2FE", "#EDE9FE"],
    verified: true,
    location: "Casablanca, Morocco", country: "Morocco",
    niches: ["Tech & Productivity", "Education"],
    bio: "Tech and productivity creator building in public. App reviews, productivity systems, and digital tools for Moroccan professionals and students. French and Darija content.",
    iaScore: 81,
    platforms: {
      tiktok:    { handle: "@karim.tech.ma", followers: "142.3K", followersRaw: 142300, engagement: "4.8%", avgViews: "38K", verified: true },
      instagram: { handle: "@karim.tech.ma", followers: "28.7K",  followersRaw: 28700, engagement: "3.2%", verified: false },
      youtube:   { handle: "Karim Tech MA",  followers: "18.4K",  followersRaw: 18400, avgViews: "12K", engagement: "4.1%", verified: false },
    },
    primaryPlatform: "tiktok",
    followerTier: "macro",
    totalFollowers: "189.4K", totalFollowersRaw: 189400,
    topEngagement: "4.8%",
    audienceDemographics: {
      genderSplit: { female: 34, male: 66 },
      ageGroups: [{ label: "18–24", pct: 47 }, { label: "25–34", pct: 38 }, { label: "35–44", pct: 11 }, { label: "45+", pct: 4 }],
      topLocations: [{ label: "Morocco", pct: 68 }, { label: "France", pct: 18 }, { label: "Algeria", pct: 6 }, { label: "Other", pct: 8 }],
      languages: ["French", "Darija", "English"],
    },
    scoreBreakdown: [
      { label: "Engagement rate",      score: 7.9, color: "#10B981" },
      { label: "Audience authenticity", score: 8.4, color: "#2563EB" },
      { label: "Content consistency",  score: 8.8, color: "#7C3AED" },
      { label: "Platform coverage",    score: 9.2, color: "#F59E0B" },
      { label: "Campaign track record",score: 7.0, color: "#EC4899" },
    ],
    matchScore: 71, pastCollabs: 5, responseRate: 91, completionRate: 100, brandRating: 4.6,
    saved: false,
    contentSamples: [{ bg: ["#E0F2FE","#EDE9FE"], label: "App review" }, { bg: ["#DBEAFE","#D1FAE5"], label: "Productivity setup" }, { bg: ["#FEF3C7","#E0F2FE"], label: "Tech tip" }],
  },
  {
    id: "cr6",
    name: "Fatima Ouali",
    handle: "@fatima.wellness",
    avatar: "F", color: "#059669", gradient: ["#D1FAE5", "#DBEAFE"],
    verified: true,
    location: "Casablanca, Morocco", country: "Morocco",
    niches: ["Wellness & Nutrition", "Fitness & Health"],
    bio: "Wellness and nutrition creator focused on healthy, accessible living. Plant-based recipes, fitness routines, and mindfulness content for women in Morocco and the Francophone world.",
    iaScore: 77,
    platforms: {
      instagram: { handle: "@fatima.wellness", followers: "14.2K", followersRaw: 14200, engagement: "8.9%", verified: true },
      tiktok:    { handle: "@fatima.wellness", followers: "9.1K",  followersRaw: 9100, engagement: "10.2%", avgViews: "8K", verified: false },
    },
    primaryPlatform: "instagram",
    followerTier: "nano",
    totalFollowers: "23.3K", totalFollowersRaw: 23300,
    topEngagement: "10.2%",
    audienceDemographics: {
      genderSplit: { female: 81, male: 19 },
      ageGroups: [{ label: "18–24", pct: 29 }, { label: "25–34", pct: 46 }, { label: "35–44", pct: 18 }, { label: "45+", pct: 7 }],
      topLocations: [{ label: "Morocco", pct: 76 }, { label: "France", pct: 13 }, { label: "Belgium", pct: 5 }, { label: "Other", pct: 6 }],
      languages: ["French", "Darija"],
    },
    scoreBreakdown: [
      { label: "Engagement rate",      score: 9.1, color: "#10B981" },
      { label: "Audience authenticity", score: 8.5, color: "#2563EB" },
      { label: "Content consistency",  score: 7.4, color: "#7C3AED" },
      { label: "Platform coverage",    score: 7.2, color: "#F59E0B" },
      { label: "Campaign track record",score: 6.5, color: "#EC4899" },
    ],
    matchScore: 88, pastCollabs: 2, responseRate: 94, completionRate: 100, brandRating: 4.9,
    saved: true,
    contentSamples: [{ bg: ["#D1FAE5","#FEF3C7"], label: "Plant-based recipe" }, { bg: ["#DBEAFE","#D1FAE5"], label: "Wellness morning" }, { bg: ["#FEF3C7","#FCE7F3"], label: "Nutrition tips" }],
  },
  {
    id: "cr7",
    name: "Hana Benali",
    handle: "@hanabenali",
    avatar: "H", color: "#D97706", gradient: ["#FEF3C7", "#D1FAE5"],
    verified: false,
    location: "Marrakech, Morocco", country: "Morocco",
    niches: ["Lifestyle", "Home & Interior"],
    bio: "Home, lifestyle and travel creator from Marrakech. Aesthetic content celebrating Moroccan design, architecture, and daily life. Rising nano creator with exceptional engagement.",
    iaScore: 68,
    platforms: {
      instagram: { handle: "@hanabenali", followers: "18.3K", followersRaw: 18300, engagement: "7.8%", verified: false },
    },
    primaryPlatform: "instagram",
    followerTier: "nano",
    totalFollowers: "18.3K", totalFollowersRaw: 18300,
    topEngagement: "7.8%",
    audienceDemographics: {
      genderSplit: { female: 71, male: 29 },
      ageGroups: [{ label: "18–24", pct: 28 }, { label: "25–34", pct: 44 }, { label: "35–44", pct: 20 }, { label: "45+", pct: 8 }],
      topLocations: [{ label: "Morocco", pct: 82 }, { label: "France", pct: 10 }, { label: "Spain", pct: 4 }, { label: "Other", pct: 4 }],
      languages: ["French", "Darija", "Spanish"],
    },
    scoreBreakdown: [
      { label: "Engagement rate",      score: 8.2, color: "#10B981" },
      { label: "Audience authenticity", score: 7.9, color: "#2563EB" },
      { label: "Content consistency",  score: 6.8, color: "#7C3AED" },
      { label: "Platform coverage",    score: 4.5, color: "#F59E0B" },
      { label: "Campaign track record",score: 4.0, color: "#EC4899" },
    ],
    matchScore: 79, pastCollabs: 0, responseRate: 100, completionRate: 0, brandRating: 0,
    saved: false,
    contentSamples: [{ bg: ["#FEF3C7","#D1FAE5"], label: "Riad interior" }, { bg: ["#FEF3C7","#FCE7F3"], label: "Souk styling" }, { bg: ["#DBEAFE","#FEF3C7"], label: "Marrakech travel" }],
  },
  {
    id: "cr8",
    name: "Omar Tahri",
    handle: "@omar.sustainable",
    avatar: "O", color: "#16A34A", gradient: ["#DCFCE7", "#D1FAE5"],
    verified: true,
    location: "Casablanca, Morocco", country: "Morocco",
    niches: ["Sustainability", "Lifestyle"],
    bio: "Eco-conscious lifestyle creator advocating for sustainable living in Morocco. Zero-waste tips, conscious consumption, and environmental education. Trusted voice in the local eco community.",
    iaScore: 71,
    platforms: {
      instagram: { handle: "@omar.sustainable", followers: "22.8K", followersRaw: 22800, engagement: "6.4%", verified: true },
      youtube:   { handle: "Omar Sustainable",  followers: "8.2K",  followersRaw: 8200, avgViews: "4.1K", engagement: "5.2%", verified: false },
    },
    primaryPlatform: "instagram",
    followerTier: "nano",
    totalFollowers: "31.0K", totalFollowersRaw: 31000,
    topEngagement: "6.4%",
    audienceDemographics: {
      genderSplit: { female: 58, male: 42 },
      ageGroups: [{ label: "18–24", pct: 35 }, { label: "25–34", pct: 42 }, { label: "35–44", pct: 16 }, { label: "45+", pct: 7 }],
      topLocations: [{ label: "Morocco", pct: 74 }, { label: "France", pct: 14 }, { label: "Canada", pct: 6 }, { label: "Other", pct: 6 }],
      languages: ["French", "Darija", "English"],
    },
    scoreBreakdown: [
      { label: "Engagement rate",      score: 7.6, color: "#10B981" },
      { label: "Audience authenticity", score: 8.1, color: "#2563EB" },
      { label: "Content consistency",  score: 7.0, color: "#7C3AED" },
      { label: "Platform coverage",    score: 6.8, color: "#F59E0B" },
      { label: "Campaign track record",score: 6.2, color: "#EC4899" },
    ],
    matchScore: 76, pastCollabs: 2, responseRate: 87, completionRate: 100, brandRating: 4.7,
    saved: false,
    contentSamples: [{ bg: ["#DCFCE7","#D1FAE5"], label: "Zero-waste tips" }, { bg: ["#D1FAE5","#DBEAFE"], label: "Eco haul" }, { bg: ["#FEF3C7","#DCFCE7"], label: "Conscious living" }],
  },
];

export const brandPayments = {
  totalEscrowed: 42700,
  totalReleased: 16800,
  pendingApproval: 9200,
  availableBalance: 7600,
  campaigns: [
    { id: "bc1", title: "Summer Skincare Lancement", status: "active",    escrowed: 25000, released: 12500, pending: 5000,  creators: 5 },
    { id: "bc2", title: "Summer Collection SS24",    status: "active",    escrowed: 17500, released: 7000,  pending: 3500,  creators: 5 },
    { id: "bc3", title: "Wellness Reset Programme",  status: "reviewing", escrowed: 0,     released: 0,     pending: 0,     creators: 0 },
    { id: "bc4", title: "App Launch — #TechMa",     status: "completed", escrowed: 14000, released: 14000, pending: 0,     creators: 5 },
  ],
  transactions: [
    { id: "t1", date: "17 mai 2024", campaign: "App Launch — #TechMa",     creator: "Karim El Amrani",  type: "payment_released", amount: 2800, status: "completed", note: "Final payment on content approval" },
    { id: "t2", date: "16 mai 2024", campaign: "App Launch — #TechMa",     creator: "Fatima Ouali",     type: "payment_released", amount: 2800, status: "completed", note: "Final payment on content approval" },
    { id: "t3", date: "10 mai 2024", campaign: "Summer Skincare Lancement", creator: "Sarah Benjelloun", type: "escrow_funded",    amount: 5000, status: "pending",   note: "Escrow funded · Pending content approval" },
    { id: "t4", date: "8 mai 2024",  campaign: "Summer Skincare Lancement", creator: "All creators",     type: "escrow_funded",    amount: 25000, status: "pending",  note: "Full campaign escrow funded" },
    { id: "t5", date: "5 mai 2024",  campaign: "Summer Collection SS24",    creator: "Yasmine Idrissi",  type: "payment_released", amount: 3500, status: "completed", note: "Contract signing milestone" },
    { id: "t6", date: "2 mai 2024",  campaign: "Summer Skincare Lancement", creator: "Fatima Ouali",     type: "payment_released", amount: 2500, status: "completed", note: "First milestone: contract signing" },
    { id: "t7", date: "28 avr 2024", campaign: "App Launch — #TechMa",     creator: "All creators",     type: "invoice",          amount: 14000,status: "completed", note: "Campaign invoice settled" },
  ],
};

export const brandConversations = [
  {
    id: "mc1", creator: "Sarah Benjelloun", creatorColor: "#EC4899", creatorHandle: "@sarah_bj",
    campaign: "Summer Skincare Lancement", campaignId: "bc1",
    lastMessage: "Of course! I'll reshoot this afternoon with natural window light…",
    lastTime: "28 mai · 10:02", unread: 0,
    messages: [
      { id: 1, role: "brand",   text: "Hi Sarah! We've reviewed your first reel submission.", time: "28 mai · 08:52", read: true },
      { id: 2, role: "brand",   text: "Reel #2 is approved — great work! But Reel #1 needs a fix: the lighting in the first 10 seconds makes the product look darker than it is. Could you reshoot that opening?", time: "28 mai · 09:14", read: true },
      { id: 3, role: "creator", text: "Of course! I'll reshoot this afternoon with the natural window light and resubmit by end of day today.", time: "28 mai · 10:02", read: true },
      { id: 4, role: "brand",   text: "Perfect, thanks! Once Reel #1 is approved we'll release the second payment milestone (2 500 MAD).", time: "28 mai · 10:15", read: true },
    ],
  },
  {
    id: "mc2", creator: "Yasmine Idrissi", creatorColor: "#6366F1", creatorHandle: "@yas.beauty",
    campaign: "Summer Skincare Lancement", campaignId: "bc1",
    lastMessage: "I've uploaded Reel #1 to the link in the brief. Let me know your thoughts!",
    lastTime: "28 mai · 09:10", unread: 1,
    messages: [
      { id: 1, role: "brand",   text: "Hi Yasmine! We're so excited you're part of the Skincare Lancement campaign. Quick reminder — your submission deadline is 1 June.", time: "26 mai · 11:00", read: true },
      { id: 2, role: "creator", text: "Hi! Yes, I'm working on it — filming this week. The brief is super clear, thank you!", time: "26 mai · 13:22", read: true },
      { id: 3, role: "creator", text: "I've uploaded Reel #1 to the link in the brief. Let me know your thoughts!", time: "28 mai · 09:10", read: false },
    ],
  },
  {
    id: "mc3", creator: "Lina Zahra", creatorColor: "#7C3AED", creatorHandle: "@linaz.beauty",
    campaign: "Summer Collection SS24", campaignId: "bc2",
    lastMessage: "Does Thursday at 3pm work for a briefing call?",
    lastTime: "21 mai · 14:30", unread: 2,
    messages: [
      { id: 1, role: "brand",   text: "Hi Lina! We're thrilled to have you on the SS24 campaign. Your profile is a perfect fit for our aesthetic.", time: "21 mai · 11:02", read: true },
      { id: 2, role: "brand",   text: "We'd love to jump on a briefing call to align on the visual direction before you start filming.", time: "21 mai · 14:28", read: true },
      { id: 3, role: "brand",   text: "Does Thursday at 3pm work for a briefing call?", time: "21 mai · 14:30", read: false },
    ],
  },
  {
    id: "mc4", creator: "Amina Rifi", creatorColor: "#2563EB", creatorHandle: "@amina.rifi",
    campaign: "Summer Skincare Lancement", campaignId: "bc1",
    lastMessage: "Thank you for your application! We've added you to our shortlist.",
    lastTime: "25 mai · 10:00", unread: 0,
    messages: [
      { id: 1, role: "brand",   text: "Hi Amina! Thank you for your application to the Summer Skincare Lancement campaign.", time: "25 mai · 10:00", read: true },
      { id: 2, role: "brand",   text: "We've added you to our shortlist and will be in touch within 48 hours with a final decision.", time: "25 mai · 10:01", read: true },
      { id: 3, role: "creator", text: "Thank you so much! Really excited about this opportunity. Looking forward to hearing from you!", time: "25 mai · 11:14", read: true },
    ],
  },
];
