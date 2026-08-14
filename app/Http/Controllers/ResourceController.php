<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Models\Resource;
use App\Http\Requests\StoreResourceRequest;
use App\Http\Requests\UpdateResourceRequest;


class ResourceController extends Controller
{
    public function store(StoreResourceRequest $request)
    {
        $topic = Topic::findOrFail($request->topic_id);
        $this->authorize('update', $topic);

        $topic->resources()->create($request->validated());

        return redirect()->back()->with('success', 'Recurso adicionado com sucesso.');
    }

    public function update(UpdateResourceRequest $request, Resource $resource)
    {
        $this->authorize('update', $resource);

        $resource->update($request->validated());

        return redirect()->back()->with('success', 'Recurso atualizado com sucesso.');
    }

    public function destroy(Resource $resource)
    {
        $this->authorize('delete', $resource);

        $resource->delete();

        return redirect()->back()->with('success', 'Recurso excluído com sucesso.');
    }
}
