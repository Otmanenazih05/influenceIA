<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\ApplicationStatus;

class CampaignApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'campaign_id',
        'influencer_profile_id',
        'status',
        'match_score',
        'cover_message',
        'applied_at',
        'accepted_at',
        'completed_at',
    ];

    protected $casts = [
        'status' => ApplicationStatus::class,
        'applied_at' => 'datetime',
        'accepted_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function influencerProfile()
    {
        return $this->belongsTo(InfluencerProfile::class);
    }

    public function contentSubmissions()
    {
        return $this->hasMany(ContentSubmission::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
