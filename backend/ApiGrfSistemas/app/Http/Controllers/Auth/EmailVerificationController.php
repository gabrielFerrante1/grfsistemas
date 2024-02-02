<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\AuthVerificationEMail;
use App\Models\TokenEmailVerification;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class EmailVerificationController extends Controller
{
    public function getClientLogged()
    {
        return Auth::user();
    }

    public function setEmailVerification()
    {   
        $data = ['error' => ''];
    
        $checkVerifiedEmail = User::where('id', $this->getClientLogged()->id)->where('verified_email', 1)->count();
        $checkToken = TokenEmailVerification::select('token')->where('user_id', $this->getClientLogged()->id)->first();

        if($checkVerifiedEmail > 0) 
        {
            $data['error'] = 'Esta conta já tem o email verificado';

            return $data;
        }

        if($checkToken) 
        {
            Mail::to($this->getClientLogged()->email)->send(new AuthVerificationEMail(
                [
                    'name' => $this->getClientLogged()->name,
                    'token' => $checkToken->token
                ]
            ));
        } else 
        {
            $arraySpecialCharacters = ['$_', '@_'];
            $token = $arraySpecialCharacters[rand(0, 1)].rand(0, 194221).rand(249, 99133).rand(0, 2368987).$this->getClientLogged()->id.rand(0, 194284241).rand(98, 472426881);
            
            $save = new TokenEmailVerification();
            $save->user_id = $this->getClientLogged()->id;
            $save->token = $token;
            $save->save();

            Mail::to($this->getClientLogged()->email)->send(new AuthVerificationEMail(
                [
                    'name' => $this->getClientLogged()->name,
                    'token' => $token
                ]
            ));
        }

        return $data;
    }

    public function checkEmailVerification()
    {
        $data = ['error' => ''];

        $checkVerifiedEmail = User::select('verified_email')
                                    ->where('id', $this->getClientLogged()->id)
                                    ->where('verified_email', 1)
                                    ->first();
        
        if($checkVerifiedEmail) {
            $data['verified_email'] = true;
        } else {
            $data['verified_email'] = false;
        }

        return $data;
    }

    public function checkTokenEmailVerification($token)
    {
        $data = ['error' => ''];

        $checkToken = TokenEmailVerification::where('token', $token)->first();

        if($checkToken) {
            TokenEmailVerification::where('token', $token)->delete();

            //Update modal
            User::where('id', $checkToken->user_id)->update([
                'verified_email' => 1
            ]);

            $data['check_token'] = true;
        } else {
            $data['check_token'] = false;
        }

        return $data;
    }
}
