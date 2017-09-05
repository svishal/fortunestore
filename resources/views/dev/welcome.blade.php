<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Muli:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
        @if(env('APP_ENV') === 'local')
          <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/css/bootstrap.css" type="text/css">
          <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/css/main.css" type="text/css">

        @else
          <link rel="stylesheet" href="{{url('/',[],env('APP_SSL'))}}/css/packed/style.min.css" type="text/css">
        @endif
         <!-- Styles -->

    </head>
    <body>

    



    
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @if (Auth::check())
                        <a href="{{ url('/home',[],env('APP_SSL')) }}">Home</a>
                    @else
                        <a href="{{ url('/login',[],env('APP_SSL')) }}">Login</a>
                        <a href="{{ url('/register',[],env('APP_SSL')) }}">Register</a>
                    @endif
                </div>
            @endif

            <div class="content">
                <div class="title m-b-md">
                    Hello World!
                </div>
            </div>
        </div>
        @if(env('APP_ENV') === 'local')
        <script src="{{url('/',[],env('APP_SSL'))}}/js/jquery.js"></script>
        <script src="{{url('/',[],env('APP_SSL'))}}/js/popper.min.js"></script>
        <script src="{{url('/',[],env('APP_SSL'))}}/js/bootstrap.min.js"></script>

        @else
          <script src="{{url('/',[],env('APP_SSL'))}}/js/packed/app.min.js"></script>
        @endif

    </body>
</html>
