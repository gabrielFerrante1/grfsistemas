<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\TokenRedirectProvider;
use App\Models\User;
use App\Models\UserData;
use Illuminate\Http\Request;
use App\Models\UserLogin;
use App\Models\UserLoginSaved;
use Illuminate\Support\Facades\Auth;
use Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthMethodsController extends Controller
{ 

    public function authWithGoogle($type)
    { 
        session_start();
    
        if($type == 'login') {
            $_SESSION['type_auth'] = 'login';
        } else {
            $_SESSION['type_auth'] = 'register';
        }
        
        return Socialite::driver('google')->redirect();
    }

    public function authWithGoogleServer()
    {
        session_start();

        try {
            $ip = $_SERVER["REMOTE_ADDR"];
            $user =  Socialite::driver('google')->user();

            if(empty($_SESSION['type_auth']) || $_SESSION['type_auth'] == 'login') {
                if($user->user['email_verified']) {
                    $finduser = UserData::select('user_id')->where('google_id', $user->id)->first();
                } else {
                    $finduser = false;
                }

                if($finduser) {
                    $user = User::find($finduser->user_id);

                    $checkLoginSaved = UserLoginSaved::where('ip', $ip)
                                                    ->where('user_id', $user->id)
                                                    ->count();

                    if($checkLoginSaved < 1) {
                        //Save account in list
                        $save = new UserLoginSaved();
                        $save->ip = $ip;
                        $save->user_id = $user->id;
                        $save->save();
                    } 

                    $checkCart = Cart::where('ip', $ip)->first();

                    if($checkCart) {
                        Cart::where('ip', $ip)->update([
                            'ip' => NULL,
                            'id_user' => $user->id
                        ]);
                    }
    
                    $token = JWTAuth::fromUser($user);
    
                    return redirect(
                        env('APP_URL_FRONT').'/api/auth/authentication?type=login_social&token='.$token
                    );
                } else {
                    return redirect(
                        env('APP_URL_FRONT').'/api/auth/authentication?type=login_social&error=not_found_account'
                    );
                }
            } else {
                if($user->user['email_verified']) {
                    $authorizeRegister = User::where('email', $user->email)->count();
                } else {
                    $authorizeRegister = 1;
                }

                if($authorizeRegister < 1) {
                    $arrayLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z'];
                    $token = strtoupper($arrayLetters[rand(0, 24)]).$arrayLetters[rand(4, 24)].rand(0, 99383881).$arrayLetters[rand(4, 24)].rand(90, 91983930).$user->id.rand(0, 191930).$arrayLetters[rand(0, 24)].$arrayLetters[rand(0, 24)].rand(19, 99999918).$arrayLetters[rand(0, 24)].rand(0, 183).$arrayLetters[rand(0, 24)].$arrayLetters[rand(0, 24)].rand(0, 14491883).$arrayLetters[rand(0, 24)].rand(0, 84578);

                    $save = new TokenRedirectProvider();
                    $save->token = $token;
                    $save->clientId = $user->id;
                    $save->email = $user->email;
                    $save->avatar = $user->avatar;
                    $save->provider = 'google';
                    $save->save();

                    return redirect(
                        env('APP_URL_FRONT').'/auth/register?stateToken='.$token.'&name='.$user->name.'&email='.$user->email
                    );
                } else {
                    return redirect(
                        env('APP_URL_FRONT').'/auth/register?error=email_already_exists'
                    );
                }
            }

        } catch (Exception $e) {
            return json_encode(['error' => 'Ocorreu um error inesperado com o google!']);
        } 
    }
 

    public function authWithFacebook($type)
    {
        session_start();

        if($type == 'login') {
            $_SESSION['type_auth'] = 'login';
        } else {
            $_SESSION['type_auth'] = 'register';
        }

        return Socialite::driver('facebook')->redirect();
    }

    public function authWithFacebookServer()
    {
        session_start();

        try {
            $ip = $_SERVER["REMOTE_ADDR"];
            $user =  Socialite::driver('facebook')->user();
         
            if(empty($_SESSION['type_auth']) || $_SESSION['type_auth'] == 'login') {
                if($user->user['email_verified']) {
                    $finduser = UserData::select('user_id')->where('facebook_id', $user->id)->first();
                } else {
                    $finduser = false;
                } 
    
                if($finduser) {
                    $user = User::find($finduser->user_id);

                    $checkLoginSaved = UserLoginSaved::where('ip', $ip)
                                            ->where('user_id', $user->id)
                                            ->count();

                    if($checkLoginSaved < 1) {
                        //Save account in list
                        $save = new UserLoginSaved();
                        $save->ip = $ip;
                        $save->user_id = $user->id;
                        $save->save();
                    } 

                    $checkCart = Cart::where('ip', $ip)->first();

                    if($checkCart) {
                        Cart::where('ip', $ip)->update([
                            'ip' => NULL,
                            'id_user' => $user->id
                        ]);
                    }
    
                    $token = JWTAuth::fromUser($user);
    
                    return redirect(
                        env('APP_URL_FRONT').'/api/auth/authentication?type=login_social&token='.$token
                    );
                } else {
                    return redirect(
                        env('APP_URL_FRONT').'/api/auth/authentication?type=login_social&error=not_found_account'
                    );
                }
            } else {
                if($user->user['email_verified']) {
                    $authorizeRegister = User::where('email', $user->email)->count();
                } else {
                    $authorizeRegister = 1;
                }

                if($authorizeRegister < 1) {
                    $arrayLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z'];
                    $token = strtoupper($arrayLetters[rand(0, 24)]).$arrayLetters[rand(4, 24)].rand(0, 99383881).$arrayLetters[rand(4, 24)].rand(90, 91983930).$user->id.rand(0, 191930).$arrayLetters[rand(0, 24)].$arrayLetters[rand(0, 24)].rand(19, 99999918).$arrayLetters[rand(0, 24)].rand(0, 183).$arrayLetters[rand(0, 24)].$arrayLetters[rand(0, 24)].rand(0, 14491883).$arrayLetters[rand(0, 24)].rand(0, 84578);
                   
                    $save = new TokenRedirectProvider();
                    $save->token = $token;
                    $save->clientId = $user->id;
                    $save->email = $user->email;
                    $save->avatar = $user->avatar;
                    $save->provider = 'facebook';
                    $save->save();

                    return redirect(
                        env('APP_URL_FRONT').'/auth/register?stateToken='.$token.'&name='.$user->name.'&email='.$user->email
                    );
                } else { 
                    return redirect(
                        env('APP_URL_FRONT').'/auth/register?error=email_already_exists'
                    );
                }
            }

        } catch (Exception $e) {
            return json_encode(['error' => 'Ocorreu um error inesperado com a meta!']);
        }
    }
}
