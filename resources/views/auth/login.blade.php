@extends('layouts.admin')
@section('content')

<div class="login-box">
  <div class="login-logo">
    <a href="#">Fortune Store</a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">Sign in to start your session</p>

    <form method="post" action="{{ route('login') }}">
       {{ csrf_field() }}
       <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }} has-feedback">
                           
                                <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" placeholder="Email" autofocus>
                                <span class="glyphicon glyphicon-envelope form-control-feedback"></span> 
                                @if ($errors->has('email'))
                                    <span class="error-msg">
                                        {{ $errors->first('email') }}
                                    </span>
                                @endif
                            
        </div>
      <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }} has-feedback">
                          
                                <input id="password" type="password" class="form-control" name="password" placeholder="Password" >
                                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                                @if ($errors->has('password'))
                                    <span class="error-msg">
                                       {{ $errors->first('password') }}
                                    </span>
                                @endif
                           
      </div>
      <div class="row">
        <div class="col-xs-8">
          <div class="checkbox icheck">
            <label>
              <input type="checkbox"> Remember Me
            </label>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
        </div>
        <!-- /.col -->
      </div>
    </form>

  </div>
  <!-- /.login-box-body -->
</div>
<!-- /.login-box -->        
@endsection  
@extends('layouts.footermain')
