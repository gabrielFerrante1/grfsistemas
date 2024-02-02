<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TokenRedirectProvider extends Model
{
    use HasFactory;

    public $table = 'token_redirect_register_providers';
     
    //Set connection database
    protected $connection = 'mysqlMain';
}
