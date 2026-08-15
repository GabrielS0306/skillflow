import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function TopicActions({ topic, activeSession, onOpenNotes, onToggleResources, onDestroy }) {
    const [loading, setLoading] = useState(false);
    const isStudyingThis = activeSession?.topic_id === topic.id;

    function startStudying() {
        router.post(route('study-sessions.start', topic.id), {}, {
            preserveScroll: true,
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        });
    }

    function stopStudying() {
        router.patch(route('study-sessions.stop', activeSession.id), {}, {
            preserveScroll: true,
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        });
    }

    return (
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap sm:shrink-0">
            {isStudyingThis ? (
                <button onClick={stopStudying} disabled={loading} className="text-sm text-red-400 hover:text-red-300 disabled:opacity-50 flex items-center gap-1">
                    {loading ? '...' : '⏹ Parar'}
                </button>
            ) : (
                <button
                    onClick={startStudying}
                    disabled={!!activeSession || loading}
                    className="text-sm text-emerald-400 hover:text-emerald-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                >
                    {loading ? '...' : '▶ Estudar'}
                </button>
            )}
            <button onClick={() => onOpenNotes(topic)} className="text-sm text-gray-400 hover:text-emerald-400">
                Anotações {topic.notes?.length > 0 && `(${topic.notes.length})`}
            </button>
            <button onClick={onToggleResources} className="text-sm text-gray-400 hover:text-blue-400">
                Recursos {topic.resources?.length > 0 && `(${topic.resources.length})`}
            </button>
            <button onClick={onDestroy} className="text-gray-500 hover:text-red-400 text-sm">
                Excluir
            </button>
        </div>
    );
}