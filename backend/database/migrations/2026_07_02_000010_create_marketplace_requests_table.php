<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('marketplace_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('marketplace_listing_id')
                  ->constrained()
                  ->cascadeOnDelete();
            $table->foreignId('influencer_profile_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->enum('status', ['requested', 'approved', 'declined', 'fulfilled'])
                  ->default('requested');

            $table->text('message')->nullable(); // Optional message from influencer

            $table->timestamp('requested_at')->useCurrent();
            $table->timestamps();

            // One request per influencer per listing
            $table->unique(['marketplace_listing_id', 'influencer_profile_id'], 'mrq_listing_influencer_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('marketplace_requests');
    }
};
