<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_application_id')
                  ->unique()   // one payment record per application (one-to-one)
                  ->constrained()
                  ->cascadeOnDelete();

            // Payment amount in MAD
            $table->unsignedInteger('amount');

            // Escrow lifecycle status
            $table->enum('status', ['pending', 'in_escrow', 'released', 'refunded'])
                  ->default('pending');

            // Optional: transaction reference (for future real payment integration)
            $table->string('transaction_ref')->nullable();

            // Timestamps for each state transition
            $table->timestamp('escrowed_at')->nullable();   // when funds moved to escrow
            $table->timestamp('released_at')->nullable();   // when funds released to influencer
            $table->timestamp('refunded_at')->nullable();   // when funds refunded to brand
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
