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
           $data =['current_balance'=>$customer->current_balance];
            return $this->sendSuccessResponse(['data'=>$data,'message'=>Message::getSuccessMessage(02)]);
          }else{
            return $this->sendFailureResponse(03);
          }
        }else{
                  $customer = new Customer;
                  $customer->mobile_no = $input['mobile_number'];
                  $customer->current_balance = 0;
                  $customer->status = 1;
                  $customer->doj = date('Y-m-d');
                  $customer->save();
                  $customer_result  = Customer::findByMobile($input['mobile_number']);
                  $data =['id'=>$customer_result->id];
                return $this->sendSuccessResponse(['data'=>$data,'message'=>Message::getSuccessMessage(03)]);
        }
    
    }



    public function addMoney($id,Request $request){
        $input = $request->all();
        $customer  = Customer::find($id);
        if($id){
        if($customer){
          $update_amount = [
              'current_balance'=>$customer->current_balance+$input['balance']
            ];
              $customer->setData($update_amount);
              $customer->save();
            $attributes = [
            'customer_id' => $id,
            'balance' =>$input['balance'],
            'date_of_amount_added' => date('Y-m-d'),
            ];
            $add_balance = new AddBalance($attributes);
            $add_balance->save();
            return $this->sendSuccessResponse(['data'=>$update_amount,'message'=>Message::getSuccessMessage(03)]);
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
          $attributes = ['customer_id' => $id,
            'fos_id' =>$input['fos_id'],
            'order_date' => date('Y-m-d'),
            'purchased_items' => json_encode($input['purchased_items']),
            'total_amount'=>$input['total_amount']];
            $add_items = new ExpenditureItems($attributes);
            if($add_items->save()){
              $updated_balance  = $customer->current_balance-$input['total_amount'];
              if($updated_balance<0){
                $updated_balance=0;
              }
              $edit_customer_data = ['current_balance'=>$updated_balance];
              $customer->setData($edit_customer_data);
              $customer->save();
            return $this->sendSuccessResponse(['data'=>'Record Saved Successfully','message'=>Message::getSuccessMessage(03)]);
            }
        }else{
              return $this->sendFailureResponse(02);
        }
      }else{
              return $this->sendFailureResponse(02);
      }
    }

}
