<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('influencer_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->unique()
                  ->constrained()
                  ->cascadeOnDelete();

            // Personal information
            $table->string('full_name');
            $table->text('bio')->nullable();
            $table->string('gender', 20)->nullable();
            $table->string('country', 100)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('phone', 30)->nullable();

            // Content & niche — stored as JSON array, e.g. ["Beauty & Skincare", "Lifestyle"]
            $table->json('niches')->nullable();

            // Profile media
            $table->string('profile_photo_url')->nullable();

            // AI scoring (calculated by backend formula, null until first calculation)
            $table->unsignedTinyInteger('ai_score')->nullable();

            // Profile completeness percentage (0–100), recalculated on profile updates
            $table->unsignedTinyInteger('profile_completeness')->default(0);

            // Legal consent fields
            $table->boolean('age_confirmed')->default(false);
            $table->boolean('terms_accepted')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('influencer_profiles');
    }
};
