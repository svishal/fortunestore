<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>{{ config('app.name', 'Fortune Store') }}</title>
  <!-- Fonts -->
  <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/bower_components/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/bower_components/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/dist/css/custom.css">
  <style type="text/css">
    html{height: 100%;}
  </style>
</head>
<body class="errorpage">
        <div class="wrapper">
    <div class="errorwrap">
<div class="container">
    <div class="col-lg-12 company-logo">Fortune store</div>
  <div class="clearfix"></div>
  <h1>404</h1>
  <h3>Page doesn’t exist or some other error has occurred.<br> Please go to our <a href="/dashboard">home page</a>.</h3>
  
</div>
</div>
           
        </div>
    
<script src="{{url('/',[],env('APP_SSL'))}}/bower_components/jquery/dist/jquery.min.js"></script>
<!-- Bootstrap 3.3.7 -->
<script src="{{url('/',[],env('APP_SSL'))}}/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="{{url('/',[],env('APP_SSL'))}}/js/common.js"></script>
</body>
</html>