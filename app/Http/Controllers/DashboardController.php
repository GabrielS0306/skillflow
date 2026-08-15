<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() 
    {
        $user = auth()->user();

        $tracks = $user->tracks()
        ->withCount([
            'topics',
            'topics as completed_topics_count' => function ($query) {
                $query->where('is_completed', true);
            }
        ])
        ->get()
        ->map(function ($track) {
            $track->progress = $track->topics_count > 0
                ? round(($track->completed_topics_count / $track->topics_count) * 100)
                : 0;

            return $track;
        });

        $totalTracks = $tracks->count();
        $completedTracks = $tracks->where('status','concluido')->count();
        $totalTopics = $tracks->sum('topics_count');
        $completedTopics = $tracks->sum('completed_topics_count');
        $overallProgress = $totalTopics > 0 ? round(($completedTopics / $totalTopics) * 100) : 0;
        $totalNotes = \App\Models\Note::whereHas('topic.track', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->count();

        $activeTracks = $tracks->whereIn('status', ['em_andamento', 'planejado'])->take(5);

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalTracks' => $totalTracks,
                'completedTracks' => $completedTracks,
                'totalTopics' => $totalTopics,
                'completedTopics' => $completedTopics,
                'overallProgress' => $overallProgress,
                'totalNotes' => $totalNotes,
            ],
            'activeTracks' => $activeTracks->values(),
        ]);
    }
}
