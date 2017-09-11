@extends('layouts.app')
@section('content')
<div class="wrapper">
  @include('layouts.sidebar')
<div class="register-box">
  <div class="register-box-body">
    <p class="login-box-msg">Settings</p>
    @if (Session::has('save_message'))
    <div class="alert alert-info">{{ Session::get('save_message') }}</div>
    @endif
    <form id="update_settings_form" action="/update_settings" method="post">
       {{ csrf_field() }}
      <div class="form-group has-feedback">
        <input type="text" class="form-control" name="name" id="name" value="{{Auth::user()->name}}">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
        <span class="error-msg text-left error-block name_error"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="email" class="form-control" name="email" placeholder="Email" value="{{Auth::user()->email}}" readonly="readonly">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" name="password" id="password" class="form-control" placeholder="Password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" id="confirm_password" placeholder="Confirm password">
        <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
      </div>
      <span class="error-msg text-left error-block password_error"></span>
      <div class="row">
        <div class="col-xs-8">
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" id="update_settings" class="btn btn-primary btn-block btn-flat">Register</button>
        </div>
        <!-- /.col -->
      </div>
    </form>
  </div>
  <!-- /.form-box -->
</div>
<!-- /.register-box -->
</div>
@endsection