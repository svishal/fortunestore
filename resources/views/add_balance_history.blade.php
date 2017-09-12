@extends('layouts.app')
@section('content')
<div class="wrapper">
  @include('layouts.sidebar')
<!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        {{$mobile_number_of_customer->name}}
      </h1>
     <a class="pull-right btn btn-primary" href="javascript:history.back()">Back</a>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">

          <div class="box">
            <div class="box-header">
              <h3 class="box-title">History</h3>
              <a href="#" class="pull-right btn btn-success" data-toggle="modal" data-target="#addmoney">Add Money</a>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="balance_history" class="table table-bordered table-striped">
                <thead>
                <tr>
                   <th>Sr No.</th>
                  <th>Mobile No</th>
                  <th>Dated Debit</th>
                  <th>Amount Debit</th>
                </tr>
                </thead>
                 <tbody>
                  @php $sr = 1; @endphp
                  @foreach($debit_list as $debit_list_column=>$debit_list_value)
                <tr class="odd gradeX">
                  <td>{{$sr}}</td>
                  <td>{{$mobile_number_of_customer->mobile_no}}</td>
                  <td>{{date('d-m-Y', strtotime($debit_list_value['date_of_amount_added']))}}</td>
                  <td>{{$debit_list_value['balance']}}</td>
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
<div class="modal fade" id="addmoney" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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
                <div class="form-group">
                  <label for="edit_date_of_joining" class="col-sm-3 control-label">Add Money</label>
              
                  <div class="col-sm-9">
                    <input class="form-control" name="" id="" placeholder="Add Money" type="text">
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

