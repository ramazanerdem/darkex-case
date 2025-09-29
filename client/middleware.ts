import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // const cookieStore = await cookies()
  // const token = cookieStore.get('auth_token')?.value

  const hasCookie = request.cookies.has('auth_token')
  console.log('Has cookie:', hasCookie)
  const { pathname } = request.nextUrl
  console.log('pathname:', pathname)

  if (!hasCookie && pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if ((hasCookie && pathname === '/') || (hasCookie && pathname === '/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|next.svg|vercel.svg|file.svg|window.svg|globe.svg|markets|\\.).*)',
  ],
}
