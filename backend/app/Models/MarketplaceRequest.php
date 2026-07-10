<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\MarketplaceRequestStatus;

class MarketplaceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'marketplace_listing_id',
        'influencer_profile_id',
        'status',
        'message',
        'requested_at',
    ];

    protected $casts = [
        'status' => MarketplaceRequestStatus::class,
        'requested_at' => 'datetime',
    ];

    public function listing()
    {
        return $this->belongsTo(MarketplaceListing::class, 'marketplace_listing_id');
    }

    public function influencerProfile()
    {
        return $this->belongsTo(InfluencerProfile::class);
    }
}
