@extends('layouts.app')
@section('content')
<div class="wrapper">
  @include('layouts.sidebar')

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        FOS
        <small>Details</small>
      </h1>
    </section>
    @if (Session::has('not_exist_message'))
   <div class="alert alert-info">{{ Session::get('not_exist_message') }}</div>
   @endif
   @if (Session::has('save_message'))
   <div class="alert alert-info">{{ Session::get('save_message') }}</div>
   @endif
    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">

          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Feet on Street</h3>
              <a href="#" class="pull-right btn btn-success" data-toggle="modal" data-target="#addfieldboy">Add New Field Boy</a>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="fos_list" class="table table-bordered table-striped">
                <thead>
                <tr>
                   <th>Sr No.</th>
                  <th>Date of Joinig</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Mobile No.</th>
                  <th>Permanent Address</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
                </thead>
                 <tbody>
                  @php $sr = 1; @endphp
                 @foreach($feet_on_street_list as $fos_column=>$fos_list_value)
                <tr class="odd gradeX">
                  <td>{{$sr}}</td>
                  <td>{{date('d-m-Y', strtotime($fos_list_value['doj']))}}</td>
                  <td>{{ucwords($fos_list_value['name'])}}</td>
                  <td>{{ucwords($fos_list_value['address'])}}</td>
                  <td>{{$fos_list_value['mobile_no']}}</td>
                  <td>{{ucwords($fos_list_value['permanent_address'])}}</td>
                  <td class="center fortoggle"><input value="{{$fos_list_value['status']}}" data-id="{{$fos_list_value['id']}}" @if($fos_list_value['status']==1) checked @endif data-toggle="toggle" id="change_fos_status" data-onstyle="success" type="checkbox"></td>
                  <td class="center">
                  <a href="#" title="edit"  data-toggle="modal" data-target="#editfos" id="edit_fos" data-id="{{$fos_list_value['id']}}"> <i class="fa fa-fw fa-pencil"></i> </a> </td>
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
</div>
<!-- ./wrapper -->
<!-- Modal -->
<div class="modal fade" id="addfieldboy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Add New Customer</h4>
      </div>
      <form class="form-horizontal" id="add_fos_form" action="/add_fos" method="post">
      {{ csrf_field() }}
      <div class="modal-body">
              <div class="box-body">
                <div class="form-group">
                  <label for="date_of_joining" class="col-sm-3 control-label">Date of Joining</label>

                  <div class="col-sm-9">
                    <input class="form-control" id="datepicker" name="date_of_joining" placeholder="Date" type="email">
                  </div>
                </div>
                <div class="form-group">
                  <label for="fos_name" class="col-sm-3 control-label">Name</label>

                  <div class="col-sm-9">
                    <input class="form-control" id="fos_name" name="fos_name" placeholder="Name" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <label for="fos_address" class="col-sm-3 control-label">Address</label>

                  <div class="col-sm-9">
                    <textarea class="form-control" id="fos_address" name="fos_address" placeholder="Address" type="text"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label for="fos_mobile_no" class="col-sm-3 control-label">Mobile No. </label>

                  <div class="col-sm-9">
                    <input class="form-control" id="fos_mobile_no" name="fos_mobile_no" placeholder="Number" type="text">
                  </div>
                  <span class="error-msg text-left error-block mobile_number_error"></span>
                </div>
                <div class="form-group">
                  <label for="fos_permanent_address" class="col-sm-3 control-label">Parmanent Address</label>

                  <div class="col-sm-9">
                    <textarea class="form-control" id="fos_permanent_address" name="fos_permanent_address" placeholder="Parmanent Address" type="text"></textarea>
                  </div>
                </div>
              </div>
              <!-- /.box-footer -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="button" id="save_fos" class="btn btn-primary">Save</button>
      </div>
       </form>
    </div>
  </div>
</div>
<!-- Modal -->
<div class="modal fade" id="editfos" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title fos-name" id="myModalLabel">Edit FOS</h4>
      </div>
      <form class="form-horizontal" method="post" action="/edit_fos" id="edit_fos_form">
      {{ csrf_field() }}
      <div class="modal-body">
              <div class="box-body">
              <input type="hidden" id="fos_edit_id" name="fos_id" value="">
                <div class="form-group">
                  <label for="edit_date_of_joining" class="col-sm-3 control-label">Date of Joining</label>
              
                  <div class="col-sm-9">
                    <input class="form-control" name="edit_date_of_joining" id="edit_date_of_joining" placeholder="Date" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <label for="edit_fos_name" class="col-sm-3 control-label">FOS Name</label>

                  <div class="col-sm-9">
                    <input class="form-control" id="edit_fos_name" name="edit_fos_name" placeholder="Name" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <label for="edit_mobile_no" class="col-sm-3 control-label">Mobile No. </label>

                  <div class="col-sm-9">
                    <input class="form-control" id="edit_mobile_no" name="edit_mobile_no" placeholder="Number" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <label for="edit_address" class="col-sm-3 control-label">Address</label>

                  <div class="col-sm-9">

                    <textarea class="form-control" id="edit_address" name="edit_address" placeholder="Address" type="text"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label for="edit_permanent_address" class="col-sm-3 control-label">Permanent Address</label>

                  <div class="col-sm-9">
                    <textarea class="form-control" id="edit_permanent_address" name="edit_permanent_address" placeholder="Permanent Address" type="text"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label for="edit_password" class="col-sm-3 control-label">Password</label>

                  <div class="col-sm-9">
                  <input class="form-control" id="edit_password" autocomplete="off" name="edit_password" placeholder="Password" type="password">
                  </div>
                </div>
              </div>
              <!-- /.box-footer -->
            
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="button" id="edit_fos_button" class="btn btn-primary">Update</button>
      </div>
      </form>
    </div>
  </div>
</div> 
@endsection