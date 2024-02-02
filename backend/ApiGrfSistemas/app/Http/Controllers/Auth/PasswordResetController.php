<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\AuthPasswordReset;
use App\Models\TokenPasswordReset;
use App\Models\User;
use DateTime;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class PasswordResetController extends Controller
{
    public function setPasswordReset(Request $request)
    {
        $data = ['error' => ''];

        $email = $request->input('email');

        if(!$email) {
            $data['error'] = 'Envie os parâmetros necessários';
            return $data;
        }

        $checkUser = User::select('id')->where('email', $email)->first();

        if(!$checkUser) {
            $data['error'] = 'user_not_found';
            return $data;
        }

        //Verify if exists an password reset token
        $chekcPasswordReset = TokenPasswordReset::where('user_email', $email)->first();

        if($chekcPasswordReset) {
            $chekcPasswordReset->delete();
        }

        $arraySpecialCharacters = ['$_', '@_'];
        $token = $arraySpecialCharacters[rand(0, 1)].rand(0, 1494221).rand(249, 9941133).rand(0, 2368987).$checkUser->id.rand(0, 194284241).rand(98, 472426881).rand(19, 1888993);

        $save = new TokenPasswordReset();
        $save->token = $token;
        $save->validity = date('y-m-d', strtotime('+1 week'));
        $save->user_email = $email;
        $save->save();

        Mail::to($email)->send(new AuthPasswordReset([
            'token' => $token
        ]));

        return $data;
    }

    public function checkPasswordReset($token)
    {
        $data = ['error' => ''];

        $checkToken = TokenPasswordReset::select('validity')->where('token', $token)->first();

        if(!$checkToken) {
            $data['check_token'] = false;
            return $data;
        }

        $date = new DateTime($checkToken->validity);
        $date2 = new DateTime(date('Y-m-d'));
        $re = $date->diff($date2);

        if($re->y >= 1 || $re->m >= 1 || $re->d > 7) {
            $data['check_token'] = false;
            return $data;
        } else {
            $data['check_token'] = true;
            return $data;
        }

        return $data;
    }

    public function changePasswordReset(Request $request, $token)
    {
        $data = ['error' => ''];

        $password = $request->input('password');

        if(!$password) {
            $data['error'] = 'Envie os parâmetros necessários';
            return $data;
        }
        
        $checkToken = TokenPasswordReset::where('token', $token)->first();

        if(!$checkToken) {
            $data['check_token'] = false;
            return $data;
        }

        $date = new DateTime($checkToken->validity);
        $date2 = new DateTime(date('Y-m-d'));
        $re = $date->diff($date2);

        if($re->y >= 1 || $re->m >= 1 || $re->d > 7) {
            $data['check_token'] = false;
            return $data;
        } else {
            $checkToken->delete();

            User::where('email', $checkToken->user_email)->update([
                'password' => Hash::make($password)
            ]);
        }

        return $data;
    }
}
