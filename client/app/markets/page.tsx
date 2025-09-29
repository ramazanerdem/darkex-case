import { LiveTradeData } from '@/components/markets/LiveTradeData'
import MarketList from '@/components/markets/MarketList'
import OrderListServer from '@/components/markets/server/OrderListServer'
import TradeFormServer from '@/components/markets/server/TradeFormServer'
import TradingViewWidget from '@/components/shared/TradingViewWidget'
import OrderListSkeleton from '@/components/skeletons/OrderListSkeleton'
import TradeFormSkeleton from '@/components/skeletons/TradeFormSkeleton'
import TradingChartSkeleton from '@/components/skeletons/TradingChartSkeleton'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { UUID } from 'crypto'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

const MarketsPage = async () => {
  const cookieStore = await cookies()
  const userId: number | UUID | null | string =
    cookieStore.get('auth_token')?.value || null
  return (
    <div className="h-full p-1 flex flex-col gap-1">
      {/* Market List - Navbar altı */}
      <div className="border border-stone-700 bg-indigo-950/50 rounded-sm h-9">
        <MarketList />
      </div>

      {/* mobile layout */}
      <div className="flex flex-col gap-1 flex-1 lg:hidden">
        {/* canlı veri - mobile */}
        <div className="border border-stone-700 rounded-sm">
          <LiveTradeData />
        </div>

        {/* chart - mobile */}
        <div className="border border-stone-700 rounded-sm min-h-[270px] h-[270px]">
          <div className="h-full relative">
            <TradingChartSkeleton className="absolute inset-0" />
            <TradingViewWidget />
          </div>
        </div>

        {/* orders - mobile */}
        <div className="border border-stone-700 rounded-sm flex-1 h-50 max-h-[calc(100vh-60px)]">
          <Suspense fallback={<OrderListSkeleton />}>
            <OrderListServer isLoggedIn={!!userId} />
          </Suspense>
        </div>
      </div>

      {/* desktop layout */}
      <div className="hidden lg:grid lg:grid-cols-24 gap-1 flex-1">
        {/* sol - canlı veri */}
        <div className="col-span-5 border border-stone-700 rounded-sm">
          <LiveTradeData />
        </div>

        {/* orta - chart ve orders */}
        <ResizablePanelGroup
          direction="vertical"
          className={`${
            userId ? 'col-span-14' : 'col-span-19'
          } border border-stone-700 rounded-sm`}
        >
          {/* orta üst - chart */}
          <ResizablePanel defaultSize={60}>
            <div className="h-full relative">
              <TradingChartSkeleton className="absolute inset-0" />
              <TradingViewWidget />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          {/* orta alt - orders */}
          <ResizablePanel defaultSize={40}>
            <div className="h-full">
              <Suspense fallback={<OrderListSkeleton />}>
                <OrderListServer isLoggedIn={!!userId} />
              </Suspense>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* sağ - alış emir formu */}
        {userId ? (
          <div className="col-span-5 border border-stone-700 rounded-sm">
            <Suspense fallback={<TradeFormSkeleton />}>
              <TradeFormServer userId={userId} />
            </Suspense>
          </div>
        ) : null}
      </div>

      {/* sağ alt - mobil trade butonu ve sheet */}
      {userId && (
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <Suspense fallback={<TradeFormSkeleton />}>
            <TradeFormServer userId={userId} />
          </Suspense>
        </div>
      )}
    </div>
  )
}

export default MarketsPage
