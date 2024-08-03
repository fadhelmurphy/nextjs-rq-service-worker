import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const origin = req.headers.get('origin');
//   console.log(`Origin: ${origin}`);
//   console.log`${req.headers} ini origin`

  if (pathname.startsWith('/api')) {
    // Add your project domain here
    const allowedOrigins = ['http://localhost:3000'];

    if (!origin || allowedOrigins.includes(origin)) {
      return NextResponse.next();
    } else {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  return NextResponse.next();
}
