<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartSystems;
use Illuminate\Http\Request;
use App\Models\FailedCode;
use App\Models\Purchase;
use App\Models\PurchaseSystems;
use App\Models\TokenPayment;
use Illuminate\Support\Facades\Auth;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaymentController extends Controller
{
    
    public function makePayment (Request $request, $tokenPayment)
    {   
        $id_purchase = $this->checkTokenPayment($tokenPayment);
        $methodPayment = $request->input('method_payment', 'paypal');

        if(!$id_purchase) return redirect(env('APP_URL_FRONT'));
        
        $purchase = Purchase::select('total_amount')->where('id', $id_purchase)->first();

        if($methodPayment == 'paypal') {
            $provider = new PayPalClient;
            $provider->setApiCredentials(config('paypal'));
            $provider->getAccessToken();

            $response = $provider->createOrder([
                "intent" => "CAPTURE",
                "application_context" => [
                    "return_url" => route('paymentSuccess', ['tokenPayment' => $tokenPayment]),
                    "cancel_url" => route('paymentError', ['tokenPayment' => $tokenPayment]),
                ],
                "purchase_units" => [
                    0 => [
                        "amount" => [
                            "currency_code" => "BRL",
                            "value" => $purchase->total_amount
                        ]
                    ]
                ],
            ]);

            if(isset($response['id']) && $response['id'] != null) {
                // redirect to approve href
                foreach ($response['links'] as $links) {
                    if ($links['rel'] == 'approve') {
                        return redirect()->away($links['href']);
                    }
                }
            } else {
                FailedCode::create([
                    'ip_request' => $request->ip(),
                    'service' => 'Paypal payment request',
                    'exception' => $response['error']['message'] ?  $response['error']['message'] : 'NULL',
                    'path' => $request->url()
                ]);

                return redirect(env('APP_URL_FRONT').'/carrinho?tokenPayment='.$tokenPayment.'&error=paypal_unavailable');
            }
        }
    }

    public function paymentSuccess(Request $request)
    {    
        $tokenPayment = $request->input('tokenPayment', 'default');
        $id_purchase = $this->checkTokenPayment($tokenPayment);

        if(!$id_purchase) return redirect(env('APP_URL_FRONT'));

        $purchase = Purchase::select('id_user')->where('id', $id_purchase)->first();

        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();
        $response = $provider->capturePaymentOrder($request['token']);

        if (isset($response['status']) && $response['status'] == 'COMPLETED') {
            //Deleting cart of user after payment success
            $checkCart = Cart::select('id')->where('id_user', $purchase->id_user)->first();

            if($checkCart) {
                Cart::where('id', $checkCart->id)->update([
                    'total_amount' => 0
                ]);
                CartSystems::where('id_cart', $checkCart->id)->delete();
            }

            //Changing purchase status
            Purchase::where('id', $id_purchase)->update(['payment_status' => 1]);
            PurchaseSystems::where('id_purchase', $id_purchase)->update(['status_id' => 2]);

            return redirect(env('APP_URL_FRONT').'/carrinho?tokenPayment='.$tokenPayment.'&success=1');
        } else {
            return redirect(env('APP_URL_FRONT').'/carrinho?tokenPayment='.$tokenPayment.'&error=paypal_unavailable');
        } 
    }

    public function paymentError(Request $request)
    {    
        $tokenPayment = $request->input('tokenPayment', 'default');
        $id_purchase = $this->checkTokenPayment($tokenPayment);

        if(!$id_purchase) return redirect(env('APP_URL_FRONT'));

        $purchase = Purchase::select('id_user')->where('id', $id_purchase)->first();

        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();
        $response = $provider->capturePaymentOrder($request['token']);

        //Changing purchase status
        PurchaseSystems::where('id_purchase', $id_purchase)->update(['status_id' => 3]);
    
        return redirect(env('APP_URL_FRONT').'/carrinho?tokenPayment='.$tokenPayment.'&error=payapal_transaction_canceled');
    }

    /* Function to check token payment */
    protected function checkTokenPayment($token)
    {
        $return = false;

        $checkToken = TokenPayment::select('purchase_id')->where('token', $token)->first();

        if($checkToken) {
            $return = $checkToken->purchase_id;
        }

        return $return;
    }

    /* Function to get client logged */
    protected function getClientLogged()
    {
        return Auth::user();
    }
}
