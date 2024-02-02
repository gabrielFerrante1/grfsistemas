<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommentDisLikes extends Model
{
    use HasFactory;

    public $timestamps = false;

    public $table = 'comments_dislikes';

    //Set connection database
    protected $connection = 'mysqlMain';
}
