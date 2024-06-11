import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './libs/auth'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await getSession();

  const path = request.nextUrl.pathname;
  const isPublic = path === '/login' || path === '/signup';
  
  if(isPublic && session){
    return NextResponse.redirect(new URL('/', request.url))
  }

  if( !session && !isPublic ){
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/signup', '/login', ],
}