<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\TokenRedirectProvider;
use App\Models\User;
use App\Models\UserData;
use App\Models\UserLogin;
use App\Models\UserLoginSaved;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class RegisterController extends Controller
{
    public function register(Request $request) {
        $data = ['error' => '']; 

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);

        if($validator->fails()) {
            $array['error'] = $validator->messages()->first();
            return $array;
        }
 
        $ip = $_SERVER["REMOTE_ADDR"];
        $name = $request->input('name');
        $email = $request->input('email');
        $password = $request->input('password');
        $stateToken = $request->input('token'); 

        $checkEmailAlreadyExists = User::where('email', $email)->count();

        if($checkEmailAlreadyExists > 0) {
            $data['error'] = 'email_already_exists';
            return $data;
        }

        $checkStateToken = false;
        $verified_email = 0;
        if($stateToken) {
            $checkStateToken = TokenRedirectProvider::select('provider', 'clientId', 'email', 'avatar')->where('token', $stateToken)->first();
 
            if($checkStateToken) {
                TokenRedirectProvider::where('email', $checkStateToken->email)->delete();

                $verified_email = 1;
                $email = $checkStateToken->email;
                $avatar = $checkStateToken->avatar;
            }
        }

        $newUser = new User();
        if(isset($avatar)) $newUser->avatar = $avatar;
        $newUser->name = $name;
        $newUser->email = $email;
        $newUser->password = password_hash($password, PASSWORD_DEFAULT);
        $newUser->verified_email = $verified_email;
        $newUser->save();

        //Salvando autorização
        $saveAuthorize = new UserLogin();
        $saveAuthorize->id_user = $newUser->id;
        $saveAuthorize->ip = $ip;
        $saveAuthorize->authorize = 1;
        $saveAuthorize->save();

        //Salvando provider do login
        $saveUserData = new UserData();
        $saveUserData->user_id = $newUser->id;
        $saveUserData->ip_origin = $ip;
        if($checkStateToken) {
            switch ($checkStateToken->provider) {
                case 'google':
                    $saveUserData->google_id = $checkStateToken->clientId;
                    break;
                case 'facebook':
                    $saveUserData->facebook_id = $checkStateToken->clientId; 
            }
        }
        $saveUserData->save();

        if($verified_email) {
            //Save account in list
            $save = new UserLoginSaved();
            $save->ip = $ip;
            $save->user_id = $newUser->id;
            $save->save();
        }

        $logged = JWTAuth::fromUser(User::where('email', $email)->first());

        $data['token'] = $logged;
        $data['verified_email'] = $verified_email;

        return  $data;
    }
}
