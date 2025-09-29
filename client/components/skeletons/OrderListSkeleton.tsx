import { Skeleton } from '../ui/skeleton'

const OrderListSkeleton = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-1/3" />
      </div>
    </div>
  )
}

export default OrderListSkeleton
