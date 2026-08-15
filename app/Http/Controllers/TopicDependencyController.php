<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;

class TopicDependencyController extends Controller
{
    public function store(Request $request, Topic $topic)
    {
        $this->authorize('update', $topic);

        $request->validate([
            'depends_on_topic_id' => ['required', 'exists:topics,id'],
        ]);

        $dependsOnId = (int) $request->depends_on_topic_id;

        if ($topic->wouldCreateCycle($dependsOnId)) {
            return redirect()->back()->withErrors([
                'depends_on_topic_id' => 'Essa dependência criaria um ciclo entre tópicos.',
            ]);
        }

        $topic->dependencies()->syncWithoutDetaching([$dependsOnId]);

        return redirect()->back()->with('success', 'Dependência adicionada.');
    }

    public function destroy(Topic $topic, Topic $dependsOnTopic)
    {
        $this->authorize('update', $topic);

        $topic->dependencies()->detach($dependsOnTopic->id);

        return redirect()->back()->with('success', 'Dependência removida.');
    }
}