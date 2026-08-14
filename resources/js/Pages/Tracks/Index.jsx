import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TrackCard from '@/Components/TrackCard';

export default function Index({ tracks }) {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function submit(e) {
        e.preventDefault();
        router.post(route('tracks.store'), { title, description }, {
            onSuccess: () => {
                setShowModal(false);
                setTitle('');
                setDescription('');
            },
        });
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-100">Minhas Trilhas</h2>}>
            <Head title="Trilhas" />

            <div className="py-8 max-w-5xl mx-auto px-4">
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        + Nova trilha
                    </button>
                </div>

                {tracks.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                        <p className="mb-2">Você ainda não tem nenhuma trilha.</p>
                        <p className="text-sm">Crie sua primeira trilha para começar a organizar seus estudos.</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                        {tracks.map((track) => (
                            <TrackCard key={track.id} track={track} />
                        ))}
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
                    <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-100 mb-4">Nova trilha</h3>
                        <form onSubmit={submit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Título"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
                                required
                            />
                            <textarea
                                placeholder="Descrição (opcional)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
                                rows={3}
                            />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400">
                                    Cancelar
                                </button>
                                <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg">
                                    Criar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}