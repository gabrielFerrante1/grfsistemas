<?php

namespace App\Http\Controllers;

use App\Models\PurchaseSystems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function getMySystems()
    {
        $data = ['error' => ''];
 
        $mySystems = PurchaseSystems::select('id_system', 'status_id')->with('system')->where('id_user', Auth::id())->get();

        $data['systems'] = $mySystems;
    
        return $data;
    }

 
}
