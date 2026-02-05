export default function SkeletonCard() {
  return (
    <div className="bg-casino-darker rounded-xl p-6 animate-pulse">
      <div className="w-12 h-12 bg-casino-card rounded-lg mb-4" />
      <div className="h-6 bg-casino-card rounded w-3/4 mb-2" />
      <div className="h-4 bg-casino-card rounded w-full" />
    </div>
  );
}
