<?php

namespace App\Modules\Api\V1\Controllers;
use App\Modules\BaseApiController;
use Illuminate\Http\Request;
use App\Customer;
use App\AddBalance;
use App\ExpenditureItems;
use App\Components\Message;
use Hash;

class CustomerController extends BaseApiController{

    public function getBalance(Request $request){
        $input = $request->all();
        $customer  = Customer::findByMobile($input['mobile_number']);
        if($customer){
          if($customer->status ==1){
           $data = ['current_balance'=>$customer->current_balance,'id'=>$customer->id,'is_new'=>false,];
            return $this->sendSuccessResponse(['data'=>$data,'message'=>Message::getSuccessMessage(02)]);
          }else{
            return $this->sendFailureResponse(03);
          }
        }else{
                  $this->saveCustomer($input['mobile_number']);
                  $customer_result  = Customer::findByMobile($input['mobile_number']);
                  $data =['id'=>$customer_result->id,'is_new'=>true,'current_balance'=>$customer_result->current_balance];
                return $this->sendSuccessResponse(['data'=>$data,'message'=>Message::getSuccessMessage(03)]);
        }
    }



    public function addMoney($id,Request $request){
        $input = $request->all();
        $customer  = Customer::find($id);
        if($id){
          if($customer){
            if($customer->status ==1){
                $update_amount = ['current_balance'=>$customer->current_balance+$input['balance']];
                $customer->setData(['balance'=>$input['balance']]);
                if($customer->save()){
                  return $this->sendSuccessResponse(['data'=>$update_amount,'message'=>Message::getSuccessMessage(03)]);
                }
              }else{
              return $this->sendFailureResponse(03);
              }
          }else{
              return $this->sendFailureResponse(02);
          }
        }else{
              return $this->sendFailureResponse(02);
        }
    }


    public function addExpenditures($id,Request $request){
        $input = $request->all();
      if($id){
        $customer  = Customer::find($id);
        if($customer){
          if($customer->status ==1){
          $save_expenditure = $this->saveExpenditures($id,$input['fos_id'],$input['purchased_items'],$input['total_amount']);
            if($save_expenditure){
              $updated_balance  = $customer->current_balance-$input['total_amount'];
              if($updated_balance<0) $updated_balance=0;
              $edit_customer_data = ['current_balance'=>$updated_balance];
              $customer->setData($edit_customer_data);
              $customer->save();
            return $this->sendSuccessResponse(['data'=>'Record Saved Successfully','message'=>Message::getSuccessMessage(03)]);
            }
          }else{
              return $this->sendFailureResponse(03);
          }
        }else{
              return $this->sendFailureResponse(02);
        }
      }else{
              return $this->sendFailureResponse(02);
      }
    }
    public function saveCustomer($mobile_number){
      $customer = new Customer;
      $customer->mobile_no = $mobile_number;
      $customer->current_balance = 0;
      $customer->status = 1;
      $customer->doj = date('Y-m-d');
      $customer->save();
    }
    public function saveExpenditures($customer_id,$fos_id,$purchased_items,$total_amount){
            $attributes = ['customer_id' => $customer_id,
            'fos_id' =>$fos_id,
            'order_date' => date('Y-m-d'),
            'purchased_items' => $purchased_items,
            'total_amount'=>$total_amount];
            $add_items = new ExpenditureItems($attributes);
            return $add_items->save();
    }

}
