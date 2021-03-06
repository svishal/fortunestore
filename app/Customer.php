<?php

namespace App;
use App\Models\BaseModel;


class Customer extends BaseModel
{
    use \App\Traits\Base;
    use \App\Traits\CustomValidator {
        validateObject as protected traitValidateObject;
    }
    protected $table = "customers";
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'status','mobile_no','current_balance','doj','address',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
       'created_at', 'updated_at'
    ];

    public static $_rules = [
         'mobile_no' => array('unique:customers', 'required', 'regex:/^(([0]{2}|\+)[0-9]{2,3})?\s?([7-9][0-9]{10}|\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})|([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4}))$/'),
         'current_balance'=>'numeric',
         'name'=>'nullable|max:50|regex:/^[a-zA-Z "-]+$/',
         'doj'=>'date',
    ];

    public static function findByMobile($mobile_no) {
        return static::where('mobile_no', $mobile_no)->first();
    }
    public static function customerList() {
        return static::orderBy('updated_at','DESC')->get();
    }
    public function setDataInternally(array $attributes = []){
        if(isset($attributes['name'])){
            $this->name = trim($attributes['name']);
        }

        if($this->id == ''){
            $this->status = 1;
        }

        return true;
    }

    public function setData($data) {
     if(isset($data['balance'])){
        $data['current_balance'] = $this->current_balance + $data['balance'];
        $this->setTemp('balance',$data['balance']);
        
        unset($data['balance']);
     }
     parent::setData($data);
     }

     public function finishSave(array $options = []){
        if(!$this->wasRecentlyCreated && $this->getTemp('balance')){
            $attributes = [
            'customer_id' => $this->id,
            'balance' =>$this->getTemp('balance'),
            'date_of_amount_added' => date('Y-m-d'),
            ];
            $add_balance = new AddBalance($attributes);
            $response = $add_balance->save();
            return $response;
     }
 }

}
