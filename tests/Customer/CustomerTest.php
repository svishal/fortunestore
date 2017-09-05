<?php

namespace Test\Customer;
use Tests\ParentTestClass;
use App\Customer;

class CustomerTest extends ParentTestClass {

    public function getCustomer() {
       $customer = \App\Customer::all()->first();
       return $customer;
    }
    public function testCreateCustomer(){
        $attributes = [
        'name'=>'gaurav',
        'mobile_no'=>'9876587651',
        'address'=>'chaudhry colony,bassi pathana',
        'doj'=>'2016-11-26',
        'current_balance'=>'250',
        ];
        $customer = new Customer($attributes);
        $save_customer = $customer->save();
        $this->assertTrue($save_customer);
        
    }
     public function testCustomerSaveMobileNoEmpty() {
        $data = ['status'=>'1',
        'name'=>'gaurav',
        'mobile_no'=>'',
        'address'=>'chaudhry colony,bassi pathana',
        'doj'=>'2016-11-26',
        'current_balance'=>'2500',
        ];
        $customer = new Customer($data);
        $saved = $customer->save();
        $this->assertFalse($saved);
        $this->assertArrayHasKey('mobile_no', $customer->getErrors());
   }
        public function testCustomerSaveMobileNoInvalid() {
        $data = ['status'=>'1',
        'name'=>'gaurav',
        'mobile_no'=>'hghghghghg',
        'address'=>'chaudhry colony,bassi pathana',
        'doj'=>'2016-11-26',
        'current_balance'=>'2500',
        ];
        $customer = new Customer($data);
        $saved = $customer->save();
        $this->assertFalse($saved);
        $this->assertArrayHasKey('mobile_no', $customer->getErrors());
   }
   public function testCustomerSaveBalanceInvalid() {
        $data = ['status'=>'1',
        'name'=>'gaurav',
        'mobile_no'=>'5656565656',
        'address'=>'chaudhry colony,bassi pathana',
        'doj'=>'2016-11-26',
        'current_balance'=>'ghghfghfg',
        ];
        $customer = new Customer($data);
        $saved = $customer->save();
        $this->assertFalse($saved);
        $this->assertArrayHasKey('current_balance', $customer->getErrors());
   }
      public function testCustomerSaveDojInvalid() {
        $data = ['status'=>'1',
        'name'=>'gaurav',
        'mobile_no'=>'5656565656',
        'address'=>'chaudhry colony,bassi pathana',
        'doj'=>'5656565',
        'current_balance'=>'ghghfghfg',
        ];
        $customer = new Customer($data);
        $saved = $customer->save();
        $this->assertFalse($saved);
        $this->assertArrayHasKey('doj', $customer->getErrors());
   }
    public function testCustomerSaveNameInvalid() {
        $data = ['status'=>'1',
        'name'=>'48958986',
        'mobile_no'=>'5656565656',
        'address'=>'chaudhry colony,bassi pathana',
        'doj'=>'2016-11-26',
        'current_balance'=>'ghghfghfg',
        ];
        $customer = new Customer($data);
        $saved = $customer->save();
        $this->assertFalse($saved);
        $this->assertArrayHasKey('name', $customer->getErrors());
   }
   public function testCutomerUpdate(){
        $customer = Customer::findByMobile('9876587651');
        $data = [
        'name'=>'new',
        'mobile_no'=>'9646672242',
        'address'=>'Mohali',
        'doj'=>'2016-11-26',
        'current_balance'=>'2500',
        ];
        $customer->setData($data);
        $update_customer =$customer->save();
        $this->assertTrue($update_customer);
    }
    public function testCutomerUpdateStatus(){
        $customer = Customer::findByMobile('9646672242');
        $data = [
        'status'=>0
        ];
        $customer->setData($data);
        $update_customer =$customer->save();
        $this->assertTrue($update_customer);
    }
}