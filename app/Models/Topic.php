<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $fillable = [
        'track_id',
        'title',
        'description',
        'is_completed',
        'order',
        'completed_at',
    ];

    protected $casts = [
        'is_completed' => 'boolean',
        'completed_at' => 'datetime',
    ];

    public function track() 
    {
        return $this->belongsTo(Track::class);
    }

    public function notes() 
    {
        return $this->hasMany(Note::class);
    }

    public function resources() 
    {
        return $this->hasMany(Resource::class);
    }
}
