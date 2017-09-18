<?php

namespace App\Http\Controllers;

use App\ExpenditureItems;
use Illuminate\Http\Request;
use Auth;
use App\Customer;

class ExpenditureItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        if (empty(Auth::check())) {
            return redirect('/');
        }
        if (empty($id)) {
            abort(404);
        }

        $expenditure_item_list = ExpenditureItems::expenditureItemsListByCustomerId($id);
        $mobile_number_of_customer = Customer::find($id);
        return view('customer_purchase_history', ['customer_purchase_list' => $expenditure_item_list,'mobile_number_of_customer'=>$mobile_number_of_customer]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ExpenditureItems  $expenditureItems
     * @return \Illuminate\Http\Response
     */
    public function show(ExpenditureItems $expenditureItems)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ExpenditureItems  $expenditureItems
     * @return \Illuminate\Http\Response
     */
    public function edit(ExpenditureItems $expenditureItems)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ExpenditureItems  $expenditureItems
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ExpenditureItems $expenditureItems)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ExpenditureItems  $expenditureItems
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpenditureItems $expenditureItems)
    {
        //
    }
    public function dailyPurchase()
    {
        if (empty(Auth::check())) {
            return redirect('/');
        }

        $expenditure_item_list = ExpenditureItems::allExpenditureItems();
        $data_new = Array();

        foreach ($expenditure_item_list as $key => $value) {
             $order_date  = $value->order_date;
            foreach ($value['purchased_items'] as $item_count => $item) {
                @$data_new[$value['order_date']][$item['item']]['quantity'] +=  $item['quantity'];
                @$data_new[$value['order_date']][$item['item']]['amount'] +=  $item['amount'];
                @$data_new[$value['order_date']][$item['item']]['order_date'] = $order_date;
            }
        }
        return view('daily_purchase', ['daily_purchase_list' => $data_new]);
    }

}
