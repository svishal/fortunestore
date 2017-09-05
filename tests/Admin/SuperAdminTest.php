<?php

namespace Test\Admin;
use Tests\ParentTestClass;
use App\User;

class SuperAdminTest extends ParentTestClass {

    
    public function testCreateAdmin(){
        $this->assertTrue(true);
        $user = new User(['name'=>'admin',
        'email'=>'shivalisharma@ucreate.co.in',
        'password'=>'admin@123'
        ]);
        $response = $user->save();
        $this->assertTrue($response);
    }
}