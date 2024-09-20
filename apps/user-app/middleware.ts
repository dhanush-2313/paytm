// user-app/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || "secret" });


  if (!token) {
    console.log("No token found, redirecting to sign-in");
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  if (req.nextUrl.pathname === '/') {
    console.log("Authenticated, redirecting to /transfer");
    return NextResponse.redirect(new URL('/transfer', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/transfer', '/transactions', '/p2p'], // Add other routes as needed
};