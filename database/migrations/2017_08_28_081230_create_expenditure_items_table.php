<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExpenditureItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenditure_items', function (Blueprint $table) {
            $table->increments('id');
            $table->date('order_date')->nullable();
            $table->uuid('customer_id');
            $table->uuid('fos_id');
            $table->json('purchased_items')->nullable();
            $table->integer('total_amount')->nullable();
            $table->timestamps();
            $table->foreign('customer_id')->references('id')->on('customers');
            $table->foreign('fos_id')->references('id')->on('feet_on_streets');
        });
     
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expenditure_items');
    }
}
