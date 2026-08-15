import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TopicItem from '@/Components/TopicItem';
import NotesDrawer from '@/Components/NotesDrawer';
import Modal from '@/Components/Modal';

export default function Show({ track }) {
    const [activeTopicId, setActiveTopicId] = useState(null);
    const [showTopicModal, setShowTopicModal] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        track_id: track.id,
        title: '',
    });

    const activeTopic = track.topics.find((t) => t.id === activeTopicId) ?? null;

    function submit(e) {
        e.preventDefault();
        post(route('topics.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setShowTopicModal(false);
                reset('title');
            },
        });
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-100">{track.title}</h2>}>
            <Head title={`${track.title} — SkillFlow`} />

            <div className="py-8 max-w-3xl mx-auto px-4">
                {track.description && (
                    <p className="text-gray-400 mb-6">{track.description}</p>
                )}

                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setShowTopicModal(true)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        + Novo tópico
                    </button>
                </div>

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

            <Modal show={showTopicModal} onClose={() => setShowTopicModal(false)} title="Novo tópico">
                <form onSubmit={submit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Título do tópico"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
                        required
                    />
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowTopicModal(false)} className="px-4 py-2 text-gray-400">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg"
                        >
                            {processing ? 'Criando...' : 'Criar'}
                        </button>
                    </div>
                </form>
            </Modal>

            <NotesDrawer topic={activeTopic} onClose={() => setActiveTopicId(null)} />
        </AuthenticatedLayout>
    );
}