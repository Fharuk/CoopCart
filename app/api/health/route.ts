import { NextResponse } from 'next/server';

export function GET() {
  const supabaseConfigured = Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY,
  );

  return NextResponse.json(
    {
      service: 'coopcart-web',
      state: 'prelaunch',
      dependencies: { databaseConfigured: supabaseConfigured },
      capabilities: { liveOffers: process.env.LIVE_OFFERS_ENABLED === 'true', signups: false, checkout: false },
    },
    {
      headers: {
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    },
  );
}
