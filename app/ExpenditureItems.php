<?php

namespace App;

use App\Models\BaseModel;

class ExpenditureItems extends BaseModel
{
    use \App\Traits\Base;
    use \App\Traits\CustomValidator {
        validateObject as protected traitValidateObject;
    }
     protected $table = "expenditure_items";
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_date', 'customer_id','fos_id','purchased_items','total_amount'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
       'created_at', 'updated_at'
    ];

    protected $casts = [
        'purchased_items' => 'json'
    ];

    public static function expenditureItemsListByCustomerId($id) {
        return static::where('customer_id', $id)->get();
    }
    public static function allExpenditureItems() {
    return $qry = static::orderBy('order_date', 'desc')
                  ->get();

    return collect($qry)
            ->groupBy('order_date')
            ->all();
    }
}
