<?php

namespace App\Http\Controllers;

use App\FeetOnStreet;
use Illuminate\Http\Request;
use Auth;
use Session;
use Redirect;

class FeetOnStreetController extends Controller
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
        $feet_on_street_list = FeetOnStreet::get();
        return view('fos_list', ['feet_on_street_list' => $feet_on_street_list]);
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
     * @param  \App\FeetOnStreet  $feetOnStreet
     * @return \Illuminate\Http\Response
     */
    public function show(FeetOnStreet $feetOnStreet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FeetOnStreet  $feetOnStreet
     * @return \Illuminate\Http\Response
     */
    public function edit(FeetOnStreet $feetOnStreet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FeetOnStreet  $feetOnStreet
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FeetOnStreet $feetOnStreet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FeetOnStreet  $feetOnStreet
     * @return \Illuminate\Http\Response
     */
    public function destroy(FeetOnStreet $feetOnStreet)
    {
        //
    }
     public function addFos(Request $request)
    {
        $fos_form_input_data = $request->all();
        $attributes = [
        'doj' => date('Y-m-d', strtotime($fos_form_input_data['date_of_joining'])),
        'name' =>$fos_form_input_data['fos_name'],
        'mobile_no' => $fos_form_input_data['fos_mobile_no'],
        'address' => $fos_form_input_data['fos_address'],
        'permanent_address' => $fos_form_input_data['fos_permanent_address']
        ];
        $fos = new FeetOnStreet($attributes);
        if($fos->save()){
        return back();
    }
        $errors = $fos->getErrors();
        return Redirect::back()->withErrors($errors);
    }
    public function editFos(Request $request){
        $edit_fos_form_input_data = $request->all();
        $edit_fos_data = [
          'doj'=>date('Y-m-d', strtotime($edit_fos_form_input_data['edit_date_of_joining'])),
          'name'=>$edit_fos_form_input_data['edit_fos_name'],
          'mobile_no'=>$edit_fos_form_input_data['edit_mobile_no'],
          'permanent_address'=>$edit_fos_form_input_data['edit_permanent_address'],
          'address'=>$edit_fos_form_input_data['edit_address'],];
        if(!empty($edit_fos_form_input_data['edit_password'])){
            $edit_fos_data = ['password'=>bcrypt($edit_fos_form_input_data['edit_password'])];
        }
        $feet_on_street = FeetOnStreet::find($edit_fos_form_input_data['fos_id']);
        if(!$feet_on_street){
            Session::flash('not_exist_message', "Record not found");
            return Redirect::back();
        }
        $feet_on_street->setData($edit_fos_data);
        $update_fos =$feet_on_street->save();
        if($update_fos === true){
            Session::flash('save_message', "Record saved successfully");
            return Redirect::back();
         }
        $errors = $feet_on_street->getErrors();
    }
    public function changeFosStatus(Request $request){
        $edit_fos_status_data = $request->all();
        if($edit_fos_status_data['status']==1){
          $updated_status = 0;  
        }else{
          $updated_status = 1; 
        }
        $edit_fos_status = ['status'=>$updated_status];
        $feet_on_street = FeetOnStreet::find($edit_fos_status_data['fos_id']);
        if(!$feet_on_street){
            Session::flash('not_exist_message', "Record not found");
            return Redirect::back();
        }
        $feet_on_street->setData($edit_fos_status);
        $update_fos =$feet_on_street->save();
        if($update_fos === true){
        return $updated_status;
         }
        $errors = $feet_on_street->getErrors();
        
    }
    public function getFosInfo(Request $request){
        $fos_id =$request->all()['fos_id']; 
        $fos_info = FeetOnStreet::find($fos_id);
        $fos_info->doj = date('d-m-Y', strtotime($fos_info->doj));
        return $fos_info;
    }
}
