<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('TRUNCATE users CASCADE');
        DB::table('users')->insert([
        	'name'=>getenv('ADMIN_NAME'),
        	'email' => getenv('ADMIN_EMAIL'),
            'password' => bcrypt(getenv('ADMIN_PASSWORD')),
            'created_at'=> Carbon::now(),
            'updated_at'=> Carbon::now(),
        	]);     
    }
}
