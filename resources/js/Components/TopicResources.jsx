import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function TopicResources({ topic }) {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [adding, setAdding] = useState(false);

    function addResource(e) {
        e.preventDefault();
        router.post(route('resources.store'), {
            topic_id: topic.id,
            title,
            url,
        }, {
            preserveScroll: true,
            onStart: () => setAdding(true),
            onFinish: () => setAdding(false),
            onSuccess: () => {
                setTitle('');
                setUrl('');
            },
        });
    }

    function destroyResource(resourceId) {
        if (confirm('Remover este recurso?')) {
            router.delete(route('resources.destroy', resourceId), { preserveScroll: true });
        }
    }

    return (
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={adding}
                    className="w-1/3 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs text-gray-100 disabled:opacity-50"
                    required
                />
                <input
                    type="url"
                    placeholder="https://..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={adding}
                    className="flex-1 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs text-gray-100 disabled:opacity-50"
                    required
                />
                <button type="submit" disabled={adding} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-3 py-1 rounded text-xs">
                    {adding ? '...' : '+'}
                </button>
            </form>
        </div>
    );
}