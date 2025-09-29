import BinanceStreamDisplay from '@/components/dashboard/BinanceStreamDisplay'
import TokenList from '@/components/dashboard/TokenList'
import MarketList from '@/components/markets/MarketList'
import TradingViewWidget from '@/components/shared/TradingViewWidget'
import TradingChartSkeleton from '@/components/skeletons/TradingChartSkeleton'

const DashboardPage = () => {
  return (
    <div className="h-full p-1 flex flex-col gap-1">
      <div className="border border-stone-700 bg-indigo-950/50 rounded-sm h-9">
        <MarketList />
      </div>
      <div className="grid md:grid-cols-12 gap-1 flex-1">
        <div className="hidden md:block md:col-span-3 border border-stone-700 rounded-sm h-full">
          <TokenList />
        </div>
        <div className="md:col-span-9 flex flex-col gap-1 h-full">
          <div className="border border-stone-700 rounded-sm h-20 relative">
            {/* <BinanceStreamDisplaySkeleton /> */}
            <BinanceStreamDisplay />
          </div>
          <div className="flex-1 relative overflow-hidden rounded-sm">
            <TradingChartSkeleton className="absolute inset-0 border border-stone-700 rounded-sm" />
            <TradingViewWidget />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
