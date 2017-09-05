<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFeetOnStreetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        Schema::create('feet_on_streets', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('uuid_generate_v1()'));
            $table->text('access_token');
            $table->text('device_id')->nullable();
            $table->enum('device_type', ['android', 'iphone'])->nullable();
            $table->integer('status')->default(0);
            $table->string('name',50); 
            $table->string('email', 50)->unique();
            $table->string('password',100)->nullable();
            $table->string('mobile_no', 50)->unique();
            $table->text('permanent_address')->nullable();
            $table->text('address')->nullable();
            $table->date('doj')->nullable();
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
        Schema::dropIfExists('feet_on_streets');
    }
}
