import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TopicItem from '@/Components/TopicItem';
import NotesDrawer from '@/Components/NotesDrawer';

export default function Show({ track }) {
    const [title, setTitle] = useState('');
    const [activeTopicId, setActiveTopicId] = useState(null);

    const activeTopic = track.topics.find((t) => t.id === activeTopicId) ?? null;

    function addTopic(e) {
        e.preventDefault();
        router.post(route('topics.store'), { track_id: track.id, title }, {
            preserveScroll: true,
            onSuccess: () => setTitle(''),
        });
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-100">{track.title}</h2>}>
            <Head title={track.title} />

            <div className="py-8 max-w-3xl mx-auto px-4">
                {track.description && (
                    <p className="text-gray-400 mb-6">{track.description}</p>
                )}

                <form onSubmit={addTopic} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Novo tópico..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
                        required
                    />
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg">
                        Adicionar
                    </button>
                </form>

                {track.topics.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Nenhum tópico ainda. Adicione o primeiro acima.</p>
                ) : (
                    <div className="space-y-2">
                        {track.topics.map((topic) => (
                            <TopicItem
                                key={topic.id}
                                topic={topic}
                                onOpenNotes={(t) => setActiveTopicId(t.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <NotesDrawer topic={activeTopic} onClose={() => setActiveTopicId(null)} />
        </AuthenticatedLayout>
    );
}