<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Models\StudySession;

class StudySessionController extends Controller
{
    public function start(Topic $topic)
    {
        $this->authorize('update', $topic);

        $userId = auth()->id();

        // Fecha qualquer sessão aberta antes de iniciar uma nova
        $openSession = StudySession::where('user_id', $userId)->whereNull('ended_at')->first();
        if ($openSession) {
            $this->closeSession($openSession);
        }

        $session = StudySession::create([
            'user_id' => $userId,
            'track_id' => $topic->track_id,
            'topic_id' => $topic->id,
            'started_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Sessão de estudo iniciada.');
    }

    public function stop(StudySession $studySession)
    {
        if ($studySession->user_id !== auth()->id()) {
            abort(403);
        }

        $this->closeSession($studySession);

        return redirect()->back()->with('success', 'Sessão de estudo encerrada.');
    }

    private function closeSession(StudySession $session): void
    {
        $session->update([
            'ended_at' => now(),
            'duration' => abs((int) round($session->started_at->diffInSeconds(now()))),
        ]);
    }
}
