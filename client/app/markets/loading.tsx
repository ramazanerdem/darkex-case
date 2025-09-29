import LiveTradeDataSkeleton from '@/components/skeletons/LiveTradeDataSkeleton'
import OrderListSkeleton from '@/components/skeletons/OrderListSkeleton'
import TradeFormSkeleton from '@/components/skeletons/TradeFormSkeleton'
import TradingChartSkeleton from '@/components/skeletons/TradingChartSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

const MarketsLoading = () => {
  return (
    <div className="h-full p-1 flex flex-col gap-1">
      <div className="px-2 flex items-center gap-2 border border-stone-700 rounded-sm h-9">
        <Skeleton className="w-10 h-4" />
        <Skeleton className="w-10 h-4" />
      </div>
      <div className="grid grid-cols-24 gap-1 flex-1">
        {/* sol - token bilgileri */}
        <div className="col-span-5 border border-stone-700 rounded-sm h-full">
          <LiveTradeDataSkeleton />
        </div>
        {/* orta - grafik ve orders */}
        <div className="col-span-14 h-full flex flex-col gap-1">
          {/* orta-üst - chart */}
          <div className="h-full border border-stone-700 relative">
            <TradingChartSkeleton className="absolute inset-0" />
          </div>
          {/* orta-alt - order list */}
          <div className="h-full border border-stone-700">
            <OrderListSkeleton />
          </div>
        </div>
        {/* sağ - alış emir formu */}
        <div className="col-span-5 border border-stone-700 h-full rounded-sm">
          <TradeFormSkeleton />
        </div>
      </div>
    </div>
  )
}

export default MarketsLoading
