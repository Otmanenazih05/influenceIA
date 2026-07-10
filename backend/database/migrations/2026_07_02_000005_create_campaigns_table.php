<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_profile_id')
                  ->constrained()
                  ->cascadeOnDelete();

            // Core info
            $table->string('title');
            $table->text('brief');                    // full campaign brief / description
            $table->string('brand_color', 10)->nullable(); // hex color for display on cards

            // Campaign type & payment
            $table->enum('campaign_type', ['paid', 'gifted', 'affiliate', 'ambassador'])
                  ->default('paid');
            $table->enum('payment_model', ['fixed', 'milestone', 'per_post', 'gifted'])
                  ->default('fixed');
            $table->unsignedInteger('budget')->default(0);  // total budget in MAD (or 0 for gifted)

            // Platforms required (JSON array: ["instagram", "tiktok"])
            $table->json('platforms');

            // Niche / categories targeted (JSON array: ["Beauty & Skincare", "Lifestyle"])
            $table->json('niches')->nullable();

            // Creator requirements
            $table->enum('follower_tier', ['nano', 'micro', 'macro', 'any'])->default('any');
            $table->unsignedInteger('min_followers')->default(0);
            $table->unsignedInteger('max_followers')->nullable();
            $table->decimal('min_engagement_rate', 4, 2)->default(0); // minimum % required

            // Audience targeting
            $table->json('target_countries')->nullable();  // ["Morocco", "France"]
            $table->string('target_gender', 20)->default('all'); // all | male | female
            $table->string('target_age_range', 20)->nullable();  // e.g. "18-35"

            // Content deliverables (JSON array of strings)
            $table->json('deliverables')->nullable();

            // Deadlines
            $table->date('application_deadline')->nullable();
            $table->date('submission_deadline')->nullable();
            $table->date('publication_date')->nullable();
            $table->date('campaign_end')->nullable();

            // Campaign lifecycle
            $table->enum('status', ['draft', 'active', 'paused', 'reviewing', 'closed', 'completed'])
                  ->default('draft');

            // Spots control
            $table->unsignedSmallInteger('spots_total')->default(1);
            $table->unsignedSmallInteger('spots_filled')->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
