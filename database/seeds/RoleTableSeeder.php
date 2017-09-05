<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now();
        DB::statement('TRUNCATE roles CASCADE');
        DB::table('roles')->insert([
        	['name'=>'super_admin','created_at'=> $now, 'updated_at' => $now],
            ['name'=>'admin','created_at'=> $now, 'updated_at' => $now],
            ['name'=>'user' ,'created_at'=> $now, 'updated_at' => $now]
        ]);     
    }
}
