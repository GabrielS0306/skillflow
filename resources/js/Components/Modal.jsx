export default function Modal({ show, onClose, title, children, maxWidth = 'md' }) {
    if (!show) return null;

    const maxWidthClass = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    }[maxWidth];

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <div className={`bg-gray-800 rounded-xl p-6 w-full ${maxWidthClass}`}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-300">✕</button>
                </div>
                {children}
            </div>
        </div>
    );
}