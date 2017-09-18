@extends('layouts.app')
@section('content')
<div class="wrapper">
  @include('layouts.sidebar')
<!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
      Daily Purchase
      </h1>
     <a class="pull-right btn btn-primary" href="javascript:history.back()">Back</a>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">

          <div class="box">
            <div class="box-header">History</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
            <div class="table-responsive">
              <table id="purchase_history" class="table table-bordered table-striped">
                <thead>
                <tr>
                   <th>Sr No.</th>
                  <th>Order Date</th>
                  <th>Article</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
                </thead>
                 <tbody>
                  @php $sr = 1; @endphp
                 @foreach($daily_purchase_list as $daily_purchase_column=>$daily_purchase_value)
                 @foreach($daily_purchase_value as $key=>$value)
                <tr class="odd gradeX">
                  <td>{{$sr}}</td>
                  <td>{{date('d-m-Y', strtotime($value['order_date']))}}</td>
                  <td>{{$key}}</td>
                  <td>{{$value['quantity']}}</td>
                  <td>{{$value['amount']}}</td>
                </tr>
                @php $sr++; @endphp

                @endforeach
                @endforeach
              </tbody>
              </table>
            </div>  
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