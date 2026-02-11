import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET() {
  const username = process.env.MEDIUM_USERNAME;

  if (!username) {
    return NextResponse.json({ error: 'MEDIUM_USERNAME tidak di set' }, { status: 400 });
  }

  try {
    const feed = await parser.parseURL(`https://medium.com/feed/@${username}`);
    const articles = feed.items.slice(0, 5).map((item) => ({
      title: item.title || 'Tanpa judul',
      link: item.link,
      pubDate: item.pubDate,
      contentSnippet: item.contentSnippet?.slice(0, 120) + '...' || 'Tidak ada deskripsi',
    }));
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Medium RSS error:', error);
    return NextResponse.json({ error: 'Gagal fetch Medium' }, { status: 500 });
  }
}
