<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\BrandProfile;
use App\Models\InfluencerProfile;
use App\Models\SocialAccount;
use App\Models\Campaign;
use App\Models\CampaignApplication;
use App\Models\ContentSubmission;
use App\Models\Payment;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\MarketplaceListing;
use App\Models\MarketplaceRequest;
use App\Enums\UserRole;
use App\Enums\CampaignType;
use App\Enums\PaymentModel;
use App\Enums\FollowerTier;
use App\Enums\CampaignStatus;
use App\Enums\ApplicationStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // 1. Static Brand Accounts
        $brandData = [
            [
                'name' => 'Pacocha Inc',
                'email' => 'brand0@example.com',
                'industry' => 'Beauty & Cosmetics',
                'website' => 'https://pacocha.com',
                'description' => 'A clean and organic skincare brand focused on natural beauty and eco-friendly packaging.',
                'city' => 'Casablanca',
                'country' => 'Morocco'
            ],
            [
                'name' => 'Somora Beauty',
                'email' => 'brand1@example.com',
                'industry' => 'Beauty & Cosmetics',
                'website' => 'https://somorabeauty.ma',
                'description' => 'Moroccan luxury beauty brand bringing traditional ingredients into modern skincare.',
                'city' => 'Marrakech',
                'country' => 'Morocco'
            ],
            [
                'name' => 'Atlas Apparel',
                'email' => 'brand2@example.com',
                'industry' => 'Fashion & Apparel',
                'website' => 'https://atlasapparel.co',
                'description' => 'Modern lifestyle and streetwear brand inspired by North African designs.',
                'city' => 'Rabat',
                'country' => 'Morocco'
            ],
            [
                'name' => 'FitPulse Morocco',
                'email' => 'brand3@example.com',
                'industry' => 'Health & Fitness',
                'website' => 'https://fitpulse.ma',
                'description' => 'Leading fitness equipment and food supplements brand promoting a healthy lifestyle.',
                'city' => 'Casablanca',
                'country' => 'Morocco'
            ],
            [
                'name' => 'VeloTech',
                'email' => 'brand4@example.com',
                'industry' => 'Tech & Gadgets',
                'website' => 'https://velotech.ma',
                'description' => 'Innovative tech startup creating gadgets and smart devices for modern home automation.',
                'city' => 'Tangier',
                'country' => 'Morocco'
            ],
            [
                'name' => 'BioMorocco',
                'email' => 'brand5@example.com',
                'industry' => 'Food & Beverage',
                'website' => 'https://biomorocco.ma',
                'description' => 'Organic and local food cooperative delivering farm-fresh produce across major cities.',
                'city' => 'Agadir',
                'country' => 'Morocco'
            ]
        ];

        $brands = [];
        foreach ($brandData as $data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make('password'),
                'role' => UserRole::Brand
            ]);

            $brands[] = BrandProfile::create([
                'user_id' => $user->id,
                'company_name' => $data['name'],
                'contact_name' => $data['name'] . ' Representative',
                'industry' => $data['industry'],
                'website' => $data['website'],
                'phone' => '+212 600000' . rand(10, 99),
                'city' => $data['city'],
                'country' => $data['country'],
                'description' => $data['description']
            ]);
        }

        // 2. Static Influencer Accounts
        $influencerData = [
            [
                'name' => 'Lysanne Kuhn',
                'email' => 'influencer0@example.com',
                'bio' => 'Skincare enthusiast and beauty creator. Sharing my daily glow routines and honest reviews.',
                'niches' => ['Beauty & Cosmetics', 'Lifestyle'],
                'city' => 'Casablanca',
                'country' => 'Morocco',
                'gender' => 'female',
                'followers' => 12500,
                'er' => 4.5,
                'ai_score' => 92
            ],
            [
                'name' => 'Millie Klocko',
                'email' => 'influencer1@example.com',
                'bio' => 'Fashion designer & daily style inspiration. Moroccan vibes with a modern touch.',
                'niches' => ['Fashion & Style', 'Lifestyle'],
                'city' => 'Rabat',
                'country' => 'Morocco',
                'gender' => 'female',
                'followers' => 48200,
                'er' => 3.8,
                'ai_score' => 88
            ],
            [
                'name' => 'Yasmine El Fassi',
                'email' => 'influencer2@example.com',
                'bio' => 'Lifestyle blogger and foodie. Discovering the best spots and cooking healthy recipes.',
                'niches' => ['Food & Beverage', 'Travel & Lifestyle'],
                'city' => 'Marrakech',
                'country' => 'Morocco',
                'gender' => 'female',
                'followers' => 9500,
                'er' => 6.2,
                'ai_score' => 95
            ],
            [
                'name' => 'Amine Bennani',
                'email' => 'influencer3@example.com',
                'bio' => 'Tech reviewer and gadgets geek. Making tech simple and fun for everyone.',
                'niches' => ['Tech & Gadgets'],
                'city' => 'Casablanca',
                'country' => 'Morocco',
                'gender' => 'male',
                'followers' => 75000,
                'er' => 2.9,
                'ai_score' => 85
            ],
            [
                'name' => 'Sarah Chraibi',
                'email' => 'influencer4@example.com',
                'bio' => 'Fitness coach and wellness advocate. Let\'s build a stronger and healthier version of you.',
                'niches' => ['Health & Fitness'],
                'city' => 'Tangier',
                'country' => 'Morocco',
                'gender' => 'female',
                'followers' => 22000,
                'er' => 5.1,
                'ai_score' => 90
            ],
            [
                'name' => 'Mehdi Sadiki',
                'email' => 'influencer5@example.com',
                'bio' => 'Travel photographer exploring hidden gems in Morocco and around the world.',
                'niches' => ['Travel & Lifestyle'],
                'city' => 'Fez',
                'country' => 'Morocco',
                'gender' => 'male',
                'followers' => 110000,
                'er' => 2.4,
                'ai_score' => 87
            ],
            [
                'name' => 'Sofia Alaoui',
                'email' => 'influencer6@example.com',
                'bio' => 'Make-up artist and beauty educator. Creative looks and step-by-step tutorials.',
                'niches' => ['Beauty & Cosmetics', 'Fashion & Apparel'],
                'city' => 'Casablanca',
                'country' => 'Morocco',
                'gender' => 'female',
                'followers' => 35000,
                'er' => 4.2,
                'ai_score' => 89
            ],
            [
                'name' => 'Zineb Mansouri',
                'email' => 'influencer7@example.com',
                'bio' => 'Self-care, wellness, and cozy lifestyle. Join my journey to mindful living.',
                'niches' => ['Lifestyle', 'Health & Fitness'],
                'city' => 'Rabat',
                'country' => 'Morocco',
                'gender' => 'female',
                'followers' => 8200,
                'er' => 7.8,
                'ai_score' => 94
            ],
            [
                'name' => 'Omar Tazi',
                'email' => 'influencer8@example.com',
                'bio' => 'Urban fashion and lifestyle. Street style inspiration for the modern gentleman.',
                'niches' => ['Fashion & Apparel', 'Lifestyle'],
                'city' => 'Casablanca',
                'country' => 'Morocco',
                'gender' => 'male',
                'followers' => 18500,
                'er' => 4.9,
                'ai_score' => 91
            ],
            [
                'name' => 'Lina Naciri',
                'email' => 'influencer9@example.com',
                'bio' => 'Healthy recipes, meal preps, and organic food lover. Sharing easy daily cooking ideas.',
                'niches' => ['Food & Beverage', 'Lifestyle'],
                'city' => 'Agadir',
                'country' => 'Morocco',
                'gender' => 'female',
                'followers' => 14000,
                'er' => 5.4,
                'ai_score' => 93
            ]
        ];

        $influencers = [];
        foreach ($influencerData as $data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make('password'),
                'role' => UserRole::Influencer
            ]);

            $profile = InfluencerProfile::create([
                'user_id' => $user->id,
                'full_name' => $data['name'],
                'bio' => $data['bio'],
                'niches' => $data['niches'],
                'city' => $data['city'],
                'country' => $data['country'],
                'gender' => $data['gender'],
                'ai_score' => $data['ai_score'],
                'age_confirmed' => true,
                'terms_accepted' => true
            ]);

            SocialAccount::create([
                'influencer_profile_id' => $profile->id,
                'platform' => 'instagram',
                'handle' => '@' . Str::slug($data['name'], '_'),
                'profile_url' => 'https://instagram.com/' . Str::slug($data['name'], '_'),
                'followers_count' => $data['followers'],
                'engagement_rate' => $data['er'],
                'verified' => true
            ]);

            SocialAccount::create([
                'influencer_profile_id' => $profile->id,
                'platform' => 'tiktok',
                'handle' => '@' . Str::slug($data['name'], '_') . '_official',
                'profile_url' => 'https://tiktok.com/@' . Str::slug($data['name'], '_'),
                'followers_count' => round($data['followers'] * 1.5),
                'engagement_rate' => round($data['er'] * 1.2, 2),
                'verified' => true
            ]);

            $influencers[] = $profile;
        }

        // Helper maps for clean links
        // Brands list
        $pacocha = $brands[0]; // brand0
        $somora = $brands[1];  // brand1
        $atlas = $brands[2];   // brand2
        $fitpulse = $brands[3]; // brand3

        // Creators list
        $lysanne = $influencers[0];
        $millie = $influencers[1];
        $yasmine = $influencers[2];
        $amine = $influencers[3];
        $sarah = $influencers[4];
        $mehdi = $influencers[5];
        $sofia = $influencers[6];
        $zineb = $influencers[7];

        // 3. Campaigns - Realistic, Static Campaigns with matching details
        $campaignList = [
            // --- Pacocha Inc ---
            [
                'brand_profile_id' => $pacocha->id,
                'title' => 'Multi-layered disintermediate portal Campaign',
                'brief' => 'Promote our new multi-layered organic moisturizing cream. Highlight the benefits of natural ingredients for summer skincare.',
                'campaign_type' => CampaignType::Gifted,
                'payment_model' => PaymentModel::Gifted,
                'budget' => 3000,
                'platforms' => ['instagram', 'tiktok'],
                'niches' => ['Beauty & Cosmetics', 'Lifestyle'],
                'follower_tier' => FollowerTier::Micro,
                'min_followers' => 5000,
                'min_engagement_rate' => 3.0,
                'target_countries' => ['Morocco'],
                'target_gender' => 'all',
                'deliverables' => ['1 Instagram Reel', '2 Instagram Stories'],
                'application_deadline' => now()->subDays(6),
                'submission_deadline' => now()->addDays(21),
                'publication_date' => now()->addDays(25),
                'campaign_end' => now()->addDays(30),
                'spots_total' => 7,
                'spots_filled' => 1,
                'status' => CampaignStatus::Active,
                // Applications: 4 applicants, 1 accepted, 1 submitted
                'applicants' => [
                    ['creator' => $lysanne, 'status' => ApplicationStatus::Accepted, 'submission_status' => 'submitted', 'payment_status' => 'pending'],
                    ['creator' => $yasmine, 'status' => ApplicationStatus::Pending],
                    ['creator' => $sofia, 'status' => ApplicationStatus::Shortlisted],
                    ['creator' => $zineb, 'status' => ApplicationStatus::Rejected],
                ]
            ],
            [
                'brand_profile_id' => $pacocha->id,
                'title' => 'Hydration Hero Product Launch',
                'brief' => 'Launch of the Hydration Hero skin booster serum. Showcase the daily glow and instant absorption properties.',
                'campaign_type' => CampaignType::Paid,
                'payment_model' => PaymentModel::Fixed,
                'budget' => 15000,
                'platforms' => ['instagram'],
                'niches' => ['Beauty & Cosmetics'],
                'follower_tier' => FollowerTier::Any,
                'min_followers' => 10000,
                'min_engagement_rate' => 2.5,
                'target_countries' => ['Morocco', 'France'],
                'target_gender' => 'female',
                'deliverables' => ['1 Feed Post', '1 Video Story'],
                'application_deadline' => now()->addDays(10),
                'submission_deadline' => now()->addDays(30),
                'publication_date' => now()->addDays(35),
                'campaign_end' => now()->addDays(40),
                'spots_total' => 5,
                'spots_filled' => 1,
                'status' => CampaignStatus::Active,
                // Applications: 3 applicants, 1 accepted, 1 in revision
                'applicants' => [
                    ['creator' => $millie, 'status' => ApplicationStatus::Accepted, 'submission_status' => 'revision', 'payment_status' => 'pending'],
                    ['creator' => $lysanne, 'status' => ApplicationStatus::Pending],
                    ['creator' => $yasmine, 'status' => ApplicationStatus::Pending],
                ]
            ],
            [
                'brand_profile_id' => $pacocha->id,
                'title' => 'Winter Glow Serum Campaign',
                'brief' => 'Winter hydration booster campaign. Seeking content creators to share night skincare routine routines.',
                'campaign_type' => CampaignType::Paid,
                'payment_model' => PaymentModel::Milestone,
                'budget' => 24000,
                'platforms' => ['tiktok'],
                'niches' => ['Beauty & Cosmetics', 'Lifestyle'],
                'follower_tier' => FollowerTier::Micro,
                'min_followers' => 10000,
                'min_engagement_rate' => 3.5,
                'target_countries' => ['Morocco'],
                'target_gender' => 'all',
                'deliverables' => ['2 TikTok Videos'],
                'application_deadline' => now()->addDays(20),
                'submission_deadline' => now()->addDays(45),
                'publication_date' => now()->addDays(50),
                'campaign_end' => now()->addDays(60),
                'spots_total' => 8,
                'spots_filled' => 0,
                'status' => CampaignStatus::Draft,
                'applicants' => []
            ],
            [
                'brand_profile_id' => $pacocha->id,
                'title' => 'Anti-Aging Night Routine',
                'brief' => 'Covers our classic anti-aging night routine kit. Demonstrating the 3-step application before sleep.',
                'campaign_type' => CampaignType::Paid,
                'payment_model' => PaymentModel::Fixed,
                'budget' => 32000,
                'platforms' => ['instagram', 'tiktok'],
                'niches' => ['Beauty & Cosmetics'],
                'follower_tier' => FollowerTier::Micro,
                'min_followers' => 5000,
                'min_engagement_rate' => 4.0,
                'target_countries' => ['Morocco'],
                'target_gender' => 'female',
                'deliverables' => ['1 Instagram Reel', '1 TikTok Video'],
                'application_deadline' => now()->subDays(20),
                'submission_deadline' => now()->subDays(5),
                'publication_date' => now()->subDays(2),
                'campaign_end' => now()->addDays(10),
                'spots_total' => 4,
                'spots_filled' => 4,
                'status' => CampaignStatus::Completed,
                // Applications: 4/4 spots filled, all completed and paid
                'applicants' => [
                    ['creator' => $lysanne, 'status' => ApplicationStatus::Accepted, 'submission_status' => 'approved', 'payment_status' => 'released'],
                    ['creator' => $sofia, 'status' => ApplicationStatus::Accepted, 'submission_status' => 'approved', 'payment_status' => 'released'],
                    ['creator' => $sarah, 'status' => ApplicationStatus::Accepted, 'submission_status' => 'approved', 'payment_status' => 'released'],
                    ['creator' => $zineb, 'status' => ApplicationStatus::Accepted, 'submission_status' => 'approved', 'payment_status' => 'released'],
                ]
            ],

            // --- Somora Beauty ---
            [
                'brand_profile_id' => $somora->id,
                'title' => 'Traditional Argan Oil Glow',
                'brief' => 'Highlight the beauty of pure Moroccan Argan Oil in skincare. Traditional heritage with modern aesthetics.',
                'campaign_type' => CampaignType::Paid,
                'payment_model' => PaymentModel::Fixed,
                'budget' => 12000,
                'platforms' => ['instagram'],
                'niches' => ['Beauty & Cosmetics', 'Lifestyle'],
                'follower_tier' => FollowerTier::Nano,
                'min_followers' => 2000,
                'min_engagement_rate' => 4.0,
                'target_countries' => ['Morocco', 'UAE'],
                'target_gender' => 'all',
                'deliverables' => ['1 Carousel Post', '2 Stories'],
                'application_deadline' => now()->addDays(12),
                'submission_deadline' => now()->addDays(28),
                'publication_date' => now()->addDays(32),
                'campaign_end' => now()->addDays(40),
                'spots_total' => 6,
                'spots_filled' => 1,
                'status' => CampaignStatus::Active,
                'applicants' => [
                    ['creator' => $lysanne, 'status' => ApplicationStatus::Accepted, 'submission_status' => 'approved', 'payment_status' => 'in_escrow'],
                    ['creator' => $millie, 'status' => ApplicationStatus::Pending],
                ]
            ],

            // --- Atlas Apparel ---
            [
                'brand_profile_id' => $atlas->id,
                'title' => 'Minimalist Fall Streetwear',
                'brief' => 'Showcasing our new minimalist fall hoodies and cargo pants. Focus on urban locations and casual style.',
                'campaign_type' => CampaignType::Paid,
                'payment_model' => PaymentModel::Fixed,
                'budget' => 20000,
                'platforms' => ['instagram', 'tiktok'],
                'niches' => ['Fashion & Style', 'Lifestyle'],
                'follower_tier' => FollowerTier::Micro,
                'min_followers' => 10000,
                'min_engagement_rate' => 3.0,
                'target_countries' => ['Morocco'],
                'target_gender' => 'all',
                'deliverables' => ['1 Reel / Video Outfit of the Day'],
                'application_deadline' => now()->addDays(15),
                'submission_deadline' => now()->addDays(35),
                'publication_date' => now()->addDays(40),
                'campaign_end' => now()->addDays(45),
                'spots_total' => 5,
                'spots_filled' => 1,
                'status' => CampaignStatus::Active,
                'applicants' => [
                    ['creator' => $millie, 'status' => ApplicationStatus::Accepted, 'submission_status' => 'submitted', 'payment_status' => 'in_escrow'],
                    ['creator' => $sofia, 'status' => ApplicationStatus::Pending],
                ]
            ],

            // --- FitPulse Morocco ---
            [
                'brand_profile_id' => $fitpulse->id,
                'title' => 'FitPulse Supplement Review',
                'brief' => 'Seeking fitness creators to review our new organic isolate whey protein.',
                'campaign_type' => CampaignType::Paid,
                'payment_model' => PaymentModel::Fixed,
                'budget' => 8000,
                'platforms' => ['instagram'],
                'niches' => ['Health & Fitness'],
                'follower_tier' => FollowerTier::Micro,
                'min_followers' => 5000,
                'min_engagement_rate' => 3.0,
                'target_countries' => ['Morocco'],
                'target_gender' => 'all',
                'deliverables' => ['1 Post', '1 Story review'],
                'application_deadline' => now()->addDays(10),
                'submission_deadline' => now()->addDays(20),
                'publication_date' => now()->addDays(25),
                'campaign_end' => now()->addDays(30),
                'spots_total' => 4,
                'spots_filled' => 1,
                'status' => CampaignStatus::Active,
                'applicants' => [
                    ['creator' => $sarah, 'status' => ApplicationStatus::Accepted, 'submission_status' => 'approved', 'payment_status' => 'released'],
                ]
            ]
        ];

        // Seed Campaigns & Applications & Submissions & Payments
        foreach ($campaignList as $cData) {
            $campaign = Campaign::create([
                'brand_profile_id' => $cData['brand_profile_id'],
                'title' => $cData['title'],
                'brief' => $cData['brief'],
                'campaign_type' => $cData['campaign_type'],
                'payment_model' => $cData['payment_model'],
                'budget' => $cData['budget'],
                'platforms' => $cData['platforms'],
                'niches' => $cData['niches'],
                'follower_tier' => $cData['follower_tier'],
                'min_followers' => $cData['min_followers'],
                'min_engagement_rate' => $cData['min_engagement_rate'],
                'target_countries' => $cData['target_countries'],
                'target_gender' => $cData['target_gender'],
                'deliverables' => $cData['deliverables'],
                'application_deadline' => $cData['application_deadline'],
                'submission_deadline' => $cData['submission_deadline'],
                'publication_date' => $cData['publication_date'],
                'campaign_end' => $cData['campaign_end'],
                'spots_total' => $cData['spots_total'],
                'spots_filled' => $cData['spots_filled'],
                'status' => $cData['status']
            ]);

            // Seed applications for this campaign
            foreach ($cData['applicants'] as $appData) {
                $creator = $appData['creator'];
                $app = CampaignApplication::create([
                    'campaign_id' => $campaign->id,
                    'influencer_profile_id' => $creator->id,
                    'status' => $appData['status'],
                    'cover_message' => "I would love to participate in this campaign! As a creator in the " . implode(', ', $creator->niches) . " niche, I feel this aligns perfectly with my audience and values.",
                    'match_score' => rand(80, 98),
                    'applied_at' => now()->subDays(10),
                    'accepted_at' => in_array($appData['status'], [ApplicationStatus::Accepted]) ? now()->subDays(8) : null,
                ]);

                // Seed submissions
                if (in_array($appData['status'], [ApplicationStatus::Accepted]) && isset($appData['submission_status'])) {
                    $sub = ContentSubmission::create([
                        'campaign_application_id' => $app->id,
                        'deliverable_label' => $campaign->deliverables[0] ?? '1 Post',
                        'status' => $appData['submission_status'],
                        'content_url' => 'https://instagram.com/p/' . Str::random(10),
                        'revision_note' => $appData['submission_status'] === 'revision' ? 'Please make sure our logo is clearly visible in the first 3 seconds of the reel.' : null,
                        'submitted_at' => now()->subDays(5),
                        'reviewed_at' => in_array($appData['submission_status'], ['approved', 'revision']) ? now()->subDays(4) : null,
                    ]);

                    // Seed payments
                    if ($campaign->campaign_type === CampaignType::Paid && isset($appData['payment_status'])) {
                        Payment::create([
                            'campaign_application_id' => $app->id,
                            'amount' => round($campaign->budget / $campaign->spots_total, 2),
                            'status' => $appData['payment_status'],
                            'transaction_ref' => 'txn_' . Str::random(12),
                            'escrowed_at' => in_array($appData['payment_status'], ['in_escrow', 'released']) ? now()->subDays(8) : null,
                            'released_at' => $appData['payment_status'] === 'released' ? now()->subDays(3) : null,
                        ]);
                    }
                }
            }
        }

        // 4. Marketplace - Static, Clean Listings & Requests
        $marketplaceList = [
            [
                'brand_profile_id' => $pacocha->id,
                'title' => 'Skincare Glow Kit Review',
                'description' => 'Receive a free package of our top-selling organic serum and skin glow kit. Post an unboxing and review reel on Instagram.',
                'category' => 'Product Review',
                'platforms' => ['instagram'],
                'image_url' => 'https://picsum.photos/400/300?random=1',
                'what_influencer_receives' => ['Free Skincare Glow Kit (worth 600 MAD)', 'Exclusive coupon code for followers'],
                'expected_content' => ['1 Instagram Reel (honest review)'],
                'availability' => 'available'
            ],
            [
                'brand_profile_id' => $somora->id,
                'title' => 'Argan Serum Trial & Feedback',
                'description' => 'Test our heritage argan hair serum. Share your 7-day progress and results with your audience.',
                'category' => 'Product Trial',
                'platforms' => ['instagram'],
                'image_url' => 'https://picsum.photos/400/300?random=2',
                'what_influencer_receives' => ['3 Bottles of Pure Argan Serum', 'Free gift bag'],
                'expected_content' => ['3 Instagram Stories displaying progress'],
                'availability' => 'available'
            ]
        ];

        foreach ($marketplaceList as $lData) {
            $listing = MarketplaceListing::create($lData);

            // Add static request
            MarketplaceRequest::create([
                'marketplace_listing_id' => $listing->id,
                'influencer_profile_id' => $lysanne->id,
                'status' => 'requested',
                'message' => 'I would love to review this kit. I focus a lot on organic skincare products!'
            ]);
        }

        // 5. Conversations & Message Histories - Matching Campaign context and logical text messages
        $dbCampaigns = Campaign::all();
        $pacochaMoisturizer = $dbCampaigns->where('title', 'Multi-layered disintermediate portal Campaign')->first();
        $pacochaHero = $dbCampaigns->where('title', 'Hydration Hero Product Launch')->first();
        $somoraArgan = $dbCampaigns->where('title', 'Traditional Argan Oil Glow')->first();

        $convoData = [
            // Pacocha Inc chat with Lysanne on Summer Moisturizer Campaign (Accepted, submitted submission)
            [
                'brand_profile_id' => $pacocha->id,
                'influencer_profile_id' => $lysanne->id,
                'campaign_id' => $pacochaMoisturizer->id,
                'messages' => [
                    ['sender_role' => 'brand', 'body' => 'Hi Lysanne! We loved your application and profile. Welcome to the campaign!'],
                    ['sender_role' => 'creator', 'body' => 'Thank you so much! I am thrilled to work with Somora/Pacocha. I\'ll get started on the video outline.'],
                    ['sender_role' => 'brand', 'body' => 'Perfect. Remember to highlight the organic hydration benefits and use daylight for shooting.'],
                    ['sender_role' => 'creator', 'body' => 'Got it! I\'ve just submitted my draft reel link for review. Let me know what you think!'],
                ]
            ],
            // Pacocha Inc chat with Millie on Hydration Hero Campaign (Accepted, revision submission)
            [
                'brand_profile_id' => $pacocha->id,
                'influencer_profile_id' => $millie->id,
                'campaign_id' => $pacochaHero->id,
                'messages' => [
                    ['sender_role' => 'brand', 'body' => 'Hello Millie! Your fashion and styling match our aesthetic perfectly. Excited to partner.'],
                    ['sender_role' => 'creator', 'body' => 'Hi! Thanks for having me. Can\'t wait to incorporate the skin booster serum into my morning styling vlog.'],
                    ['sender_role' => 'creator', 'body' => 'I have just uploaded the video submission! Let me know if everything is good.'],
                    ['sender_role' => 'brand', 'body' => 'Thanks Millie! It looks stunning, but could you please make the logo visibility clearer at the beginning? I\'ve sent it back for a quick revision.'],
                ]
            ],
            // Pacocha Inc chat with Yasmine (Pending applicant, no campaign selected yet / general thread)
            [
                'brand_profile_id' => $pacocha->id,
                'influencer_profile_id' => $yasmine->id,
                'campaign_id' => null,
                'messages' => [
                    ['sender_role' => 'creator', 'body' => 'Hi Pacocha team! I sent an application for your new launch. Let me know if you need any audience stats.'],
                    ['sender_role' => 'brand', 'body' => 'Hi Yasmine! Thanks for reaching out. We are reviewing applications this week and will get back to you shortly.'],
                ]
            ],
            // Somora Beauty chat with Lysanne (Traditional Argan Campaign)
            [
                'brand_profile_id' => $somora->id,
                'influencer_profile_id' => $lysanne->id,
                'campaign_id' => $somoraArgan->id,
                'messages' => [
                    ['sender_role' => 'brand', 'body' => 'Hi Lysanne! Welcome to our Argan Oil Glow campaign. We look forward to seeing your review.'],
                    ['sender_role' => 'creator', 'body' => 'Thank you! The product arrived and the packaging is beautiful. I will post tomorrow!'],
                    ['sender_role' => 'brand', 'body' => 'That is wonderful to hear. The payment is held in escrow and will release as soon as you post!'],
                ]
            ]
        ];

        foreach ($convoData as $convo) {
            $conv = Conversation::create([
                'brand_profile_id' => $convo['brand_profile_id'],
                'influencer_profile_id' => $convo['influencer_profile_id'],
                'campaign_id' => $convo['campaign_id'],
            ]);

            foreach ($convo['messages'] as $mIdx => $msg) {
                $senderId = $msg['sender_role'] === 'brand' 
                    ? BrandProfile::find($convo['brand_profile_id'])->user_id 
                    : InfluencerProfile::find($convo['influencer_profile_id'])->user_id;

                Message::create([
                    'conversation_id' => $conv->id,
                    'sender_id' => $senderId,
                    'body' => $msg['body'],
                    'read_at' => ($mIdx === count($convo['messages']) - 1) ? null : now()->subHours(count($convo['messages']) - $mIdx),
                ]);
            }
            $conv->touch();
        }
    }
}
