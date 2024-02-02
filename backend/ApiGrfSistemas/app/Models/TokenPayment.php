<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TokenPayment extends Model
{
    use HasFactory;

    public $table = 'token_payments';

    //Set connection database
    protected $connection = 'mysqlMain';
}
