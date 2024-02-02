<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartSystems;
use App\Models\Plan;
use App\Models\PlanPrice;
use App\Models\Purchase;
use App\Models\PurchaseSystems;
use App\Models\System;
use App\Models\SystemMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function addSystemInCart (Request $request, $id_system)
    {
        $array = ['error' => ''];
 
        $ip = $_SERVER['REMOTE_ADDR'];
        $id_plan = $request->input('id_plan', 0);

        $checkSystem = System::where('id', $id_system)->count();
        $checkPlan = PlanPrice::where('id_system', $id_system)->where('id_plan', $id_plan)->first();

        if($checkSystem < 1 || !$checkPlan) {
            $array = ['error' => 'Envie os parâmetros necessários'];

            return $array;
        }

        if(Auth::check()) {
            $checkCart = Cart::where('id_user', Auth::id())->orWhere('ip', $ip)->first();
        } else {
            $checkCart = Cart::where('ip', $ip)->first();
        }  

        //Verify if the cart already exists
        if($checkCart)
        {
            //Verify if plan is authorized
            $planFreeCheckCart =  CartSystems::where('id_cart', $checkCart->id)->where('id_system', $id_system)->where('id_plan', 4)->count();
            $planFreeCheckPurchase = 0;

            if(Auth::check()) {
                $planFreeCheckPurchaseDB = Purchase::select('id')->where('id_user', Auth::id())->get();
                foreach($planFreeCheckPurchaseDB as $v) {
                    $checkPurchaseSystem = PurchaseSystems::where('id_purchase', $v->id)->where('id_plan', 4)->count();
                    $planFreeCheckPurchase = $planFreeCheckPurchase + $checkPurchaseSystem;
                } 
            } 

            if($id_plan == 4) {
                if($planFreeCheckCart > 0 || $planFreeCheckPurchase > 0) {
                    $data = ['error' => 'plan_free_unauthorized'];
                    return $data;
                }
            }

            //Verify if the system already exists on cart
            $checkSystemInCart = CartSystems::where('id_cart', $checkCart->id)
            ->where('id_system', $id_system)
            ->count();
            
            if($checkSystemInCart === 0) {
                $saveCartSystem = new CartSystems();
                $saveCartSystem->id_system = $id_system;
                $saveCartSystem->id_plan = $id_plan;
                $saveCartSystem->id_cart = $checkCart->id;

                $saveCartSystem->save();
            } else {
                $data['error'] = 'this_system_already_exists_in_cart';
                
                return $data;
            }

            if(Auth::check()) {
                Cart::where('id', $checkCart->id)->update([
                    'ip' => NULL,
                    'id_user' => Auth::id()
                ]);
            }

            Cart::where('id', $checkCart->id)->update([
                'total_amount' => $checkCart->total_amount + $checkPlan->price
            ]);
        } 
            else
        {
            $save = new Cart();
            if(Auth::check()) {
                $save->id_user = Auth::id();
            } else {
                $save->ip = $ip;
            }
            $save->total_amount = $checkPlan->price; 
            $save->save();

            $saveCartSystem = new CartSystems();
            $saveCartSystem->id_system = $id_system;
            $saveCartSystem->id_plan = $id_plan;
            $saveCartSystem->id_cart = $save->id; 
            $saveCartSystem->save();
        } 
        return $array;
    }

    public function getMyCart()
    {   
        $data = ['error' => '']; 

        $ip = $_SERVER['REMOTE_ADDR'];

        if(Auth::check()) { 
            $cart = Cart::select('id', 'total_amount')->where('id_user', Auth::id())->first();
        } else {
            $cart = Cart::select('id', 'total_amount')->where('ip', $ip)->first();
        }
        
        if($cart) {
            $checkCart = CartSystems::where('id_cart', $cart->id)->count();
        } else {
            $checkCart = 0;
        }

        if($checkCart < 1) {
            $data['error'] = 404;

            return $data;
        }

        $data['cart']['summary']['total_amount'] = $cart->total_amount;

        foreach($cart->getSystems as $k => $v)
        {
            if($v->id_plan != 4) {
                $checkPlanFree = [ ['id_plan', '!=', '4'] ];
            } else {
                $checkPlanFree = [];
            }

            $systemInfo = System::select('id', 'name')->where('id', $v->id_system)->first();
            $systemInfoMedia = SystemMedia::select('source')->where('id_system', $v->id_system)->first();

            $price = PlanPrice::select('id_plan', 'price')->where('id_system', $v->id_system)->where('id_plan', $v->id_plan)->first();
            $plans = PlanPrice::select('id_plan')
            ->where('id_system', $v->id_system)
            ->where($checkPlanFree)
            ->orderBy('price', 'ASC')
            ->get();

            $data['cart']['systems'][$k] = [
                'id' => $systemInfo->id,
                'name' => $systemInfo->name,
                'media' => $systemInfoMedia->source,
                'id_plan' => $price->id_plan,
                'price' => number_format($price->price, 2, ',', '.'),
                'plans' => $plans
            ];
        }

        return $data;
    }

    public function changeSystemCart(Request $request, $id_system)
    {
        $data = ['error' => ''];

        $ip = $_SERVER['REMOTE_ADDR'];
        $id_plan = $request->input('id_plan', 0);

        //Check id plan exists
        $checkIdPlan = Plan::where('id', $id_plan)->count();

        if( $checkIdPlan == 0 ) {
            $data['error'] = 'Envie os parâmetros necessários';
            return $data;
        }

        //Check system exists
        $checkSystem = System::where('id', $id_system)->count();

        if( $checkSystem === 0 ) {
            $data['error'] = 'Este sistema não existe';
            return $data;
        }

        if( Auth::check() ) { 
            $cart = Cart::select('id', 'total_amount')->where('id_user', Auth::id())->first();
        } else {
            $cart = Cart::select('id', 'total_amount')->where('ip', $ip)->first();
        }

        if( !$cart ) {
            $data['error'] = 'Não há nada neste carrinho';
            return $data;
        }

        if( $id_plan == 4 ) {
            $checkPlanFree = CartSystems::where('id_cart', $cart->id)->where('id_plan', 4)->count();

            if($checkPlanFree != 0) {
                $data['error'] = 'Você não pode alterar para o plano free';
                return $data;
            }
     
        } else {
            $planAgo =  CartSystems::select('id_plan')->where('id_cart', $cart->id)->where('id_system', $id_system)->first();
    
            CartSystems::where('id_cart', $cart->id)->where('id_system', $id_system)->update([
                'id_plan' => $id_plan
            ]);

            //Geting plan price
            $pricePlanAgo = PlanPrice::select('price')->where('id_plan', $planAgo->id_plan)->where('id_system', $id_system)->first();
            $price = PlanPrice::select('price')->where('id_plan', $id_plan)->where('id_system', $id_system)->first();

            Cart::where('id', $cart->id)->update([
                'total_amount' => ( $cart->total_amount - $pricePlanAgo->price) + $price->price
            ]);
        }

        return $data;
    }

    public function deleteSystemCart($id_system)
    {   
        $data = ['error' => ''];

        $ip = $_SERVER['REMOTE_ADDR'];

        if( Auth::check() ) {
            $cart = Cart::select('id', 'total_amount')->where('id_user', Auth::id())->first();
        } else {
            $cart = Cart::select('id', 'total_amount')->where('ip', $ip)->first();
        }

        if(! $cart) {
            $data['error'] = 'Não há nada neste carrinho';
            return $data;
        }

        //Geting system price in cart
        $cartSystem = CartSystems::select('id_plan')->where('id_system', $id_system)
        ->where('id_cart', $cart->id)
        ->first();

        if(!$cartSystem) {
            $data['error'] = 'Este sistema não está no carrinho';
            return $data;
        }

        $price = PlanPrice::select('price')->where('id_plan', $cartSystem->id_plan)
        ->where('id_system', $id_system)
        ->first();

        Cart::where('id', $cart->id)->update([
            'total_amount' => $cart->total_amount - $price->price
        ]);

        CartSystems::select('id_plan')->where('id_system', $id_system)
        ->where('id_cart', $cart->id)
        ->delete();

        return $data;
    }
}
