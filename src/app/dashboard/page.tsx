import { Suspense } from 'react'
import DashboardContent from './DashboardContent'
import SkeletonGrid from '@/components/SkeletonGrid'
import Footer from '@/components/Footer'

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8">
      <Suspense fallback={
        <div>
          <div className="h-8 bg-[#2a2a2a] rounded-full w-72 mb-2 animate-pulse" />
          <div className="h-4 bg-[#2a2a2a] rounded-full w-48 mb-8 animate-pulse" />
          <SkeletonGrid title="Loading..." count={8} />
          <SkeletonGrid title="Loading..." count={8} />
          <SkeletonGrid title="Loading..." count={8} />
        </div>
      }>
        <DashboardContent />
      </Suspense>
      <Footer />
    </div>
  )
}