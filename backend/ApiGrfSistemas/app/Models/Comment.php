<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    public $timestamps = false;

    //Set connection database
    protected $connection = 'mysqlMain';

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'id_user')->select('id', 'avatar', 'name');
    }
 
}
