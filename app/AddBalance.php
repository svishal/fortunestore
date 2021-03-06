<?php

namespace App;

use App\Models\BaseModel;

class AddBalance extends BaseModel
{
    use \App\Traits\Base;
    use \App\Traits\CustomValidator {
        validateObject as protected traitValidateObject;
    }
    protected $table = "add_balances";
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'customer_id', 'balance','date_of_amount_added'
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
         'balance'=>'integer',
    ];
    public static function debitListByCustomerId($id) {
        return static::where('customer_id', $id)->get();
    }
}
