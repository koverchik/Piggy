<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScopeDiscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scope_discriptions', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->boolean('delete_table');
            $table->boolean('edit_permission');
            $table->boolean('edit_row');
            $table->boolean('browsing');
            $table->boolean('add_row');
            $table->boolean('delete_row');
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
     Schema::dropIfExists('scope_discriptions');
    }
}
