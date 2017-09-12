<?php

namespace App;
use App\Models\BaseModel;

class FeetOnStreet extends BaseModel
{
      use \App\Traits\Base;
    use \App\Traits\CustomValidator {
        validateObject as protected traitValidateObject;
    }
    protected $table = "feet_on_streets";
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'status','mobile_no','permanent_address','doj','address','access_token','device_id','device_type'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
       'created_at', 'updated_at','password'
    ];

    public static $_rules = [
         'mobile_no' => array('unique:feet_on_streets','required', 'regex:/^(([0]{2}|\+)[0-9]{2,3})?\s?([7-9][0-9]{9}|\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})|([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4}))$/'),
         'name'=>'max:50|regex:/^[a-zA-Z "-]+$/',
         'doj'=>'date'
    ];

    public static function findByMobile($mobile_no) {
        return static::where('mobile_no', $mobile_no)->first();
    }
    public static function fosList() {
        return static::orderBy('updated_at','DESC')->get();
    }

    public function setDataInternally(array $attributes = []){
        if(isset($attributes['name'])){
            $this->name = trim($attributes['name']);
        }

        if($this->id == ''){
            $this->status = 1;
            $this->setToken();
        }
        return true;
    }

     public function getToken() {
                return $this->access_token;
    }
        
    public function setToken() {
        $this->access_token = \App\Components\ApiAuthToken::generate();
        return $this;
    }
}
