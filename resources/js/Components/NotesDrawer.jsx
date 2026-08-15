import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function NotesDrawer({ topic, onClose }) {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    const isOpen = topic !== null;

    function submit(e) {
        e.preventDefault();
        router.post(route('notes.store'), {
            topic_id: topic.id,
            title,
            content,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setTitle('');
                setContent('');
            },
        });
    }

    function destroyNote(noteId) {
        if (confirm('Excluir esta anotação?')) {
            router.delete(route('notes.destroy', noteId), { preserveScroll: true });
        }
    }

    function togglePin(note) {
        router.patch(route('notes.update', note.id), {
            title: note.title,
            content: note.content,
            is_pinned: !note.is_pinned,
        }, { preserveScroll: true });
    }

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-700 z-50 transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {topic && (
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
                            <h3 className="text-gray-100 font-semibold">Anotações — {topic.title}</h3>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-300">✕</button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                            {topic.notes.length === 0 ? (
                                <EmptyState
                                    title="Nenhuma anotação ainda"
                                    description="Registre o que você aprendeu sobre este tópico."
                                />
                            ) : (
                                [...topic.notes]
                                    .sort((a, b) => b.is_pinned - a.is_pinned)
                                    .map((note) => (
                                        <div key={note.id} className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                                            <div className="flex items-start justify-between mb-1">
                                                {note.title && (
                                                    <span className="text-sm font-medium text-gray-200">{note.title}</span>
                                                )}
                                                <div className="flex gap-2 ml-auto">
                                                    <button
                                                        onClick={() => togglePin(note)}
                                                        className={note.is_pinned ? 'text-emerald-400' : 'text-gray-600 hover:text-gray-400'}
                                                        title="Fixar"
                                                    >
                                                        📌
                                                    </button>
                                                    <button
                                                        onClick={() => destroyNote(note.id)}
                                                        className="text-gray-600 hover:text-red-400"
                                                        title="Excluir"
                                                    >
                                                        🗑
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-400 whitespace-pre-wrap">{note.content}</p>
                                        </div>
                                    ))
                            )}
                        </div>

                        <form onSubmit={submit} className="px-5 py-4 border-t border-gray-700 space-y-2">
                            <input
                                type="text"
                                placeholder="Título (opcional)"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100"
                            />
                            <textarea
                                placeholder="Escreva sua anotação..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100"
                                rows={3}
                                required
                            />
                            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg text-sm">
                                Salvar anotação
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}