import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TrackCard from '@/Components/TrackCard';
import Modal from '@/Components/Modal';
import EmptyState from '@/Components/EmptyState';

export default function Index({ tracks, filters }) {
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');

    const { data, setData, post, processing, reset } = useForm({
        title: '',
        description: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('tracks.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    }

    function applyFilters(newSearch, newStatus) {
        router.get(route('tracks.index'), { search: newSearch, status: newStatus }, {
            preserveState: true,
            replace: true,
        });
    }

    function handleSearchChange(e) {
        setSearch(e.target.value);
        applyFilters(e.target.value, status);
    }

    function handleStatusChange(e) {
        setStatus(e.target.value);
        applyFilters(search, e.target.value);
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-100">Minhas Trilhas</h2>}>
            <Head title="Trilhas — SkillFlow" />

            <div className="py-8 max-w-5xl mx-auto px-4">
                <div className="flex flex-col sm:flex-row gap-3 justify-between mb-6">
                    <div className="flex flex-col sm:flex-row gap-3 flex-1">
                        <input
                            type="text"
                            placeholder="Buscar trilhas..."
                            value={search}
                            onChange={handleSearchChange}
                            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 text-sm flex-1"
                        />
                        <select
                            value={status}
                            onChange={handleStatusChange}
                            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 text-sm"
                        >
                            <option value="">Todos os status</option>
                            <option value="planejado">Planejado</option>
                            <option value="em_andamento">Em andamento</option>
                            <option value="pausado">Pausado</option>
                            <option value="concluido">Concluído</option>
                            <option value="arquivado">Arquivado</option>
                        </select>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap"
                    >
                        + Nova trilha
                    </button>
                </div>

                {tracks.length === 0 ? (
                    <EmptyState
                        title={search || status ? 'Nenhuma trilha encontrada' : 'Você ainda não tem nenhuma trilha'}
                        description={search || status ? 'Tente ajustar a busca ou os filtros.' : 'Crie sua primeira trilha para começar a organizar seus estudos.'}
                    />
                ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                        {tracks.map((track) => (
                            <TrackCard key={track.id} track={track} />
                        ))}
                    </div>
                )}
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)} title="Nova trilha">
                <form onSubmit={submit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Título"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
                        required
                    />
                    <textarea
                        placeholder="Descrição (opcional)"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
                        rows={3}
                    />
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400">
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
        </AuthenticatedLayout>
    );
}   