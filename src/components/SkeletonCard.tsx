export default function SkeletonCard() {
  return (
    <div className="bg-[#212121] border border-[#2a2a2a] rounded-2xl p-3 animate-pulse">
      <div className="w-full aspect-video bg-[#2a2a2a] rounded-xl mb-3" />
      <div className="h-3.5 bg-[#2a2a2a] rounded-full mb-2 w-4/5" />
      <div className="h-3 bg-[#2a2a2a] rounded-full w-3/5" />
      <div className="h-3 bg-[#2a2a2a] rounded-full w-1/4 mt-2" />
    </div>
  )
}