'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavbarProps {
  hasToken: boolean
}

const Navbar = ({ hasToken }: NavbarProps) => {
  const pathname = usePathname()
  return (
    <div className="hidden lg:flex items-center gap-6 text-sm lg:text-base">
      <Link
        href="/markets"
        className={`transition-colors hover:text-amber-300 ${
          pathname === '/markets'
            ? 'text-amber-300 font-semibold'
            : 'text-white/80'
        }`}
      >
        Markets
      </Link>
      {hasToken && (
        <Link
          href="/dashboard"
          className={`transition-colors hover:text-amber-300 ${
            pathname === '/dashboard'
              ? 'text-amber-300 font-semibold'
              : 'text-white/80'
          }`}
        >
          Dashboard
        </Link>
      )}
    </div>
  )
}

export default Navbar
