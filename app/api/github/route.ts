import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME;

    if (!token || !username) {
      return NextResponse.json(
        { error: 'GitHub token atau username tidak dikonfigurasi' },
        { status: 500 }
      );
    }

    // Fetch data pengguna
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!userRes.ok) {
      const errorText = await userRes.text();
      console.error(`GitHub user API error (${userRes.status}):`, errorText);
      return NextResponse.json(
        { error: 'Gagal mengambil data pengguna GitHub' },
        { status: userRes.status }
      );
    }
    const userData = await userRes.json();

    // Fetch repositori terbaru
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!reposRes.ok) {
      const errorText = await reposRes.text();
      console.error(`GitHub repos API error (${reposRes.status}):`, errorText);
      return NextResponse.json(
        { error: 'Gagal mengambil repositori GitHub' },
        { status: reposRes.status }
      );
    }
    const reposData = await reposRes.json();

    const topRepos = reposData.map((repo: any) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
    }));

    return NextResponse.json({
      avatar_url: userData.avatar_url,
      name: userData.name || username,
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      top_repos: topRepos,
    });
  } catch (error) {
    console.error('GitHub API internal error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan internal server' },
      { status: 500 }
    );
  }
}