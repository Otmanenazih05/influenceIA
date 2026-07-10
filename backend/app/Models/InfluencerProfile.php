<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InfluencerProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'full_name',
        'bio',
        'gender',
        'country',
        'city',
        'phone',
        'niches',
        'profile_photo_url',
        'ai_score',
        'profile_completeness',
        'age_confirmed',
        'terms_accepted',
        'preferences',
    ];

    protected $casts = [
        'niches' => 'array',
        'age_confirmed' => 'boolean',
        'terms_accepted' => 'boolean',
        'preferences' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function socialAccounts()
    {
        return $this->hasMany(SocialAccount::class);
    }

    public function campaignApplications()
    {
        return $this->hasMany(CampaignApplication::class);
    }

    public function marketplaceRequests()
    {
        return $this->hasMany(MarketplaceRequest::class);
    }

    public function conversations()
    {
        return $this->hasMany(Conversation::class);
    }
}
