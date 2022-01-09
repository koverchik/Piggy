<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRowEstimatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('row_estimates', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->float('amount', 8, 2);
            $table->foreignId('user_id')->constrained('users')->onUpdate('cascade');
            $table->foreignId('names_estimates_id')->constrained('names_estimates')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::drop('row_estimates');
      
   }
}
