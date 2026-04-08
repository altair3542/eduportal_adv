function AppShell({ children }) {
  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 rounded-[32px] border border-white/60 bg-white/65 px-6 py-5 shadow-[12px_12px_28px_rgba(148,163,184,0.18),-10px_-10px_24px_rgba(255,255,255,0.8)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
              Frontend avanzado
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Sistema visual base del proyecto
            </h1>
          </div>

          <div className="rounded-2xl bg-slate-50/80 px-4 py-3 text-sm text-slate-600 shadow-[inset_3px_3px_8px_rgba(148,163,184,0.12),inset_-2px_-2px_8px_rgba(255,255,255,0.72)]">
            Tailwind 4.1 + Soft UI moderna
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}

export default AppShell;
