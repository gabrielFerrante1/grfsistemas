<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FailedCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip_request',
        'service',
        'exception',
        'path'
    ];

    public $table = 'failed_codes';
 
    //Set connection database
    protected $connection = 'mysqlMain';
}
