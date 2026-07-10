<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\SubmissionStatus;

class ContentSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'campaign_application_id',
        'deliverable_label',
        'content_url',
        'status',
        'revision_note',
        'submitted_at',
        'reviewed_at',
    ];

    protected $casts = [
        'status' => SubmissionStatus::class,
        'submitted_at' => 'datetime',
        'reviewed_at' => 'datetime',
    ];

    public function campaignApplication()
    {
        return $this->belongsTo(CampaignApplication::class);
    }
}
