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
  <!-- Ionicons -->
  <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/bower_components/Ionicons/css/ionicons.min.css">
  <!-- iCheck for checkboxes and radio inputs -->
  <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/plugins/iCheck/all.css">
  <!-- Select2 -->
  <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/bower_components/select2/dist/css/select2.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
  folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/dist/css/skins/_all-skins.min.css">
  <!-- DataTables -->
  <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
  <!-- Toggle -->
  <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/bower_components/bootstrap-toggle/css/bootstrap-toggle.min.css">
  <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
  <!-- Google Font -->
  <link rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<body class="hold-transition  skin-blue sidebar-mini">
@yield('content')
@include('layouts.footer')
@include('layouts.footermain')
</body>
</html>