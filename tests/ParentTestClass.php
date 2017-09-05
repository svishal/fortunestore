<?php

namespace Tests;

use auth;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ParentTestClass extends TestCase {

    public static $user = null;
    public static $is_migrated = false;
    public static function setUpBeforeClass() {
        if (self::$is_migrated === false) {
            exec('php artisan migrate');
            exec('php artisan db:seed --class=UnitTestSeeder');            
            self::$is_migrated = true;
        }
    }
    
    public static function tearDownAfterClass() {
        self::$user = null;
        return parent::tearDownAfterClass();
    }

    public function getUser(){
      return User::findByCondition('')->first();  
    }    
    
}
