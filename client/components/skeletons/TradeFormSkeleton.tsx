import { Skeleton } from '../ui/skeleton'

const TradeFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Skeleton className="h-6 w-1/3 mb-2" />
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full mt-4" />
      </div>
    </div>
  )
}

export default TradeFormSkeleton
