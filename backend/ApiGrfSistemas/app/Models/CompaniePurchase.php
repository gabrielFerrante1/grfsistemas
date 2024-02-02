<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompaniePurchase extends Model
{
    use HasFactory;

    public $table = 'companies_purchases';

    public $timestamps = false;

    //Set connection database
    protected $connection = 'mysqlCompany';
}
