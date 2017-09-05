@extends('layouts.app')

@section('content')

                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form class="form-horizontal" method="POST" action="{{ route('password.email') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            

                            
                                <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" placeholder="E-Mail">

                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                           
                        </div>

                        <div class="btn-group">
                            
                                <button type="submit" class="btn btn-secondary">
                                    Send Password Reset Link
                                </button>
                            
                        </div>
                    </form>
             
@endsection
