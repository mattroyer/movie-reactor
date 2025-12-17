import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const TMDB_READ_TOKEN = process.env.TMDB_READ_TOKEN;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get('endpoint');

  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
  }

  if (!TMDB_READ_TOKEN) {
    return NextResponse.json({ error: 'TMDB API key is not configured' }, { status: 500 });
  }

  try {
    const tmdbParams = new URLSearchParams();

    searchParams.forEach((value, key) => {
      if (key !== 'endpoint') {
        tmdbParams.append(key, value);
      }
    })

    const queryString = tmdbParams.toString();
    const url = `${TMDB_BASE_URL}/${endpoint}${queryString ? `?${queryString}` : ''}`;

    console.log(`Fetching TMDb URL:`, url);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TMDB_READ_TOKEN}`,
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('TMDb API Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch from TMDb' },
      { status: 500 }
    )
  }
}
