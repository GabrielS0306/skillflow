import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import TrackCard from '@/Components/TrackCard';
import EmptyState from '@/Components/EmptyState';
import WeekChart from '@/Components/WeekChart';

export default function Dashboard({ stats, activeTracks, weekChart }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-100">Dashboard</h2>}>
            <Head title="Dashboard — SkillFlow" />

            <div className="py-8 max-w-5xl mx-auto px-4 space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <StatCard label="Trilhas" value={stats.totalTracks} />
                    <StatCard label="Concluídas" value={stats.completedTracks} />
                    <StatCard label="Tópicos" value={`${stats.completedTopics}/${stats.totalTopics}`} />
                    <StatCard label="Progresso geral" value={`${stats.overallProgress}%`} />
                    <StatCard label="Anotações" value={stats.totalNotes} />
                    <StatCard label="Tempo estudado" value={stats.totalStudyTime} />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                        <p className="text-sm text-gray-400 mb-1">Sequência atual</p>
                        <p className="text-2xl font-semibold text-gray-100">
                            {stats.currentStreak} {stats.currentStreak === 1 ? 'dia' : 'dias'}
                        </p>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:col-span-2">
                        <p className="text-sm text-gray-400 mb-1">Trilha mais estudada</p>
                        <p className="text-2xl font-semibold text-gray-100">
                            {stats.mostStudiedTrack ?? '—'}
                        </p>
                    </div>
                </div>

                <WeekChart data={weekChart} />

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