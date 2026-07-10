<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\Platform;

class SocialAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'influencer_profile_id',
        'platform',
        'handle',
        'profile_url',
        'followers_count',
        'engagement_rate',
        'avg_views',
        'verified',
    ];

    protected $casts = [
        'platform' => Platform::class,
        'verified' => 'boolean',
    ];

    public function influencerProfile()
    {
        return $this->belongsTo(InfluencerProfile::class);
    }
}
