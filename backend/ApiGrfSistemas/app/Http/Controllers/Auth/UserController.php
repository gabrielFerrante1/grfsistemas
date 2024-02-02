<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\UserLoginSaved;

class UserController extends Controller
{
    public function getUserLoginSaveds ()
    {
        $data = ['error' => ''];

        $getLoginSaveds = UserLoginSaved::select('connected', 'user_id')
                            ->with('user')
                            ->where('ip', $_SERVER["REMOTE_ADDR"])
                            ->get();

        foreach($getLoginSaveds as $v) {
            unset($v->user_id);
        }

        $data['users'] = $getLoginSaveds;
    
        return $data;
    }
}
