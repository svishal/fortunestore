<?php

namespace Test\Fos;
use Tests\ParentTestClass;
use App\FeetOnStreet;

class FosTest extends ParentTestClass {

    public function getFos() {
       $fos = \App\FeetOnStreet::all()->first();
       return $fos;
    }
    public function testCreateFos(){
        $this->assertTrue(true);
        $attributes = [
        'name'=>'gaurav',
        'mobile_no'=>'9876587651',
        'address'=>'mohali',
        'doj'=>'2016-11-26',
        'permanent_address'=>'chaudhry colony,bassi pathana',
        'password'=>'admin@123'
        ];
        $checkfos = FeetOnStreet::findByMobile('9876587651');
        if(empty($checkfos)){
          $fos = new FeetOnStreet($attributes);
         $save_fos = $fos->save();
          $this->assertTrue($save_fos);
        }
    }

     public function testfosSaveMobileNoEmpty() {
        $data = ['status'=>'1',
        'name'=>'gaurav',
        'mobile_no'=>'',
        'address'=>'mohali',
        'doj'=>'2016-11-26',
        'permanent_address'=>'chaudhry colony,bassi pathana',
        'password'=>'admin@123'
        ];
        $fos = new FeetOnStreet($data);
        $saved = $fos->save();
        $this->assertFalse($saved);
        $this->assertArrayHasKey('mobile_no', $fos->getErrors());
   }

        public function testFosSaveMobileNoInvalid() {
        $data = ['status'=>'1',
        'name'=>'gaurav',
        'mobile_no'=>'hghghghghg',
        'address'=>'mohali',
        'doj'=>'2016-11-26',
        'permanent_address'=>'chaudhry colony,bassi pathana',
        'password'=>'admin@123'
        ];
        $fos = new FeetOnStreet($data);
        $saved = $fos->save();
        $this->assertFalse($saved);
        $this->assertArrayHasKey('mobile_no', $fos->getErrors());
   }

      public function testFosSaveDojInvalid() {
        $data = ['status'=>'1',
        'name'=>'gaurav',
        'mobile_no'=>'5656565656',
        'address'=>'chaudhry colony,bassi pathana',
        'doj'=>'5656565',
        'permanent_address'=>'chaudhry colony,bassi pathana',
        'password'=>'admin@123'
        ];
        $fos = new FeetOnStreet($data);
        $saved = $fos->save();
        $this->assertFalse($saved);
        $this->assertArrayHasKey('doj', $fos->getErrors());
   }
    public function testFosSaveNameInvalid() {
        $data = ['status'=>'1',
        'name'=>'48958986',
        'mobile_no'=>'5656565656',
        'address'=>'chaudhry colony,bassi pathana',
        'doj'=>'2016-11-26',
        'permanent_address'=>'chaudhry colony,bassi pathana',
        'password'=>'admin@123'
        ];
        $fos = new FeetOnStreet($data);
        $saved = $fos->save();
        $this->assertFalse($saved);
        $this->assertArrayHasKey('name', $fos->getErrors());
   }
   public function testFosUpdate(){
        $fos = FeetOnStreet::findByMobile('9876587651');
        $data = [
        'name'=>'new',
        'mobile_no'=>'9646672242',
        'address'=>'Mohali',
        'doj'=>'2016-11-26',
        'permanent_address'=>'chaudhry colony,bassi pathana',
        'password'=>'admin@123'
        ];
        $fos->setData($data);
        $update_fos =$fos->save();
        $this->assertTrue($update_fos);
    }
    public function testFosUpdateStatus(){
        $fos = FeetOnStreet::findByMobile('9646672242');
        $data = [
        'status'=>0
        ];
        $fos->setData($data);
        $update_fos =$fos->save();
        $this->assertTrue($update_fos);
    }
}