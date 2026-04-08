function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22rem] text-sky-600">
          {eyebrow}
        </p>
      ): null }

      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            {description}
          </p>
        ): null}
      </div>
    </div>
  )
}

export default SectionHeading
