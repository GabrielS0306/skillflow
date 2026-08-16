export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-600 bg-gray-800 text-emerald-500 shadow-sm focus:ring-emerald-500 ' +
                className
            }
        />
    );
}