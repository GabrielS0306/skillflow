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

    public function dependencies()
    {
        return $this->belongsToMany(Topic::class, 'topic_dependencies', 'topic_id', 'depends_on_topic_id');
    }

    public function dependents()
    {
        return $this->belongsToMany(Topic::class, 'topic_dependencies', 'depends_on_topic_id', 'topic_id');
    }

    public function isBlocked(): bool
    {
        return $this->dependencies()->where('is_completed', false)->exists();
    }

    public function wouldCreateCycle(int $dependsOnTopicId): bool
    {
        if ($dependsOnTopicId === $this->id) {
            return true;
        }

        $visited = [];
        $stack = [$dependsOnTopicId];

        while (!empty($stack)) {
            $currentId = array_pop($stack);

            if ($currentId === $this->id) {
                return true;
            }

            if (in_array($currentId, $visited)) {
                continue;
            }

            $visited[] = $currentId;

            $nextIds = Topic::find($currentId)?->dependencies()->pluck('topics.id')->toArray() ?? [];
            $stack = array_merge($stack, $nextIds);
        }

        return false;
    }
}