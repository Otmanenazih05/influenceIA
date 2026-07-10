<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('social_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('influencer_profile_id')
                  ->constrained()
                  ->cascadeOnDelete();

            // One row per platform per influencer
            $table->enum('platform', ['instagram', 'tiktok', 'youtube', 'facebook']);

            $table->string('handle', 100);          // @username
            $table->string('profile_url')->nullable();

            // Follower/engagement stats (manually entered or simulated)
            $table->unsignedBigInteger('followers_count')->default(0);
            $table->decimal('engagement_rate', 5, 2)->nullable(); // e.g. 8.30 = 8.30%
            $table->unsignedBigInteger('avg_views')->nullable();

            $table->boolean('verified')->default(false);

            // Unique per influencer per platform
            $table->unique(['influencer_profile_id', 'platform']);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('social_accounts');
    }
};
