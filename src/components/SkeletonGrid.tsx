import SkeletonCard from './SkeletonCard'

interface Props {
  title?: string
  count?: number
}

export default function SkeletonGrid({ title, count = 8 }: Props) {
  return (
    <div className="mb-10">
      {title && (
        <div className="h-5 bg-[#2a2a2a] rounded-full w-48 mb-4 animate-pulse" />
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}