import { useState } from 'react';
import { router } from '@inertiajs/react';
import TopicActions from './TopicActions';
import TopicResources from './TopicResources';

export default function TopicItem({ topic, onOpenNotes, activeSession }) {
    const [showResources, setShowResources] = useState(false);
    const [toggling, setToggling] = useState(false);

    function toggle() {
        router.patch(route('topics.toggle', topic.id), {}, {
            preserveScroll: true,
            onStart: () => setToggling(true),
            onFinish: () => setToggling(false),
        });
    }

    function destroy() {
        if (confirm('Excluir este tópico?')) {
            router.delete(route('topics.destroy', topic.id), { preserveScroll: true });
        }
    }

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <input
                        type="checkbox"
                        checked={topic.is_completed}
                        onChange={toggle}
                        disabled={toggling}
                        className="w-5 h-5 rounded accent-emerald-500 cursor-pointer shrink-0 disabled:opacity-50"
                    />
                    <span className={`truncate ${topic.is_completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                        {topic.title}
                    </span>
                </div>

                <TopicActions
                    topic={topic}
                    activeSession={activeSession}
                    onOpenNotes={onOpenNotes}
                    onToggleResources={() => setShowResources(!showResources)}
                    onDestroy={destroy}
                />
            </div>

            {showResources && <TopicResources topic={topic} />}
        </div>
    );
}