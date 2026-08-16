import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function TopicDependencies({ topic, allTopics }) {
    const [selectedId, setSelectedId] = useState('');

    const availableTopics = allTopics.filter(
        (t) => t.id !== topic.id && !topic.dependencies.some((d) => d.id === t.id)
    );

    function addDependency(e) {
        e.preventDefault();
        if (!selectedId) return;

        router.post(route('topics.dependencies.store', topic.id), {
            depends_on_topic_id: selectedId,
        }, {
            preserveScroll: true,
            onSuccess: () => setSelectedId(''),
            onError: (errors) => {
                if (errors.depends_on_topic_id) {
                    alert(errors.depends_on_topic_id);
                }
            },
        });
    }

    function removeDependency(dependsOnId) {
        router.delete(route('topics.dependencies.destroy', [topic.id, dependsOnId]), {
            preserveScroll: true,
        });
    }

    return (
        <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
            {topic.dependencies.length === 0 ? (
                <p className="text-xs text-gray-500">Este tópico não depende de nenhum outro.</p>
            ) : (
                topic.dependencies.map((dep) => (
                    <div key={dep.id} className="flex items-center justify-between text-sm">
                        <span className={dep.is_completed ? 'text-emerald-400' : 'text-yellow-400'}>
                            {dep.is_completed ? '✓' : '○'} {dep.title}
                        </span>
                        <button onClick={() => removeDependency(dep.id)} className="text-gray-600 hover:text-red-400 text-xs ml-2">
                            remover
                        </button>
                    </div>
                ))
            )}

            {availableTopics.length > 0 && (
                <form onSubmit={addDependency} className="flex gap-2 pt-2">
                    <select
                        value={selectedId}
                        onChange={(e) => setSelectedId(e.target.value)}
                        className="flex-1 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs text-gray-100"
                    >
                        <option value="">Selecione um tópico...</option>
                        {availableTopics.map((t) => (
                            <option key={t.id} value={t.id}>{t.title}</option>
                        ))}
                    </select>
                    <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded text-xs">
                        +
                    </button>
                </form>
            )}
        </div>
    );
}