<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use Auth;

class InvalidateAdminSession {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        $user = Auth::user();
        if ($user && $user->role == 'super_admin') {
            Auth::logout();
        }
        return $next($request);
    }

}
