import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function TopicItem({ topic, onOpenNotes }) {
    const [showResources, setShowResources] = useState(false);
    const [resTitle, setResTitle] = useState('');
    const [resUrl, setResUrl] = useState('');

    function toggle() {
        router.patch(route('topics.toggle', topic.id), {}, { preserveScroll: true });
    }

    function destroy() {
        if (confirm('Excluir este tópico?')) {
            router.delete(route('topics.destroy', topic.id), { preserveScroll: true });
        }
    }

    function addResource(e) {
        e.preventDefault();
        router.post(route('resources.store'), {
            topic_id: topic.id,
            title: resTitle,
            url: resUrl,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setResTitle('');
                setResUrl('');
            },
        });
    }

    function destroyResource(resourceId) {
        if (confirm('Remover este recurso?')) {
            router.delete(route('resources.destroy', resourceId), { preserveScroll: true });
        }
    }

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={topic.is_completed}
                        onChange={toggle}
                        className="w-5 h-5 rounded accent-emerald-500 cursor-pointer"
                    />
                    <span className={topic.is_completed ? 'line-through text-gray-500' : 'text-gray-100'}>
                        {topic.title}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={() => onOpenNotes(topic)} className="text-sm text-gray-400 hover:text-emerald-400">
                        Anotações {topic.notes?.length > 0 && `(${topic.notes.length})`}
                    </button>
                    <button onClick={() => setShowResources(!showResources)} className="text-sm text-gray-400 hover:text-blue-400">
                        Recursos {topic.resources?.length > 0 && `(${topic.resources.length})`}
                    </button>
                    <button onClick={destroy} className="text-gray-500 hover:text-red-400 text-sm">
                        Excluir
                    </button>
                </div>
            </div>

            {showResources && (
                <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
                    {topic.resources.length === 0 ? (
                        <p className="text-xs text-gray-500">Nenhum recurso ainda.</p>
                    ) : (
                        topic.resources.map((resource) => (
                            <div key={resource.id} className="flex items-center justify-between text-sm">
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline truncate"
                                >
                                    {resource.title}
                                </a>
                                <button onClick={() => destroyResource(resource.id)} className="text-gray-600 hover:text-red-400 text-xs ml-2">
                                    remover
                                </button>
                            </div>
                        ))
                    )}

                    <form onSubmit={addResource} className="flex gap-2 pt-2">
                        <input
                            type="text"
                            placeholder="Título"
                            value={resTitle}
                            onChange={(e) => setResTitle(e.target.value)}
                            className="w-1/3 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs text-gray-100"
                            required
                        />
                        <input
                            type="url"
                            placeholder="https://..."
                            value={resUrl}
                            onChange={(e) => setResUrl(e.target.value)}
                            className="flex-1 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs text-gray-100"
                            required
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs">
                            +
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}