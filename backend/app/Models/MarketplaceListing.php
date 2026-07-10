<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\MarketplaceListingStatus;

class MarketplaceListing extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_profile_id',
        'title',
        'description',
        'category',
        'platforms',
        'image_url',
        'what_influencer_receives',
        'expected_content',
        'requirements',
        'availability',
        'gift_value',
        'spots_total',
        'spots_filled',
    ];

    protected $casts = [
        'platforms' => 'array',
        'what_influencer_receives' => 'array',
        'expected_content' => 'array',
        'requirements' => 'array',
        'availability' => MarketplaceListingStatus::class,
    ];

    public function brandProfile()
    {
        return $this->belongsTo(BrandProfile::class);
    }

    public function requests()
    {
        return $this->hasMany(MarketplaceRequest::class);
    }
}
