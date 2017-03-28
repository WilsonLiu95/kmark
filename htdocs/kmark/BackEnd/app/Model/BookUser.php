<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class BookUser extends Model
{
    protected $table = 'book_user';

    public function book()
    {
        return $this->belongsTo('App\Model\Book');
    }
    public function user()
    {
        return $this->belongsTo('App\Model\User');
    }
}
