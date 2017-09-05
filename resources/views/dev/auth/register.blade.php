@extends('layouts.app')

@section('content')

                    <form class="form-horizontal" method="POST" action="{{ route('register') }}" id="admin_registration_form">
                        {{ csrf_field() }}


                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                           

                        
                                <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" autofocus placeholder="Name">

                                @if ($errors->has('name'))
                                    <span class="error-msg">
                                        {{ $errors->first('name') }}
                                    </span>
                                @endif
                           
                        </div>

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            

                            
                                <input id="email" type="email" class="form-control" name="email" placeholder="Email" value="{{ old('email') }}" >

                                @if ($errors->has('email'))
                                    <span class="error-msg">
                                        {{ $errors->first('email') }}
                                    </span>
                                @endif
                           
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            

                            
                                <input id="password" type="password" class="form-control" placeholder="Password" name="password" >
                                <span class="show-password" id="show_hide"><i class="fa fa-eye"></i></span>
                                @if ($errors->has('password'))
                                    <span class="error-msg">
                                        {{ $errors->first('password') }}
                                    </span>
                                @endif
                           
                        </div>

                        <div class="form-group">
                          

                            
                                <input id="password-confirm" type="password" class="form-control" placeholder="Confirm Password" name="password_confirmation">
                        </div>

                        <div class="btn-group">
                            
                                <button type="submit" class="btn btn-secondary">
                                    Register
                                </button>
                           
                        </div>
                        <p class="caption">Already have account? <a href="{{ url('/login',[],env('APP_SSL')) }}">Login</a></p>
</form>
               
@endsection
