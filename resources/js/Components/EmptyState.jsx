export default function EmptyState({ title, description, action }) {
    return (
        <div className="text-center py-12 px-4">
            <p className="text-gray-300 font-medium mb-1">{title}</p>
            {description && (
                <p className="text-sm text-gray-500 mb-4">{description}</p>
            )}
            {action}
        </div>
    );
}