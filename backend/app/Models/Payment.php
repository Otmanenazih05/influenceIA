<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\PaymentStatus;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'campaign_application_id',
        'amount',
        'status',
        'transaction_ref',
        'escrowed_at',
        'released_at',
        'refunded_at',
    ];

    protected $casts = [
        'status' => PaymentStatus::class,
        'escrowed_at' => 'datetime',
        'released_at' => 'datetime',
        'refunded_at' => 'datetime',
    ];

    public function campaignApplication()
    {
        return $this->belongsTo(CampaignApplication::class);
    }
}
