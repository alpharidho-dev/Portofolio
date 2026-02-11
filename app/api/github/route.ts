import { NextResponse } from 'next/server';

export async function GET() {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    return NextResponse.json({ error: 'GITHUB_USERNAME tidak di set' }, { status: 400 });
  }

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      next: { revalidate: 3600 }
    });
    if (!userRes.ok) throw new Error('Gagal fetch user');
    const user = await userRes.json();

    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    const repos = await reposRes.json();

    return NextResponse.json({
      name: user.name || username,
      avatar_url: user.avatar_url,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      top_repos: repos.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language
      }))
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json({ error: 'Gagal fetch GitHub' }, { status: 500 });
  }
}