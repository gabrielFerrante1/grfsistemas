<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class System extends Model
{
    use HasFactory; 

    public $timestamps = false;

    //Set connection database
    protected $connection = 'mysqlMain';

    public function Medias ()
    {
        return  $this->hasMany(SystemMedia::class, 'id_system', 'id')->select(['id_system', 'source']);
    } 

    public function Plan ()
    {
        return  $this->hasOne(PlanPrice::class, 'id_system', 'id')
        ->select(['id', 'id_plan', 'price'])
        ->where('id_plan', '!=', 4)
        ->orderBy('price', 'ASC');
    }

    public function Companie ()
    {
        return $this->hasOne(Companie::class, 'id', 'id_companie');
    }

    public function Category ()
    {
        return $this->hasOne(SystemCategory::class, 'id', 'id_category');
    } 
}
