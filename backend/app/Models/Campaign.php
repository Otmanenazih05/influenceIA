<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\CampaignType;
use App\Enums\PaymentModel;
use App\Enums\FollowerTier;
use App\Enums\CampaignStatus;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_profile_id',
        'title',
        'brief',
        'brand_color',
        'campaign_type',
        'payment_model',
        'budget',
        'platforms',
        'niches',
        'follower_tier',
        'min_followers',
        'max_followers',
        'min_engagement_rate',
        'target_countries',
        'target_gender',
        'target_age_range',
        'deliverables',
        'application_deadline',
        'submission_deadline',
        'publication_date',
        'campaign_end',
        'status',
        'spots_total',
        'spots_filled',
    ];

    protected $casts = [
        'campaign_type' => CampaignType::class,
        'payment_model' => PaymentModel::class,
        'follower_tier' => FollowerTier::class,
        'status' => CampaignStatus::class,
        'platforms' => 'array',
        'niches' => 'array',
        'target_countries' => 'array',
        'deliverables' => 'array',
        'application_deadline' => 'date',
        'submission_deadline' => 'date',
        'publication_date' => 'date',
        'campaign_end' => 'date',
    ];

    public function brandProfile()
    {
        return $this->belongsTo(BrandProfile::class);
    }

    public function applications()
    {
        return $this->hasMany(CampaignApplication::class);
    }
}
