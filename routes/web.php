<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', 'Auth\LoginController@showLoginForm');
Auth::routes();
Route::post('login', 'Auth\LoginController@loginAdmin');
Route::post('add_customer', 'CustomerController@addCustomer');
Route::post('add_fos', 'FeetOnStreetController@addFos');

Route::any('edit_customer', 'CustomerController@editCustomer');
Route::post('edit_fos', 'FeetOnStreetController@editFos');

Route::get('get_customer_info', 'CustomerController@getCustomerInfo');
Route::get('get_fos_info', 'FeetOnStreetController@getFosInfo');

Route::get('change_customer_status', 'CustomerController@changeCustomerStatus');
Route::get('change_fos_status', 'FeetOnStreetController@changeFosStatus');


Route::resource('/shows', 'ShowController');

Route::get('/dashboard','CustomerController@index');
Route::get('/fos_list','FeetOnStreetController@index');
Route::get('/customer_history/{id}','ExpenditureItemsController@index');
Route::get('/home', 'HomeController@index')->name('home');
Route::get('logout', 'Auth\LoginController@logout');
