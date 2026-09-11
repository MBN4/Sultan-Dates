import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_SECRET_TOKEN = 'sultan_admin_session_token_2026';
const VALID_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const VALID_PASSWORD = process.env.ADMIN_PASSWORD || 'sultan2026!';

export async function POST(req: Request) {
  try {
    const cloned = req.clone();
    let body: any;
    try {
      body = await req.json();
    } catch {
      const text = await cloned.text();
      body = JSON.parse(text);
    }

    const { username, password } = body || {};

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      const response = NextResponse.json({ success: true, message: 'Authentication successful' });
      response.cookies.set('sultan_admin_auth', ADMIN_SECRET_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { success: false, message: 'Internal server error during auth', details: error?.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sultan_admin_auth');

    if (authCookie && authCookie.value === ADMIN_SECRET_TOKEN) {
      return NextResponse.json({ authenticated: true, user: VALID_USERNAME });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete('sultan_admin_auth');
  return response;
}
