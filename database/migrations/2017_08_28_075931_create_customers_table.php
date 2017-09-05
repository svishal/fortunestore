<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        Schema::create('customers', function (Blueprint $table) {
             $table->uuid('id')->primary()->default(DB::raw('uuid_generate_v1()'));
            $table->integer('status')->default(0);
            $table->string('name',50)->nullable(); 
            $table->string('mobile_no', 50)->unique();
            $table->text('address')->nullable();
            $table->date('doj')->nullable();
            $table->integer('current_balance')->default(0);
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
        Schema::dropIfExists('customers');
    }
}
