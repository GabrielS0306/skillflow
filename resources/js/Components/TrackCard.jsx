import { Link } from '@inertiajs/react';
import ProgressBar from './ProgressBar';

export default function TrackCard({ track }) {
    return (
        <Link
            href={route('tracks.show', track.id)}
            className="block bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-emerald-500 transition-colors"
        >
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-100">{track.title}</h3>
                <span className="text-xs text-gray-400 uppercase">{track.status}</span>
            </div>

            {track.description && (
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{track.description}</p>
            )}

            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>{track.completed_topics_count}/{track.topics_count} tópicos</span>
                <span>{track.progress}%</span>
            </div>

            <ProgressBar progress={track.progress} />
        </Link>
    );
}