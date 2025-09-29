'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'

interface TradingChartSkeletonProps {
  className?: string
}

const TradingChartSkeleton = ({ className }: TradingChartSkeletonProps) => {
  return (
    <div
      className={cn('w-full bg-stone-950 border overflow-hidden', className)}
    >
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-2 border-b border-accent">
        <div className="flex items-center gap-4">
          {/* Search/Symbol */}
          <Skeleton className="h-6 w-20 bg-accent rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full bg-accent" />

          {/* Timeframe buttons */}
          <div className="flex gap-1">
            {['1m', '30m', '1h', 'D'].map((_, i) => (
              <Skeleton key={i} className="h-6 w-8 bg-accent rounded-full" />
            ))}
          </div>

          {/* Chart type buttons */}
          <div className="flex gap-1">
            <Skeleton className="h-6 w-6 bg-accent rounded-full" />
            <Skeleton className="h-6 w-6 bg-accent rounded-full" />
          </div>

          {/* Indicators */}
          <Skeleton className="h-6 w-16 bg-accent rounded-full" />
        </div>

        {/* Right side controls */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-6 bg-accent rounded-full" />
        </div>
      </div>

      {/* Price Info Bar */}
      <div className="flex items-center gap-4 p-2 border-b border-accent">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full bg-stone-400" />
          <Skeleton className="h-5 w-56 bg-accent rounded-full" />
        </div>
        <div className="ml-auto">
          <Skeleton className="h-4 w-12 bg-accent rounded-full" />
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="relative" style={{ height: '384px' }}>
        {/* Chart Grid Background */}
        <div className="hidden inset-0 bg-white">
          {/* Horizontal grid lines */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full border-t border-accent opacity-30"
              style={{ top: `${(i + 1) * 16.66}%` }}
            />
          ))}
          {/* Vertical grid lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full border-l border-accent opacity-30"
              style={{ left: `${(i + 1) * 12.5}%` }}
            />
          ))}
        </div>

        {/* Price Scale (Right) */}
        <div className="absolute right-0 top-0 h-full w-16 flex flex-col justify-between py-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-12 bg-accent rounded-full" />
          ))}
        </div>

        {/* Volume Scale (Right Bottom) */}
        <div className="absolute bottom-0 right-0 h-20 w-16 flex flex-col justify-between py-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-2 w-10 bg-accent" />
          ))}
        </div>

        {/* Time Scale (Bottom) */}
        <div className="absolute bottom-0 left-0 right-16 h-8 flex items-center justify-between px-4">
          {['Jul', 'Aug', 'Sep', 'Oct'].map((_, i) => (
            <Skeleton key={i} className="h-3 w-6 bg-accent" />
          ))}
        </div>
        {/* Loading spinner */}
        <div className="absolute flex items-center justify-center inset-0 min-h-[140px] w-full pb-40">
          <LoaderCircle className="stroke-1 h-20 w-20 text-stone-800 animate-spin" />
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="flex items-center justify-between p-2 border-t border-accent">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-8 bg-accent" />
          <Skeleton className="h-4 w-12 bg-accent" />
        </div>
        <Skeleton className="h-4 w-4 bg-accent" />
      </div>
    </div>
  )
}

export default TradingChartSkeleton
