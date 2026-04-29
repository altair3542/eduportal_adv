function FavoriteMetaEditor({ favorite, onPriorityChange, onNoteChange }) {
  return (
    <div className="grid gap-4 md:grid-cols-[220px_1fr]">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Prioridad
        </label>
        <select
          value={favorite.priority}
          onChange={(event) => onPriorityChange(event.target.value)}
          className="w-full rounded-2xl border border-white/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800 shadow-[inset_4px_4px_12px_rgba(148,163,184,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] outline-none focus:ring-4 focus:ring-sky-100"
        >
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Nota de evaluación
        </label>
        <textarea
          rows={4}
          value={favorite.note}
          onChange={(event) => onNoteChange(event.target.value)}
          className="w-full rounded-2xl border border-white/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800 shadow-[inset_4px_4px_12px_rgba(148,163,184,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] outline-none focus:ring-4 focus:ring-sky-100"
          placeholder="Escribe observaciones, ventajas, dudas o próximos pasos..."
        />
      </div>
    </div>
  );
}

export default FavoriteMetaEditor;
