<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\FeetOnStreet;

class checkAccesstoken {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        $access_token = $request->bearerToken();
        if (isset($access_token) && !empty($access_token)) {  
            $user = FeetOnStreet::where('access_token', $access_token)->get()->first();
            if ($user) {
                \App\Traits\Rest::setAuthorizedUser($user);

                return $next($request);
            } else {               

                return ['success' => false, 'message' => 'Invalid Access token'];
            }
        } else {
            return ['success' => false, 'message' => 'Invalid Access token'];
        }
        
    }

}
