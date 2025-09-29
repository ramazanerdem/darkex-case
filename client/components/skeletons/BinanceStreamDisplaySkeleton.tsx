import { Skeleton } from '../ui/skeleton'

const BinanceStreamDisplaySkeleton = () => {
  return (
    <div className="flex items-center justify-between p-3 h-full">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-3 w-20 rounded-full" />
      </div>
      <div className="flex flex-col gap-2 items-end">
        <Skeleton className="h-3 w-20 rounded-full" />
        <Skeleton className="h-6 w-32 rounded-full" />
      </div>
    </div>
  )
}

export default BinanceStreamDisplaySkeleton
