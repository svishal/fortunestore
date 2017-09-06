<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'PLEASE RELEASE ME ') }}</title>

     <!-- Fonts -->
     <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Muli:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css">
      @if(env('APP_ENV') === 'local')
        <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/css/bootstrap.css" type="text/css">
        <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/css/main.css" type="text/css">
      @else
        <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/css/packed/style.min.css" type="text/css">
      @endif
      <script>
        baseurl = "{{ url('/') }}";
      </script>
</head>
<body class="dashbaordpage">

<nav class="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">


<!-- Brand -->
<a class="navbar-brand" href="#">Fortune Store</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>
<!-- Links -->
<div class="collapse navbar-collapse justify-content-end" id="nav-content">   
<ul class="navbar-nav">
<li class="nav-item">
<a class="nav-link" href="#"><img src="{{url('/',[],env('APP_SSL'))}}/images/ic_search.png" alt="search" /></a>
</li>

<li class="nav-item dropdown">
<a class="nav-link pr-0" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <span class="user-img">JW</span>
</a>
<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">{{ csrf_field() }}</form>
<a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" class="dropdown-item">Logout</a>
</div>
</li>
</ul>
</nav>

@yield('content')

   <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">{{ csrf_field() }}</form>

    <!-- Scripts -->
    @if(env('APP_ENV') === 'local')
      <script src="{{url('/',[],env('APP_SSL'))}}/js/jquery.js"></script>
      <script src="{{url('/',[],env('APP_SSL'))}}/js/popper.min.js"></script>
      <script src="{{url('/',[],env('APP_SSL'))}}/js/bootstrap.min.js"></script>
      <script src="{{url('/',[],env('APP_SSL'))}}/js/custom/shows.js"></script>
    @else
      <script src="{{url('/',[],env('APP_SSL'))}}/js/packed/app.min.js"></script>
    @endif
</body>
</html>
