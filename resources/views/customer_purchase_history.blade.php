@extends('layouts.app')
@section('content')
<div class="wrapper">
  @include('layouts.sidebar')
<!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        {{ucwords($mobile_number_of_customer->name)}}
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
                  <th>Mobile No.</th>
                  <th>Product Purchased</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Grand Total</th>
                </tr>
                </thead>
                 <tbody>
                  @php $sr = 1; @endphp
                 @foreach($customer_purchase_list as $customer_purchase_column=>$customer_purchase_value)
                 @php $purchased_items = $customer_purchase_value['purchased_items']@endphp
                 @php $item_array = array() @endphp
                 @php $quantity_array = array() @endphp
                 @php $amount_array = array() @endphp
                 @foreach($purchased_items as $purchased_item_value)
                 @php $item_array[] = $purchased_item_value['item']; @endphp
                 @php $quantity_array[] = $purchased_item_value['quantity']; @endphp
                 @php $amount_array[] = $purchased_item_value['amount']; @endphp
                 @php $item_result_array = implode(',',$item_array);@endphp
                 @php $quantity_result_array = implode(',',$quantity_array);@endphp
                 @php $amount_result_array = implode(',',$amount_array);@endphp
                 @endforeach
                <tr class="odd gradeX">
                  <td>{{$sr}}</td>
                  <td>{{date('d-m-Y', strtotime($customer_purchase_value['order_date']))}}</td>
                  <td>{{$mobile_number_of_customer->mobile_no}}</td>
                  <td><span>{{$item_result_array}}</span></td>
                  <td><span>{{$quantity_result_array}}</span></td>
                  <td><span>{{$amount_result_array}}</span></td>
                  <td>{{$customer_purchase_value['total_amount']}}</td>
                </tr>
                 @php $sr++; @endphp
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