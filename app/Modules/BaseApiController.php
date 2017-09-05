<?php

namespace App\Modules;

use Illuminate\Http\Request;

class BaseApiController extends \App\Http\Controllers\Controller {

    public $select = '*';
    
public function sendFailureResponse($code,$errors = ''){
    throw new \App\Exceptions\APIException($code,$errors);
}

public function sendSuccessResponse($success_data){
    return [
        'success'=>True,
        'data'=>$success_data['data'],
        'message'=>$success_data['message']
    ];
}

}
