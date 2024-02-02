<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanPrice extends Model
{
    use HasFactory;

    public $table = 'plans_prices';

    public $timestamps = false;

    //Set connection database
    protected $connection = 'mysqlMain';
}
