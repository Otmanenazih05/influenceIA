<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_profile_id',
        'influencer_profile_id',
        'campaign_id',
    ];

    public function brandProfile()
    {
        return $this->belongsTo(BrandProfile::class);
    }

    public function influencerProfile()
    {
        return $this->belongsTo(InfluencerProfile::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
