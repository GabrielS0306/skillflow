import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import TrackCard from '@/Components/TrackCard';
import EmptyState from '@/Components/EmptyState';

export default function Dashboard({ stats, activeTracks }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-100">Dashboard</h2>}>
            <Head title="Dashboard — SkillFlow" />

            <div className="py-8 max-w-5xl mx-auto px-4 space-y-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    <StatCard label="Trilhas" value={stats.totalTracks} />
                    <StatCard label="Concluídas" value={stats.completedTracks} />
                    <StatCard label="Tópicos" value={`${stats.completedTopics}/${stats.totalTopics}`} />
                    <StatCard label="Progresso geral" value={`${stats.overallProgress}%`} />
                    <StatCard label="Anotações" value={stats.totalNotes} />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-100">Trilhas ativas</h3>
                        <Link href={route('tracks.index')} className="text-sm text-emerald-400 hover:underline">
                            Ver todas
                        </Link>
                    </div>

                    {activeTracks.length === 0 ? (
                        <EmptyState
                            title="Nenhuma trilha ativa"
                            description="Crie uma trilha para começar a acompanhar seu progresso aqui."
                        />
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-4">
                            {activeTracks.map((track) => (
                                <TrackCard key={track.id} track={track} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}