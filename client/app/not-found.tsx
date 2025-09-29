import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/40 h-full flex items-center justify-center text-9xl font-bold flex-col">
      <span className="text-emerald-600">404</span>
      <Link href="/" className="text-3xl text-gray-300 underline">
        Go back home
      </Link>
    </div>
  )
}

export default NotFound
