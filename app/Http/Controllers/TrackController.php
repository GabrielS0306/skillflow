<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Track;
use App\Http\Requests\StoreTrackRequest;
use App\Http\Requests\UpdateTrackRequest;

class TrackController extends Controller
{
    public function index()
    {
        $tracks = auth()->user()->tracks()
            ->withCount(['topics', 'topics as completed_topics_count' => function ($query) {
                $query->where('is_completed', true);
            }])
            ->latest()
            ->get()
            ->map(function ($track) {
                $track->progress = $track->topics_count > 0
                    ? round(($track->completed_topics_count / $track->topics_count) * 100)
                    : 0;
                return $track;
            });

        return Inertia::render('Tracks/Index', [
            'tracks' => $tracks,
        ]);
    }

    public function store(StoreTrackRequest $request)
    {
        auth()->user()->tracks()->create($request->validated());

        return redirect()->back()->with('success', 'Trilha criada com sucesso.');
    }

    public function show(Track $track)
    {
        $this->authorize('view', $track);

        $track->load(['topics' => function ($query) {
            $query->orderBy('order')->with(['notes', 'resources']);
        }]);

        return Inertia::render('Tracks/Show', [
            'track' => $track,
        ]);
    }

    public function update(UpdateTrackRequest $request, Track $track)
    {
        $this->authorize('update', $track);

        $track->update($request->validated());

        return redirect()->back()->with('success', 'Trilha atualizada com sucesso.');
    }

    public function destroy(Track $track)
    {
        $this->authorize('delete', $track);

        $track->delete();

        return redirect()->route('tracks.index')->with('success', 'Trilha excluída com sucesso.');
    }
}