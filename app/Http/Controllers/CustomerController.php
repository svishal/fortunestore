<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;
use Auth;
use Session;
use Redirect;
class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (empty(Auth::check())) {
            return redirect('/');
        }
        $customer_list = Customer::get();
        return view('allcustomer', ['customer_list' => $customer_list]);
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
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customer $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        //
    }
    public function addCustomer(Request $request)
    {
        $customer_form_input_data = $request->all();
        $attributes = [
        'doj' => date('Y-m-d', strtotime($customer_form_input_data['date_of_joining'])),
        'name' =>$customer_form_input_data['customer_name'],
        'mobile_no' => $customer_form_input_data['mobile_number'],
        'current_balance'=>$customer_form_input_data['balance'],
        'address' => $customer_form_input_data['address'],
        'status' => 1
        ];
        $customer = new Customer($attributes);
        if($customer->save()){
        return back();
        }
        $errors = $customer->getErrors();
    }
    public function editCustomer(Request $request)
    {
        $edit_customer_form_input_data = $request->all();
        $edit_customer_data = ['doj'=>
        date('Y-m-d', strtotime($edit_customer_form_input_data['edit_date_of_joining'])),
          'name'=>$edit_customer_form_input_data['edit_customer_name'],
          'mobile_no'=>$edit_customer_form_input_data['edit_mobile_no'],
          'current_balance'=>$edit_customer_form_input_data['edit_balance'],
          'address'=>$edit_customer_form_input_data['edit_address']
        ];
        $customer = Customer::find($edit_customer_form_input_data['customer_id']);
        if(!$customer){
             Session::flash('not_exist_message', "Record not found");
            return Redirect::back();
        }
        $customer->setData($edit_customer_data);
        $update_customer = $customer->save();
        if($update_customer === true){
            Session::flash('save_message', "Record saved successfully");
            return Redirect::back();
         }

        $errors = $customer->getErrors();
    }
    public function getCustomerInfo(Request $request){
        $customer_id =$request->all()['customer_id']; 
        $customer_info = Customer::find($customer_id);
        $customer_info->doj = date('d-m-Y', strtotime($customer_info->doj));
        return $customer_info;
    }
    public function changeCustomerStatus(Request $request){
        $edit_customer_status_data = $request->all();
        if($edit_customer_status_data['status']==1){
          $updated_status = 0;  
        }else{
          $updated_status = 1; 
        }
        $edit_customer_status = ['status'=>$updated_status];
        Customer::where('id',$edit_customer_status_data['customer_id'])->update($edit_customer_status);
        return $updated_status;
    }
    
}
