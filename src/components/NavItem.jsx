import { NavLink } from 'react-router';
import { cn } from '../lib/cn';

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'rounded-2xl px-4 py-2 text-sm font-semibold transition',
          isActive
            ? 'bg-sky-600 text-white shadow-[6px_6px_16px_rgba(14,116,144,0.24)]'
            : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
        )
      }
    >
      {children}
    </NavLink>
  );
}

export default NavItem;
