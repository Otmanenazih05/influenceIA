<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('campaign_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')
                  ->constrained()
                  ->cascadeOnDelete();
            $table->foreignId('influencer_profile_id')
                  ->constrained()
                  ->cascadeOnDelete();

            // Application status — full lifecycle matching frontend AppStatus
            $table->enum('status', [
                'pending', 'shortlisted', 'accepted', 'rejected',
                'submitted', 'revision', 'approved', 'completed',
            ])->default('pending');

            // AI-calculated match score (0–100), nullable until computed
            $table->unsignedTinyInteger('match_score')->nullable();

            // Optional cover message from the influencer when applying
            $table->text('cover_message')->nullable();

            // Timestamps
            $table->timestamp('applied_at')->useCurrent();
            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            // One application per influencer per campaign
            $table->unique(['campaign_id', 'influencer_profile_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('campaign_applications');
    }
};
