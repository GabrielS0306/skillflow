export default function WeekChart({ data }) {
    const max = Math.max(...data.map((d) => d.minutes), 1);

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-4">Minutos estudados nos últimos 7 dias</p>
            <div className="flex items-end justify-between gap-2 h-32">
                {data.map((day, i) => (
                    <div key={i} className="flex flex-col items-center flex-1 gap-2">
                        <div className="w-full flex items-end justify-center h-24">
                            <div
                                className="w-full max-w-8 bg-emerald-500 rounded-t transition-all duration-300"
                                style={{
                                    height: day.minutes > 0 ? `${(day.minutes / max) * 100}%` : '2px',
                                }}
                                title={`${day.minutes} min`}
                            />
                        </div>
                        <span className="text-xs text-gray-500 capitalize">{day.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}