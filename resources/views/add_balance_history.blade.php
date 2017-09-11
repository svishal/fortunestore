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
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped">
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
@endsection