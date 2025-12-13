import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from './getCurrentUser';

export function middleware(req: NextRequest) {
  const currentUser = getCurrentUser();
  const adminPageUrl = `/admin/${process.env.ADMIN_LOGIN_SLUG}`;

  if (!currentUser && req.nextUrl.pathname.startsWith(adminPageUrl)) {
    return NextResponse.redirect(new URL(`${adminPageUrl}/login`, req.url));
  }
}