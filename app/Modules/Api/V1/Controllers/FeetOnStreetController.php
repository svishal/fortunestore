<?php

namespace App\Modules\Api\V1\Controllers;
use App\Modules\BaseApiController;
use Illuminate\Http\Request;
use App\FeetOnStreet;
use App\Components\Message;
use Hash;

class FeetOnStreetController extends BaseApiController{

    public function login(Request $request){
        $input = $request->all();
        $fos  = FeetOnStreet::findByMobile($input['mobile_number']);
        if($fos){
          if($fos->status == 1){
            if(empty($fos->password)){
             $fos_result = $this->updateFos($input['device_type'],$input['device_id'],$fos->id,$input['password']);
            return $this->sendSuccessResponse(['data'=>$fos_result,'message'=>Message::getSuccessMessage(01)]);
            }else{
                $exist = Hash::check($input['password'], $fos->password);
                if($exist){
                 $fos_result =  $this->updateFos($input['device_type'],$input['device_id'],$fos->id);
                return $this->sendSuccessResponse(['data'=>$fos_result,'message'=>Message::getSuccessMessage(01)]);
                 }
                 return $this->sendFailureResponse(01);
            }
          }else{
            return $this->sendFailureResponse(03);
          }
        }else{
          return $this->sendFailureResponse(02);
        }
    }

    public function updateFos($device_type,$device_id,$fos_id,$password=""){
      if(isset($password) && !empty($password)){
        $update_fos_data =[
              'password'=>bcrypt($password),];
      }
      $update_fos_data = [
        'device_type'=>$device_type,
        'device_id'=>$device_id
      ];
      $feet_on_street = FeetOnStreet::find($fos_id);
      $feet_on_street->setData($update_fos_data);
      $update_fos =$feet_on_street->save();
      return $feet_on_street;
    }
}
