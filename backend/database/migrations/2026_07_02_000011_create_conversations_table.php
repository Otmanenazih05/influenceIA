<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('brand_profile_id')
                  ->constrained()
                  ->cascadeOnDelete();
                  
            $table->foreignId('influencer_profile_id')
                  ->constrained()
                  ->cascadeOnDelete();
                  
            // Optional: link to a specific campaign
            $table->foreignId('campaign_id')
                  ->nullable()
                  ->constrained()
                  ->nullOnDelete();

            $table->timestamps();
            
            // Should only be one general conversation between a brand and an influencer per campaign 
            // (or one overall if campaign is null, but we'll let app logic handle exact uniqueness if needed)
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('conversations');
    }
};
