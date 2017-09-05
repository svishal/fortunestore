<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class UnitTestSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {

        self::truncateData();
        $this->call(UserTableSeeder::class);
       
        
     }

    public static function truncateData() {
        $tables = [
            (new \App\User)->getTable(),
            (new \App\Customer)->getTable(),
            (new \App\FeetOnStreet)->getTable(),
           
        ];
        foreach ($tables as $table) {
            DB::statement('TRUNCATE TABLE ' . config('database.connections.pgsql.prefix') . $table . ' CASCADE');
        }
    }

}
