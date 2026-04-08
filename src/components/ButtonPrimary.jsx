import { cn } from '../lib/cn';

function ButtonPrimary({ children, className = '', ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white transition duration-200',
        'bg-sky-600 shadow-[6px_6px_16px_rgba(14,116,144,0.28),-4px_-4px_12px_rgba(255,255,255,0.7)]',
        'hover:bg-sky-500 hover:shadow-[8px_8px_20px_rgba(14,116,144,0.24),-4px_-4px_14px_rgba(255,255,255,0.76)]',
        'active:translate-y-px',
        'focus:outline-none focus:ring-4 focus:ring-sky-200',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
