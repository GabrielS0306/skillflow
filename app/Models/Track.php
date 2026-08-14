<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'status',
    ];

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function topics() 
    {
        return $this->hasMany(Topic::class);
    }
}