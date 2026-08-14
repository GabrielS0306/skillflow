export default function ProgressBar({ progress = 0 }) {
    return (
        <div className="w-full bg-gray-700 rounded-full h-2">
            <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
} 