import { Fingerprint } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Navbar from '../header/Navbar'

import Sidebar from '../header/Sidebar'

const Header = async () => {
  const cookieStore = await cookies()
  const hasToken = cookieStore.has('auth_token')

  return (
    <header className="px-3 lg:px-4 border-b bg-gradient-to-r from-indigo-950 to-indigo-950 border-stone-700 h-14 fixed top-0 w-full z-20 flex justify-between items-center">
      <nav className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2 lg:gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-base lg:text-lg lg:border-r border-white/20 lg:pr-4"
          >
            <Fingerprint className="h-6 w-6 lg:h-8 lg:w-8" />
            <span className="flex text-lg lg:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-400">
              <span>r.</span>
              <span>network</span>
            </span>
          </Link>
          <Navbar hasToken={hasToken} />
        </div>
        <Sidebar hasToken={hasToken} />
      </nav>
    </header>
  )
}

export default Header
