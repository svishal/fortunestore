@extends('layouts.app')
@section('content')
<div class="wrapper">

   <header class="main-header">
    <!-- Logo -->
    <a href="#" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>S</b>tore</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>Store</b></span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="{{url('/',[],env('APP_SSL'))}}/images/user2-160x160.jpg" class="user-image" alt="User Image">
              <span class="hidden-xs">Alexander Pierce</span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img src="{{url('/',[],env('APP_SSL'))}}/images/user2-160x160.jpg" class="img-circle" alt="User Image">

                <p>
                  Alexander Pierce - Web Developer
                  <small>Member since Nov. 2012</small>
                </p>
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-right">
                  <a href="/logout" class="btn btn-default btn-flat">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
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
            <div class="box-header">History</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                   <th>Sr No.</th>
                  <th>Order Date</th>
                  <th>Mobile No.</th>
                  <th>Product Purchased</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Grand Total</th>
                  <th>Balance</th>
                </tr>
                </thead>
                 <tbody>
                  @php $sr = 1; @endphp
                 @foreach($customer_purchase_list as $customer_purchase_column=>$customer_purchase_value)
                 @php $purchased_items = json_decode($customer_purchase_value['purchased_items'])@endphp
                 @php $item_array = array() @endphp
                 @php $quantity_array = array() @endphp
                 @php $amount_array = array() @endphp
                 @foreach($purchased_items as $purchased_item_value)
                 @php $item_array[] = $purchased_item_value->item; @endphp
                 @php $quantity_array[] = $purchased_item_value->quantity; @endphp
                 @php $amount_array[] = $purchased_item_value->amount; @endphp
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
                  <td>800.00</td>
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