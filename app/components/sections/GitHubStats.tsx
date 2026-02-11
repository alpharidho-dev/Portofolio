'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GitHubStats() {
  const { data, error } = useSWR('/api/github', fetcher, { refreshInterval: 3600000 });

  if (error) return <div className="mt-8 p-4 border border-red-300 bg-red-50 dark:bg-red-900/10 rounded text-red-600">⚠️ Gagal memuat GitHub Stats</div>;
  if (!data) return <div className="mt-8 p-6 border rounded-lg dark:border-gray-700 animate-pulse">Loading GitHub...</div>;

  return (
    <div className="mt-12 p-6 border rounded-lg dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">📊 GitHub Stats</h3>
      <div className="flex items-center gap-4 mt-4">
        <img src={data.avatar_url} alt="avatar" className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700" />
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{data.public_repos} repos · {data.followers} followers · {data.following} following</p>
        </div>
      </div>
      {data.top_repos?.length > 0 && (
        <div className="mt-4">
          <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">📌 Repositori terbaru:</p>
          <ul className="space-y-2">
            {data.top_repos.map((repo: any) => (
              <li key={repo.name}>
                <a href={repo.url} target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">{repo.name}</a>
                {repo.language && <span className="ml-2 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">{repo.language}</span>}
                <span className="text-sm ml-2">⭐ {repo.stars}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}