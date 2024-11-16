import { ACCESS_TOKEN_KEY } from '@/constants/common';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = [
  '/like',
  '/profile',
  '/profile/organized-party',
  '/profile/participation-party',
  '/create-party',
  '/modify-party',
  '/notification',
  '/setting',
];

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN_KEY);

  const { pathname } = req.nextUrl;

  if (protectedPaths.includes(pathname) && !accessToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname === '/login' && accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: protectedPaths,
};
