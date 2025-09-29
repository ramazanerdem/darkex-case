import { Skeleton } from '../ui/skeleton'

const LiveTradeDataSkeleton = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="space-y-1">
          <Skeleton className="h-4 w-32 bg-muted" />
          <Skeleton className="h-8 w-48 bg-muted" />
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Skeleton className="h-4 w-32 bg-muted" />
              <Skeleton className="h-4 w-24 bg-muted" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-32 bg-muted" />
              <Skeleton className="h-4 w-24 bg-muted" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Skeleton className="h-4 w-32 bg-muted" />
              <Skeleton className="h-4 w-24 bg-muted" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-32 bg-muted" />
              <Skeleton className="h-4 w-24 bg-muted" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Skeleton className="h-4 w-32 bg-muted" />
              <Skeleton className="h-4 w-24 bg-muted" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-32 bg-muted" />
              <Skeleton className="h-4 w-24 bg-muted" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-4 w-32 bg-muted" />
            <Skeleton className="h-4 w-24 bg-muted" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveTradeDataSkeleton
