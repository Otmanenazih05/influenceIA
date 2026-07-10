<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_application_id')
                  ->constrained()
                  ->cascadeOnDelete();

            // Which deliverable this submission covers (e.g. "Instagram Reel #1 (60s)")
            $table->string('deliverable_label');

            // The submitted URL (social post link, Google Drive link, etc.)
            $table->string('content_url')->nullable();

            // Status of this specific piece of content
            $table->enum('status', ['pending', 'submitted', 'pending_review', 'approved', 'revision'])
                  ->default('pending');

            // Notes from the brand when requesting a revision
            $table->text('revision_note')->nullable();

            // Timestamps
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_submissions');
    }
};
