<?php

namespace Test\Customer;
use Tests\ParentTestClass;
use App\Customer;
use App\FeetOnStreet;
use App\ExpenditureItems;
use App\AddBalance;

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
   public function testCustomerSaveBalanceValid() {
        $data = ['status'=>'1',
        'name'=>'gaurav',
        'mobile_no'=>'5656565656',
        'address'=>'chaudhry colony,bassi pathana',
        'doj'=>'2016-11-26',
        'current_balance'=>'500',
        ];
        $customer = new Customer($data);
        $saved = $customer->save();
        $this->assertTrue($saved);
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
    public function testAddExpenditureList(){
        $customer = Customer::findByMobile('9646672242');
        $fos = FeetOnStreet::first();
        $attributes = [
        'customer_id'=>$customer->id,
        'fos_id'=>$fos['id'],
        'purchased_items'=>'[{"item":"milk","quantity":4,"amount":100},{"item":"bread","quantity":4,"amount":100}]',
        'order_date'=>'2016-11-26',
        'total_amount'=>'180',
        ];
        $add_items = new ExpenditureItems($attributes);
        $save_items = $add_items->save();
        $updated_balance  = $customer->current_balance-200;
        $edit_customer_data = ['current_balance'=>$updated_balance];
        $customer->setData($edit_customer_data);
        $update_customer = $customer->save();
        $this->assertTrue($update_customer);
    }
    public function testAddMoney(){
       $customer = Customer::findByMobile('9646672242');
        $attributes = [
        'customer_id'=>$customer->id,
        'date_of_amount_added'=>'2016-11-26',
        'balance'=>'180',
        ];
        $add_balance = new AddBalance($attributes);
         $save_items = $add_balance->save();
        $this->assertTrue($save_items);
    }
}