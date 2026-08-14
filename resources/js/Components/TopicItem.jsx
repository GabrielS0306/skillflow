import { router } from '@inertiajs/react';

export default function TopicItem({ topic }) {
    function toggle() {
        router.patch(route('topics.toggle', topic.id), {}, { preserveScroll: true });
    }

    function destroy() {
        if (confirm('Excluir este tópico?')) {
            router.delete(route('topics.destroy', topic.id), { preserveScroll: true });
        }
    }

    return (
        <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
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

            <button onClick={destroy} className="text-gray-500 hover:text-red-400 text-sm">
                Excluir
            </button>
        </div>
    );
}