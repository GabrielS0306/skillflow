import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmptyState from '@/Components/EmptyState';

export default function Index({ notes, filters }) {
    const [search, setSearch] = useState(filters.search ?? '');

    function handleSearchChange(e) {
        const value = e.target.value;
        setSearch(value);
        router.get(route('notes.index'), { search: value }, {
            preserveState: true,
            replace: true,
        });
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-100">Minhas Anotações</h2>}>
            <Head title="Anotações — SkillFlow" />

            <div className="py-8 max-w-3xl mx-auto px-4">
                <input
                    type="text"
                    placeholder="Buscar por termo (ex: middleware, SOLID, eager loading)..."
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 mb-6"
                />

                {notes.length === 0 ? (
                    <EmptyState
                        title={search ? 'Nenhuma anotação encontrada' : 'Nenhuma anotação ainda'}
                        description={search ? 'Tente buscar por outro termo.' : 'Suas anotações de todos os tópicos vão aparecer aqui.'}
                    />
                ) : (
                    <div className="space-y-3">
                        {notes.map((note) => (
                            <Link
                                key={note.id}
                                href={route('tracks.show', note.topic.track.id)}
                                className="block bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-emerald-500 transition-colors"
                            >
                                <p className="text-xs text-gray-500 mb-1">
                                    {note.topic.track.title} / {note.topic.title}
                                </p>
                                {note.title && (
                                    <p className="text-sm font-medium text-gray-200 mb-1">{note.title}</p>
                                )}
                                <p className="text-sm text-gray-400 line-clamp-2">{note.content}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}