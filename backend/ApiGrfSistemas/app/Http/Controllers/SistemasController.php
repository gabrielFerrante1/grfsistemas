<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartSystems;
use App\Models\CompaniePurchase; 
use App\Models\PlanPrice; 
use App\Models\System;
use App\Models\SystemMedia;
use App\Models\Comment;
use App\Models\Purchase;
use App\Models\PurchaseSystems;
use Illuminate\Database\Eloquent\Builder; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SistemasController extends Controller
{
    public function getAllSystems(Request $request) 
    {
        $data = ['error' => ''];

        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', System::count());

        $systems = System::with('Plan')
        ->whereHas('Companie', function (Builder $query) {
            $query->from(env('DB_DATABASE_COMPANY').'.companies')->where('status', 0);
        }) 
        ->select('id', 'id_companie', 'id_category', 'name', 'new')
        ->offset($offset)
        ->limit($limit)
        ->orderBy('id', 'ASC')
        ->get();

        $data['systems'] = $systems;

        foreach($systems as $k => $v) {
            $data['systems'][$k]->category_name = $v->category->title;
            $v->plan->price = number_format($v->plan->price, 2, ',', '.');
            unset($v->plan->id);
            unset($v->category);
            unset($v->id_category, $v->id_companie); 
        
            $oneMedia = SystemMedia::where('id_system', $v->id)->first();
            $v->img = $oneMedia->source;
        }

        return $data;
    }

    public function getOneSystem($id)
    {
        $data = [
            'error' => '',
            'planFree' => false,
            'recentPurchase' => [
                'buyBack' => false
            ]
        ];

        $planFreeQuery = [
            ['id_plan', '!=', '4']
        ];

        $check_system =  System::whereHas('Companie', function (Builder $query) {
            $query->from(env('DB_DATABASE_COMPANY').'.companies')->where('status', 0);
        }) 
        ->where('id', $id)
        ->count();

        if($check_system === 0) {
            $data = ['error' => 404];

            return $data;
        }
  
        if(Auth::check()) { 
            //Verify if user have access to plan free
            $checkPlanFree = Purchase::select('id')->where('id_user', Auth::id())->get();
            $checkPlanFreeInCart = Cart::select('id')->where('id_user', Auth::id())->get();
 
            $countCheckPlanFreePurchase = 0;
            foreach($checkPlanFree as $v) {
                $countCheckPlanFreePurchase += PurchaseSystems::where('id_purchase', $v->id) 
                ->where('id_plan', 4)
                ->where('status_id', 2)
                ->count();
            }

            $countCheckPlanFreeInCart = 0;
            foreach($checkPlanFreeInCart as $v) {
                $countCheckPlanFreeInCart += CartSystems::where('id_cart', $v->id) 
                ->where('id_plan', 4)
                ->count();
            }

            if($countCheckPlanFreePurchase === 0 && $countCheckPlanFreeInCart === 0) {
                $planFreeQuery = [];
                
                $data['planFree'] = true; 
            }

            //Verify recent purchase
            $checkPurchaseRecent = PurchaseSystems::select('date_init')->where('id_system', $id)->where('id_user', Auth::id())->where('status_id', 2)->first();

            if($checkPurchaseRecent) { 
                $data['recentPurchase'] = [
                    'buyBack' => true,
                    'date' => date('d/m/y', strtotime($checkPurchaseRecent->date_init))
                ]; 
            }
        }

        $system = System::with('Medias', 'Companie')
        ->whereHas('Companie', function (Builder $query) {
            $query->from(env('DB_DATABASE_COMPANY').'.companies')->where('status', 0);
        }) 
        ->where('id', $id)
        ->select('id', 'id_companie', 'id_category', 'name', 'new', 'description')
        ->first();

        $plans = PlanPrice::select('id_plan', 'price')
        ->where('id_system', $id)
        ->where($planFreeQuery)
        ->orderBy('price', 'ASC')
        ->get();

        $ratingAvg = Comment::select('stars')
        ->where('id_system', $id)
        ->avg('stars');

        $ratingCount = Comment::where('id_system', $id)
        ->count();

        foreach($plans as $v) { 
            $v->price = number_format($v->price, 2, ',', '.');
        } 

        $data['system'] = $system;
        $data['system']->plans = $plans; 
        $data['system']->rating = [
            'count' => $ratingCount,
            'average' => $this->roundStarts($ratingAvg)
        ];
        $data['system']->category_name = $system->category->title;

        //Get Last 60 days sales companie, count systems, rate of companie
        $date_last = date('Y-m-d H:i:s', strtotime('-60 days'));
        
        $countLastSales = CompaniePurchase::where('id_companie', $system->id_companie)
        ->where('date', '>=', $date_last)
        ->count();

        $systemsCompanie = System::select('id')->where('id_companie', $system->id_companie)->get();

        $countSystemsCompanie = 0;
        $avgSystemsCompanie  = 0;
        foreach ($systemsCompanie as $value) {
            $countSystemsCompanie += Comment::where('id_system', $value->id)->count();
            $avgSystemsCompanie += Comment::where('id_system', $value->id)->avg('stars');
        }

        $data['system']->companie['rating'] = $this->roundStarts($avgSystemsCompanie);
        $data['system']->companie['countRatings'] = $countSystemsCompanie;
        $data['system']->companie['countLastSales'] = $countLastSales;
        $data['system']->companie['countSystems'] = count($systemsCompanie);

        //Unset items
        unset (
                $system->category,
                $system->id_category, 
                $system->companie->id_user,
                $system->companie->date_create,
                $system->companie->status,
                $system->id_companie
            );

        foreach($system->medias as $v)
        {
            unset($v->id_system);
        } 

        return $data;
    }

    protected function roundStarts ($ratingAvg) {
        if($ratingAvg == 0) {
            $calcRatingStar = 5;
        } else if($ratingAvg <= 0.5) {
            $calcRatingStar = 0.5;
        } else if($ratingAvg <= 1) {
            $calcRatingStar = 1;
        } else if($ratingAvg <= 1.5) {
            $calcRatingStar = 1.5;
        } else if($ratingAvg <= 2) {
            $calcRatingStar = 2;
        } else if($ratingAvg <= 2.5) {
            $calcRatingStar = 2.5;
        } else if($ratingAvg <= 3) {
            $calcRatingStar = 3;
        } else if($ratingAvg <= 3.5) {
            $calcRatingStar = 3.5;
        } else if($ratingAvg <= 4) {
            $calcRatingStar = 4;
        } else if($ratingAvg <= 4.5) {
            $calcRatingStar = 4.5;
        } else if($ratingAvg <= 5 || $ratingAvg >= 5) {
            $calcRatingStar = 5;
        }
        return $calcRatingStar;
    }

}
