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
        $expenditure_item_list = ExpenditureItems::expenditureItemsListByCustomerId($id);
        $mobile_number_of_customer = Customer::getMobileNoOfCustomer($id);
        $mobile_number_of_customer = $mobile_number_of_customer[0];
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
}
