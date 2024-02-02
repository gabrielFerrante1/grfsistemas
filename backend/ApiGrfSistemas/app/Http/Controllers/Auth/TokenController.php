<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserLogin;
use Illuminate\Support\Facades\Auth;
use JWTAuth;

class TokenController extends Controller
{
    public function verifyToken(Request $request) {
        $data = ['error' => ''];

        if(Auth::check()) {
            $data['user'] = User::select('id', 'name', 'email', 'verified_email')->where('id', Auth::id())->first();
            $checkIpAuthorization = UserLogin::where('id_user', $data['user']->id)->where('authorize', 1)->where('ip', $_SERVER["REMOTE_ADDR"])->first();

            if($checkIpAuthorization && $data['user']->verified_email) {
                $data['authorize'] = true; 
            } else {
                $data['authorize'] = false;
                $data['token'] = '';
            }

            return $data;
        } else {
            $data['error'] = 'Token inválido';

            return $data;
        }
    } 
}
