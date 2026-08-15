import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function Toast() {
    const { flash } = usePage().props;
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    if (!message) return null;

    return (
        <div className="fixed bottom-5 right-5 z-[100] bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm animate-in fade-in slide-in-from-bottom-2">
            {message}
        </div>
    );
}