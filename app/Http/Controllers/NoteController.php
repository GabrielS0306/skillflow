<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\Topic;
use App\Http\Requests\StoreNoteRequest;
use App\Http\Requests\UpdateNoteRequest;


class NoteController extends Controller
{
    public function store(StoreNoteRequest $request)
    {
        $topic = Topic::findOrFail($request->topic_id);
        $this->authorize('update', $topic);

        $topic->notes()->create($request->validated());

        return redirect()->back()->with('success', 'Anotação criada com sucesso.');
    }

    public function update(UpdateNoteRequest $request, Note $note)
    {
        $this->authorize('update', $note);

        $note->update($request->validated());

        return redirect()->back()->with('success', 'Anotação atualizada com sucesso.');
    }

    public function destroy(Note $note)
    {
        $this->authorize('delete', $note);

        $note->delete();

        return redirect()->back()->with('success', 'Anotação excluída com sucesso.');
    }
}
