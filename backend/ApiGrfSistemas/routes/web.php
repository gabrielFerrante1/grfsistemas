<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthMethodsController;
use App\Http\Controllers\PaymentController;

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

Route::get('/', function () {
    return view('welcome');
});
//Auth externes
Route::prefix('/auth')->group(function() {
    //Google login 
    Route::get('google/redirect/{type}', [AuthMethodsController::class, 'authWithGoogle']); 
    Route::get('google/looged', [AuthMethodsController::class, 'authWithGoogleServer']); 

    //Facebook login 
    Route::get('facebook/redirect/{type}', [AuthMethodsController::class, 'authWithFacebook']); 
    Route::get('facebook/looged', [AuthMethodsController::class, 'authWithFacebookServer']);
});


//Routes purchase
Route::get('/purchase/payment/{token_payment}', [PaymentController::class, 'makePayment']);
Route::get('/purchase/payment-event-success', [PaymentController::class, 'paymentSuccess'])->name('paymentSuccess');
Route::get('/purchase/payment-event-error', [PaymentController::class, 'paymentError'])->name('paymentError');