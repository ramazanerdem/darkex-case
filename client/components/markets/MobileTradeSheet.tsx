'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { TrendingUp } from 'lucide-react'
import { BuyOrderForm } from './BuyOrderForm'
import { UUID } from 'crypto'
import { Badge } from '../ui/badge'

interface MobileTradeSheetProps {
  userId: number | UUID | string
}

export function MobileTradeSheet({ userId }: MobileTradeSheetProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="border-none" asChild>
        <Button className="h-14 w-14 rounded-full bg-gradient-to-r from-[#428068] to-[#6ccca7] hover:from-[#428068]/90 hover:to-[#6ccca7]/90 shadow-lg border-2 border-[#428068]/20 transition-all duration-200 hover:scale-105">
          <TrendingUp className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[75vh] p-0 bg-background border-t-2 border-border rounded-t-xl"
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-center py-3">
            <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
          </div>
          <SheetTitle>
            <div className="p-3 lg:p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-base lg:text-sm font-semibold tracking-tight">
                  PLACE ORDER
                </h2>
                <Badge
                  variant="outline"
                  className="text-xs price-up border-success"
                >
                  BUY
                </Badge>
              </div>
            </div>
          </SheetTitle>

          {/* alış emir formu */}
          <div className="flex-1 overflow-hidden">
            <BuyOrderForm userId={userId} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
