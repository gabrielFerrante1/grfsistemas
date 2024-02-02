<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SistemasController;
use Illuminate\Support\Facades\Route;

Route::get('error-login', function() {
   return ['error' => 'Login é necessário'];
})->name('login');

Route::post('/auth/register', [RegisterController::class, 'register']);
Route::post('/auth/login', [LoginController::class, 'login']);
Route::get('/auth/verify-token', [TokenController::class, 'verifyToken']);
Route::middleware('auth')->post('/auth/email-verification', [EmailVerificationController::class, 'setEmailVerification']);
Route::middleware('auth')->get('/auth/check-email-verification', [EmailVerificationController::class, 'checkEmailVerification']);
Route::get('/auth/email-verification/{token}', [EmailVerificationController::class, 'checkTokenEmailVerification']);
Route::post('/auth/password-reset', [PasswordResetController::class, 'setPasswordReset']);
Route::get('/auth/password-reset/{token}', [PasswordResetController::class, 'checkPasswordReset']);
Route::put('/auth/password-reset-new/{token}', [PasswordResetController::class, 'changePasswordReset']);
Route::get('/auth/user-login-saveds', [UserController::class, 'getUserLoginSaveds']);
Route::put('/auth/change-account-{id_user}', [LoginController::class, 'loginChangeAccount']);

//Routes systemas
Route::get('/sistemas', [SistemasController::class, 'getAllSystems']);
Route::get('/sistema/{id}', [SistemasController::class, 'getOneSystem']);
Route::middleware('auth')->get('/sistema/{id}/info-user', [SistemasController::class, 'getOneSystemInfoUserLogged']);

//Routes comments
Route::get('/sistema/{id}/comments', [CommentController::class, 'getCommentsOneSystem']);
Route::middleware('auth')->post('/sistema/{id}/comments', [CommentController::class, 'newOrEditComment']);
Route::middleware('auth')->put('/sistema/comments/{id_comment}', [CommentController::class, 'changeValueLikeAndDislike']);

//Routes cart
Route::get('/cart', [CartController::class, 'getMyCart']);
Route::post('/add-system-in-cart/{id_system}', [CartController::class, 'addSystemInCart']);
Route::put('/edit-system-cart/{id_system}', [CartController::class, 'changeSystemCart']);
Route::delete('/del-system-cart/{id_system}', [CartController::class, 'deleteSystemCart']);

//Routes purchase
Route::middleware('auth')->prefix('/purchase')->group(function() {
   Route::post('/', [PurchaseController::class, 'newPurchase']);
});
Route::get('/check-purchase-token/{token_payment}', [PurchaseController::class, 'checkTokenPurchase']);


//Routes admin
Route::middleware('auth')->get('/my-systems', [AdminController::class, 'getMySystems']);