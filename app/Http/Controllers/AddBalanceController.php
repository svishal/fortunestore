<?php

namespace App\Http\Controllers;

use App\AddBalance;
use Illuminate\Http\Request;
use Auth;
use App\Customer;
class AddBalanceController extends Controller
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
        if(empty($id))
        {
            return redirect('/');
        }
        if (!\App\Components\Helper::isValidUUID($id)) {
            abort(404);
        }
        $debit_list = AddBalance::debitListByCustomerId($id);
        $mobile_number_of_customer = Customer::find($id);
        return view('add_balance_history', ['debit_list' => $debit_list,'mobile_number_of_customer'=>$mobile_number_of_customer]);
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
     * @param  \App\AddBalance  $addBalance
     * @return \Illuminate\Http\Response
     */
    public function show(AddBalance $addBalance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\AddBalance  $addBalance
     * @return \Illuminate\Http\Response
     */
    public function edit(AddBalance $addBalance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\AddBalance  $addBalance
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AddBalance $addBalance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AddBalance  $addBalance
     * @return \Illuminate\Http\Response
     */
    public function destroy(AddBalance $addBalance)
    {
        //
    }
}
