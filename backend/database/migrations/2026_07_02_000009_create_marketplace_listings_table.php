<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('marketplace_listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_profile_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->string('title');
            $table->text('description');
            $table->string('category', 100); // e.g. Beauty, Fashion
            
            // Expected platform (can be an array, storing as json)
            $table->json('platforms'); 
            
            $table->string('image_url')->nullable();
            
            // Arrays of strings for requirements/benefits
            $table->json('what_influencer_receives')->nullable();
            $table->json('expected_content')->nullable();
            $table->json('requirements')->nullable();

            $table->enum('availability', ['available', 'limited', 'full', 'closed'])
                  ->default('available');
                  
            $table->unsignedInteger('gift_value')->default(0);
            
            // Spots tracking
            $table->unsignedSmallInteger('spots_total')->nullable();
            $table->unsignedSmallInteger('spots_filled')->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('marketplace_listings');
    }
};
