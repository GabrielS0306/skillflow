export default function StatCard({ label, value }) {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <p className="text-sm text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-semibold text-gray-100">{value}</p>
        </div>
    );
}