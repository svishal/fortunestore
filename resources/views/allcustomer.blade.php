@extends('layouts.app')
@section('content')
<div class="wrapper">
  @include('layouts.sidebar')

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        All Customer
      </h1>
    </section>
    <section class="error-content">
    <div class="row">
      <div class="col-lg-12">
          @if (Session::has('not_exist_message'))
   <div class="alert alert-info">{{ Session::get('not_exist_message') }}</div>
   @endif
   @if (Session::has('save_message'))
   <div class="alert alert-info">{{ Session::get('save_message') }}</div>
   @endif
   @foreach($errors->all() as $error)
    <ul class="alert alert-danger">
            <li>{{ $error }}</li>
             </ul>
   @endforeach
     </div>
   </div>
   </section>
    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">

          <div class="box">
            <div class="box-header">
              <h3 class="box-title">All Customer</h3>
              <a href="#" class="pull-right btn btn-success" data-toggle="modal" data-target="#add_customer">Add New Customer</a>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="customer_list" class="table table-bordered table-striped">
                <thead>
                <tr>
                   <th>Sr No.</th>
                  <th>Date of Joining</th>
                  <th>Customer Name</th>
                  <th>Customer Address</th>
                  <th>Mobile No.</th>
                  <th>Balance</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
                </thead>
                 <tbody>
                 @php $sr = 1; @endphp
                 @foreach($customer_list as $customer_column=>$customer_list_value)
                <tr class="odd gradeX">
                  <td>{{$sr}}</td>
                  <td>{{date('d-m-Y', strtotime($customer_list_value['doj']))}}</td>
                  <td>{{ucwords($customer_list_value['name'])}}</td>
                  <td>{{ucwords($customer_list_value['address'])}}</td>
                  <td>{{$customer_list_value['mobile_no']}}</td>
                  <td>{{$customer_list_value['current_balance']}}</td>
                  <td class="center fortoggle"><input value="{{$customer_list_value['status']}}" data-id="{{$customer_list_value['id']}}" @if($customer_list_value['status']==1) checked @endif data-toggle="toggle" id="change_customer_status" data-onstyle="success" type="checkbox"></td>
                  <td class="center">
                  <a href="#" title="edit"  data-toggle="modal" data-target="#editcustomer" id="edit_customer" data-id="{{$customer_list_value['id']}}"> <i class="fa fa-fw fa-pencil"></i> </a> 
                  <a href="/customer_history/{{$customer_list_value['id']}}" title="histoy"> <i class="text-red fa fa-fw fa-clock-o"></i></a>
                  <a href="/debit_history/{{$customer_list_value['id']}}" title="Debit History"> <i class="fa fa-inr  text-green" aria-hidden="true"></i></a>
                  </td>
                </tr>
                @php $sr++; @endphp
                @endforeach
              </tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</div>
<!-- ./wrapper -->
<!-- Modal -->
<div class="modal fade" id="add_customer" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Add New Customer</h4>
      </div>
      <form class="form-horizontal" id="add_customer_form" action="/add_customer" method="post">
      {{ csrf_field() }}
      <div class="modal-body">
              <div class="box-body">
                <div class="form-group">
                  <label for="date_of_joining" class="col-sm-3 control-label">Date of Joining</label>

                  <div class="col-sm-9">
                    <input class="form-control" name="date_of_joining" id="datepicker" placeholder="Date" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <label for="customer_name" class="col-sm-3 control-label">Customer Name</label>

                  <div class="col-sm-9">
                    <input class="form-control" name="customer_name" id="customer_name" placeholder="Name" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <label for="mobile_number" class="col-sm-3 control-label">Mobile No. </label>

                  <div class="col-sm-9">
                    <input class="form-control" name="mobile_number" id="mobile_number" placeholder="Number" type="text">
                     <span class="error-msg text-left error-block mobile_number_error"></span>
                  </div>
                 
                </div>
                <div class="form-group">
                  <label for="balance" class="col-sm-3 control-label">Add Balance</label>

                  <div class="col-sm-9">
                    <input class="form-control" name="balance" id="balance" placeholder="Balance" type="text">
                    <span class="error-msg text-left error-block balance_error"></span>
                  </div>
                  
                </div>
                <div class="form-group">
                  <label for="address" class="col-sm-3 control-label">Address</label>

                  <div class="col-sm-9">
                    <textarea class="form-control" id="address" name="address" placeholder="Address" type="text"></textarea>
                  </div>
                </div>
              </div>
              <!-- /.box-footer -->
            
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="submit" id="add_customer_button" class="btn btn-primary">Save</button>
      </div>
      </form>
    </div>
  </div>
</div>
<!-- Modal -->
<div class="modal fade" id="editcustomer" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title customer-name" id="myModalLabel">Edit Customer</h4>
      </div>
      <form class="form-horizontal" method="post" action="/edit_customer" id="edit_customer_form">
      {{ csrf_field() }}
      <div class="modal-body">
              <div class="box-body">
              <input type="hidden" id="customer_edit_id" name="customer_id" value="">
                <div class="form-group">
                  <label for="edit_date_of_joining" class="col-sm-3 control-label">Date of Joining</label>
              
                  <div class="col-sm-9">
                    <input class="form-control" name="edit_date_of_joining" id="edit_date_of_joining" placeholder="Date" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <label for="edit_customer_name" class="col-sm-3 control-label">Customer Name</label>

                  <div class="col-sm-9">
                    <input class="form-control" id="edit_customer_name" name="edit_customer_name" placeholder="Name" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <label for="edit_mobile_no" class="col-sm-3 control-label">Mobile No. </label>

                  <div class="col-sm-9">
                    <input class="form-control" id="edit_mobile_no" name="edit_mobile_no" placeholder="Number" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <label for="edit_balance" class="col-sm-3 control-label">Add Balance</label>

                  <div class="col-sm-9">
                    <input class="form-control" id="edit_balance" name="edit_balance" placeholder="Balance" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <label for="edit_address" class="col-sm-3 control-label">Address</label>

                  <div class="col-sm-9">
                    <textarea class="form-control" id="edit_address" name="edit_address" placeholder="Address" type="text"></textarea>
                  </div>
                </div>
              </div>
              <!-- /.box-footer -->
            
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="button" id="edit_customer_button" class="btn btn-primary">Update</button>
      </div>
      </form>
    </div>
  </div>
</div>
@endsection
