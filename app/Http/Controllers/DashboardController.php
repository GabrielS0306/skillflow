<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\StudySession;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $tracks = $user->tracks()
            ->withCount(['topics', 'topics as completed_topics_count' => function ($query) {
                $query->where('is_completed', true);
            }])
            ->get()
            ->map(function ($track) {
                $track->progress = $track->topics_count > 0
                    ? round(($track->completed_topics_count / $track->topics_count) * 100)
                    : 0;
                return $track;
            });

        $totalTracks = $tracks->count();
        $completedTracks = $tracks->where('status', 'concluido')->count();
        $totalTopics = $tracks->sum('topics_count');
        $completedTopics = $tracks->sum('completed_topics_count');
        $overallProgress = $totalTopics > 0 ? round(($completedTopics / $totalTopics) * 100) : 0;
        $totalNotes = Note::whereHas('topic.track', function ($query) use ($user) {
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
                'totalStudyTime' => $this->formatDuration($this->totalStudyTime($user->id)),
                'currentStreak' => $this->currentStreak($user->id),
                'mostStudiedTrack' => $this->mostStudiedTrack($user->id),
            ],
            'activeTracks' => $activeTracks->values(),
            'weekChart' => $this->weekChart($user->id),
        ]);
    }

    private function totalStudyTime(int $userId): int
    {
        return StudySession::where('user_id', $userId)
            ->whereNotNull('duration')
            ->sum('duration');
    }

    private function weekChart(int $userId): array
    {
        $days = collect(range(6, 0))->map(fn ($i) => Carbon::today()->subDays($i));

        return $days->map(function ($day) use ($userId) {
            $seconds = StudySession::where('user_id', $userId)
                ->whereNotNull('duration')
                ->whereDate('started_at', $day)
                ->sum('duration');

            return [
                'label' => $day->translatedFormat('D'),
                'minutes' => intdiv($seconds, 60),
            ];
        })->toArray();
    }

    private function currentStreak(int $userId): int
    {
        $studyDates = StudySession::where('user_id', $userId)
            ->whereNotNull('duration')
            ->selectRaw('DATE(started_at) as day')
            ->distinct()
            ->pluck('day')
            ->map(fn ($d) => Carbon::parse($d)->toDateString())
            ->flip();

        $streak = 0;
        $cursor = Carbon::today();

        while ($studyDates->has($cursor->toDateString())) {
            $streak++;
            $cursor->subDay();
        }

        return $streak;
    }

    private function mostStudiedTrack(int $userId): ?string
    {
        $result = StudySession::where('user_id', $userId)
            ->whereNotNull('duration')
            ->with('track')
            ->selectRaw('track_id, SUM(duration) as total')
            ->groupBy('track_id')
            ->orderByDesc('total')
            ->first();

        return $result?->track?->title;
    }

    private function formatDuration(int $seconds): string
    {
        $hours = intdiv($seconds, 3600);
        $minutes = intdiv($seconds % 3600, 60);

        if ($hours > 0) {
            return "{$hours}h {$minutes}min";
        }

        return "{$minutes}min";
    }
}