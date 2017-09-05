<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Routing\Redirector;
use Illuminate\Http\Request;
use Illuminate\Foundation\Applicaion;

class JsonHeaders {

    public function handle($request, Closure $next) {

        $response = $next($request);
       if(isset($request->format) && $request->format !='html'){
        $response->header('Content-type', 'application/json');
        $response->header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, HEAD, OPTIONS');
        $response->header('Access-Control-Allow-Origin', '*');
       }
        return $response;
        
    }

}
