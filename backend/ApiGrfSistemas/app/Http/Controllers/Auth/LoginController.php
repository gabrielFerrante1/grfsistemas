<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartSystems;
use App\Models\User;
use App\Models\UserLogin;
use App\Models\UserLoginSaved;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    public function login(Request $request) {
        $array = ['error' => ''];

        $creds = $request->only('email', 'password');
        $ip = $_SERVER["REMOTE_ADDR"];
    
        if(!$creds) {
            $data['error'] = 'Envie as credenciais';

            return $data;
        } 

        $token = Auth::attempt($creds);

        if($token) {
            $user = User::select('id', 'name', 'email', 'avatar', 'verified_email')->where('email', $creds['email'])->first();

            if($user->verified_email == 0) {
                $array['verified_email'] = false;
            } else {
                $checkLoginSaved = UserLoginSaved::where('ip', $ip)
                                            ->where('user_id', Auth::id())
                                            ->count();

                if($checkLoginSaved < 1) {
                    //Save account in list
                    $save = new UserLoginSaved();
                    $save->ip = $ip;
                    $save->user_id = Auth::id();
                    $save->save();
                }

                $array['verified_email'] = true;
            }

            $array['token'] = $token;
            $array['user'] = ['name' => $user->name, 'email' => $user->email,'id'=>$user->id];
         
            $chekAuthorize = UserLogin::select('authorize')->where('ip', $ip)->where('id_user', $user->id)->first();

            if($chekAuthorize) {
                if(!$chekAuthorize->authorize) {
                    UserLogin::where('ip', $ip)->where('id_user', $user->id)->update([
                        'authorize' => 1
                    ]);
                }
            } else {
                $save = new UserLogin();
                $save->id_user = $user->id;
                $save->ip = $ip;
                $save->authorize = 1;
                $save->save();
            }

            $checkCart = Cart::select('id')->where('ip', $ip)->first();

            if($checkCart) {
                Cart::where('ip', $ip)->update([
                    'ip' => NULL,
                    'id_user' => $user->id
                ]);
            }
 
        }  else {
            $array['error'] = 'Email ou senha incorretos';
        }
 

        return $array;
    }
  
    public function loginChangeAccount ($id_user)
    {
        $data = ['error' => ''];

        $checkIdUserInList = UserLoginSaved::where('ip', $_SERVER["REMOTE_ADDR"])
                                            ->where('user_id', $id_user)
                                            ->count();

        if($checkIdUserInList > 0) {
            $checkCartUser = false;
            if(Auth::check()) {
                $checkCartUser = Cart::select('id', 'total_amount')->where('id_user', Auth::user()->id)->first();  
            }

            $user = User::where('id', $id_user)->first();

            $token = auth()->login($user);
           
            $checkCart = Cart::select('id')->where('ip', $_SERVER["REMOTE_ADDR"])->first();

            if($checkCart) {
                Cart::where('ip', $_SERVER["REMOTE_ADDR"])->update([
                    'ip' => NULL,
                    'id_user' => $user->id
                ]);
            }

            if($checkCartUser) {
                $checkCartChangeUser = Cart::select('id')->where('id_user', Auth::user()->id)->first();

                if($checkCartChangeUser) {
                    Cart::where('id', $checkCartChangeUser->id)->update([
                        'total_amount' => $checkCartUser->total_amount
                    ]);
                    CartSystems::where('id_cart', $checkCartChangeUser->id)->delete();

                    $idCartChange = $checkCartChangeUser->id;
                } else {
                    $saveCart = new Cart();
                    $saveCart->id_user = Auth::id();
                    $saveCart->total_amount = $checkCartUser->total_amount;
                    $saveCart->save();

                    $idCartChange = $saveCart->id;
                }

                //Readdition or Addition of systems in new cart
                $cartSystems = CartSystems::select('id_system', 'id_plan')->where('id_cart', $checkCartUser->id)->get();
                foreach($cartSystems as $v) {
                    $saveCartSystem = new CartSystems();
                    $saveCartSystem->id_cart = $idCartChange;
                    $saveCartSystem->id_system = $v->id_system;
                    $saveCartSystem->id_plan = $v->id_plan;
                    $saveCartSystem->save();
                }
            } 
            
            $data['token'] = $token;
        } else {
            $data['error'] = 'Cliente não está autorizado a logar em outra conta';
        }

        return $data;
    }
}
