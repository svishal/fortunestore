<?php

namespace App\Modules\Api\V1\Controllers;
use App\Modules\BaseApiController;
use Illuminate\Http\Request;
use App\FeetOnStreet;
use App\Components\Message;
use Hash;

class FeetOnStreetController extends BaseApiController{

    public function store(Request $request){
      //
    }

    public function login(Request $request){

        $input = $request->all();
        $fos  = FeetOnStreet::findByMobile($input['mobile_number']);
        if($fos){
            if($fos->status == 1){
            if(empty($fos->password)){
                $update_fos_data = [
              'password'=>bcrypt($input['password']),
              'device_type'=>$input['device_type'],
              'device_id'=>$input['device_id']
            ];
            $feet_on_street = FeetOnStreet::find($fos->id);
            $feet_on_street->setData($update_fos_data);
            $update_fos =$feet_on_street->save();
            return $this->sendSuccessResponse(['data'=>$fos,'message'=>Message::getSuccessMessage(01)]);
            }else{
                $exist = Hash::check($input['password'], $fos->password);
                if($exist){
                return $this->sendSuccessResponse(['data'=>$fos,'message'=>Message::getSuccessMessage(01)]);
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
}
