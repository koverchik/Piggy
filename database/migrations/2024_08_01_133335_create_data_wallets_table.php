<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wallet_rows', function (Blueprint $table) {
            $table->id()->primary();
            $table->string('name', 100)->nullable(false);
            $table->decimal('amount', 8, 2)->nullable(false);
            $table->unsignedBigInteger('wallet_id');
            $table->timestamps();

            $table->foreignId('user_id')->constrained('users')->onUpdate('cascade');
            $table->foreign('wallet_id')->references('id')->on('wallets')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallet_rows');
    }
};
