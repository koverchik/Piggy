<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRowWalletsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('row_wallets', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->float('amount', 8, 2);
            $table->dateTime('created_at_time', 0);
            $table->foreignId('user_id')->constrained('users')->onUpdate('cascade');
            $table->foreignId('names_wallets_id')->constrained('names_wallets')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('row_wallets');
    }
}
