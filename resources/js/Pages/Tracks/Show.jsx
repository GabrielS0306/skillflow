import { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TopicItem from '@/Components/TopicItem';
import NotesDrawer from '@/Components/NotesDrawer';
import EmptyState from '@/Components/EmptyState';
import Modal from '@/Components/Modal';

export default function Show({ track }) {
    const [activeTopicId, setActiveTopicId] = useState(null);
    const [showTopicModal, setShowTopicModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const topicForm = useForm({
        track_id: track.id,
        title: '',
    });

    const editForm = useForm({
        title: track.title,
        description: track.description ?? '',
        status: track.status,
    });

    const activeTopic = track.topics.find((t) => t.id === activeTopicId) ?? null;

    function submitTopic(e) {
        e.preventDefault();
        topicForm.post(route('topics.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setShowTopicModal(false);
                topicForm.reset('title');
            },
        });
    }

    function submitEdit(e) {
        e.preventDefault();
        editForm.patch(route('tracks.update', track.id), {
            onSuccess: () => setShowEditModal(false),
        });
    }

    function destroyTrack() {
        if (confirm('Excluir esta trilha? Todos os tópicos, anotações e recursos serão perdidos.')) {
            router.delete(route('tracks.destroy', track.id));
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <nav className="text-sm text-gray-500 mb-1">
                        <Link href={route('tracks.index')} className="hover:text-gray-300">Trilhas</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-300">{track.title}</span>
                    </nav>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-100">{track.title}</h2>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowEditModal(true)}
                                className="text-sm text-gray-400 hover:text-gray-200 border border-gray-700 rounded-lg px-3 py-1.5"
                            >
                                Editar
                            </button>
                            <button
                                onClick={destroyTrack}
                                className="text-sm text-red-400/70 hover:text-red-400"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            }
        >
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
                    <EmptyState
                        title="Nenhum tópico ainda"
                        description="Adicione o primeiro tópico para começar a estruturar esta trilha."
                    />
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
                <form onSubmit={submitTopic} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Título do tópico"
                        value={topicForm.data.title}
                        onChange={(e) => topicForm.setData('title', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
                        required
                    />
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowTopicModal(false)} className="px-4 py-2 text-gray-400">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={topicForm.processing}
                            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg"
                        >
                            {topicForm.processing ? 'Criando...' : 'Criar'}
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal show={showEditModal} onClose={() => setShowEditModal(false)} title="Editar trilha">
                <form onSubmit={submitEdit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Título"
                        value={editForm.data.title}
                        onChange={(e) => editForm.setData('title', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
                        required
                    />
                    <textarea
                        placeholder="Descrição (opcional)"
                        value={editForm.data.description}
                        onChange={(e) => editForm.setData('description', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
                        rows={3}
                    />
                    <select
                        value={editForm.data.status}
                        onChange={(e) => editForm.setData('status', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
                    >
                        <option value="planejado">Planejado</option>
                        <option value="em_andamento">Em andamento</option>
                        <option value="pausado">Pausado</option>
                        <option value="concluido">Concluído</option>
                        <option value="arquivado">Arquivado</option>
                    </select>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 text-gray-400">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={editForm.processing}
                            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg"
                        >
                            {editForm.processing ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </Modal>

            <NotesDrawer topic={activeTopic} onClose={() => setActiveTopicId(null)} />
        </AuthenticatedLayout>
    );
}