<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Models\Track;
use App\Http\Requests\StoreTopicRequest;
use App\Http\Requests\UpdateTopicRequest;

class TopicController extends Controller
{
    public function store(StoreTopicRequest $request) 
    {
        $track = Track::findOrFail($request->track_id);
        $this->authorize('update', $track);

        $lastOrder = $track->topics()->max('order') ?? 0;

        $track->topics()->create([
            ...$request->validated(),
            'order' => $lastOrder + 1,
        ]);

        return redirect()->back()->with('success', 'Tópico criado com sucesso.');
    }

    public function update(UpdateTopicRequest $request, Topic $topic)  
    {
        $this->authorize('update', $topic);

        $topic->update($request->validated());

        return redirect()->back()->with('sucess', 'Tópico atualizado com sucesso.');
    }

    public function toggle(Topic $topic)
    {
        $this->authorize('update', $topic);

        if (!$topic->is_completed && $topic->isBlocked()) {
            return redirect()->back()->withErrors([
                'topic' => 'Este tópico depende de outros ainda não concluídos.',
            ]);
        }

        $topic->update([
            'is_completed' => ! $topic->is_completed,
            'completed_at' => ! $topic->is_completed ? now() : null,
        ]);

        return redirect()->back()->with('success', 'Status do tópico atualizado.');
    }

    public function destroy(Topic $topic) 
    {
        $this->authorize('delete', $topic);

        $topic->delete();

        return redirect()->back()->with('success', 'Status do tópico atualizado.');
    }
}
