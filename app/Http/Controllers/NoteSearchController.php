<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Inertia\Inertia;
use Illuminate\Http\Request;

class NoteSearchController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id();

        $notes = Note::with(['topic.track'])
            ->whereHas('topic.track', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->get();

        return Inertia::render('Notes/Index', [
            'notes' => $notes,
            'filters' => $request->only('search'),
        ]);
    }
}
