import { cn } from '../lib/cn';

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-2xl border px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400',
          'bg-slate-50/90 shadow-[inset_4px_4px_12px_rgba(148,163,184,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.8)]',
          'outline-none transition',
          error
            ? 'border-rose-300 focus:ring-4 focus:ring-rose-100'
            : 'border-white/70 focus:ring-4 focus:ring-sky-100'
        )}
      />

      {error ? (
        <p className="text-sm font-medium text-rose-600">{error}</p>
      ) : null}
    </div>
  );
}

export default FormField;
