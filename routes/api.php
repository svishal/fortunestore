<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => '/v1', 'middleware' => ['JsonHeaders']], function() {
    Route::post('login', '\App\Modules\Api\V1\Controllers\FeetOnStreetController@login');
   
    Route::group(['middleware' => ['checkAccesstoken']], function() {
        Route::post('get_customer_balance', '\App\Modules\Api\V1\Controllers\CustomerController@getBalance');
        Route::post('customers/{id}/money', '\App\Modules\Api\V1\Controllers\CustomerController@addMoney');
        Route::post('customers/{id}/expenditures', '\App\Modules\Api\V1\Controllers\CustomerController@addExpenditures');
        
        
    });
});
