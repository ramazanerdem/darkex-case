'use client'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import Link from 'next/link'
import UserDropdown from './UserDropdown'
import { Fingerprint, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface SidebarProps {
  hasToken: boolean
}
const Sidebar = ({ hasToken }: SidebarProps) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])
  return (
    <div className="flex items-center gap-4">
      {/* navbar sağındaki user ve login butonu */}
      {hasToken ? (
        <UserDropdown />
      ) : (
        <Link
          href="/login"
          className="text-xs lg:text-base px-3 py-1.5 lg:py-1 bg-indigo-700 hover:bg-indigo-600 transition-colors rounded-md  lg:hover:text-amber-300"
        >
          Log In
        </Link>
      )}
      {/* mobile sidebar */}
      <div className="lg:hidden flex items-center">
        <Sheet onOpenChange={setIsOpen} open={isOpen}>
          <SheetTrigger
            aria-label="Open navigation menu"
            title="Open navigation menu"
            className="p-2 rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span className="sr-only">Open navigation menu</span>
            <Menu className="w-6 h-6" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="border-b pb-4 mb-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold text-lg"
                >
                  <Fingerprint className="h-6 w-6" />
                  <span className="flex text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-400">
                    <span>r.</span>
                    <span>network</span>
                  </span>
                </Link>
              </SheetTitle>
              <div className="flex flex-col gap-4 text-left">
                <Link
                  href="/markets"
                  className={`text-base py-2 px-3 rounded-md transition-colors hover:bg-accent ${
                    pathname === '/markets'
                      ? 'text-amber-300 bg-accent font-semibold'
                      : 'text-foreground'
                  }`}
                >
                  Markets
                </Link>
                {hasToken && (
                  <Link
                    href="/dashboard"
                    className={`text-base py-2 px-3 rounded-md transition-colors hover:bg-accent ${
                      pathname === '/dashboard'
                        ? 'text-amber-300 bg-accent font-semibold'
                        : 'text-foreground'
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default Sidebar
