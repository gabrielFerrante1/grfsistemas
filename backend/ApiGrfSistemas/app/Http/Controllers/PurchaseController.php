<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Purchase;
use App\Models\PurchaseSystems;
use App\Models\TokenPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PurchaseController extends Controller
{
    public function newPurchase()
    {  
        $data = ['error' => ''];

        //Date
        date_default_timezone_set('America/Sao_Paulo');

        $cart = Cart::select('id', 'total_amount')->where('id_user', $this->getClientLogged()->id)->first();
        if(!$cart || count($cart->getSystems) == 0) {
            return ['error' => 'Este cliente não tem um carrinho'];
        }

        //Checking if cart only have one system free
        $checkOneSystemFreeInCart = 0;
        foreach ($cart->getSystems as  $v) {
            if($v->id_plan == 4) {
                $checkOneSystemFreeInCart = 1;
            } else {
                $checkOneSystemFreeInCart = 0;
            }
        }

        if($checkOneSystemFreeInCart) {
            $data['noPaymentRequired'] = true;
        } else {
            $data['noPaymentRequired'] = false;
        }

        //Save new purchase
        $savePurchase = new Purchase();
        $savePurchase->id_user = $this->getClientLogged()->id;
        $savePurchase->total_amount = $cart->total_amount;
        $savePurchase->payment_status = $checkOneSystemFreeInCart ? 1 : 0;
        $savePurchase->save();

        foreach($cart->getSystems as $v) {
            $checkPurchaseSystem = PurchaseSystems::select('id')->where('id_user', $this->getClientLogged()->id)
                                                    ->where('id_system', $v->id_system)
                                                    ->first();
            if($checkPurchaseSystem) {
                PurchaseSystems::where('id', $checkPurchaseSystem->id)->update([
                    'id_plan' => $v->id_plan,
                    'id_purchase' => $savePurchase->id,
                    'repurchased' => 1, 
                    'date_init' => date('Y-m-d H:i:s'),
                    'status_id' => $checkOneSystemFreeInCart ? 2 : 1
                ]);
            } else {
                $savePurchaseSystem = new PurchaseSystems();
                $savePurchaseSystem->id_user = $this->getClientLogged()->id;
                $savePurchaseSystem->id_purchase = $savePurchase->id;
                $savePurchaseSystem->id_system = $v->id_system;
                $savePurchaseSystem->id_plan = $v->id_plan;
                $savePurchaseSystem->status_id = $checkOneSystemFreeInCart ? 2 : 1;
                $savePurchaseSystem->date_init = date('Y-m-d H:i:s');
                $savePurchaseSystem->save();
            }
        }

        $arrayLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z'];
        $token = strtoupper($arrayLetters[rand(0, 24)]).rand(0, 99381).$savePurchase->id.rand(0, 92829).rand(90, 91390).$this->getClientLogged()->id.rand(0, 91823).rand(0, 183).uniqid(rand(93, 1937));

        $saveToken = new TokenPayment(); 
        $saveToken->token = $token;
        $saveToken->purchase_id = $savePurchase->id;
        $saveToken->user_id = $this->getClientLogged()->id; 
        $saveToken->save();
        
        $data['token_payment'] = $token;

        return $data;
    }

    public function checkTokenPurchase($tokenPayment)
    {
        $data = ['error' => ''];

        $checkToken = TokenPayment::select('purchase_id')->where('token', $tokenPayment)->first();
        
        if($checkToken) {
            $checkStatusPayment = Purchase::where('id', $checkToken->purchase_id)
                                        ->where('payment_status', 1)
                                        ->count();

            if($checkStatusPayment) {
                TokenPayment::where('token', $tokenPayment)->delete();
            } 

            $data['token_payment'] = true;
        } else {
            $data['token_payment'] = false;
        }

        return $data;
    }

    /* Function to get client logged */
    protected function getClientLogged()
    {
        return Auth::user();
    }

}
