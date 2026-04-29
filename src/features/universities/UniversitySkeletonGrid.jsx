import SurfaceCard from '../../components/SurfaceCard';

function SkeletonCard() {
  return (
    <SurfaceCard className="space-y-4">
      <div className="flex gap-2">
        <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200" />
        <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
      </div>

      <div className="space-y-3">
        <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="flex gap-3 pt-2">
        <div className="h-10 w-28 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-10 w-36 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    </SurfaceCard>
  );
}

function UniversitySkeletonGrid({ count = 6 }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

export default UniversitySkeletonGrid;

