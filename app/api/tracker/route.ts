import { NextRequest, NextResponse } from 'next/server';

const HACKATIME_BASE = 'https://hackatime.hackclub.com/api/hackatime/v1';

export async function GET(request: NextRequest) {
  const apiKey = process.env.HACK_TIME_API;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing HACK_TIME_API in environment variables' },
      { status: 500 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const range = searchParams.get('range') || 'last_7_days';

  try {
    // Fetch user stats (WakaTime-compatible endpoint)
    const statsRes = await fetch(
      `${HACKATIME_BASE}/users/current/stats/${range}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`,
          Accept: 'application/json',
        },
        next: { revalidate: 300 }, // cache 5 minutes
      }
    );

    if (!statsRes.ok) {
      const errorText = await statsRes.text();
      console.error('Hackatime stats error:', statsRes.status, errorText);
      return NextResponse.json(
        { error: `Hackatime API error: ${statsRes.status}` },
        { status: statsRes.status }
      );
    }

    const statsData = await statsRes.json();
    return NextResponse.json(statsData);
  } catch (error) {
    console.error('Hackatime proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}