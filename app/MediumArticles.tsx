'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MediumArticles() {
  const { data, error } = useSWR('/api/medium', fetcher);

  if (error) return null;
  if (!data) {
    return (
      <div className="mt-12">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b dark:border-gray-700 pb-4">
              <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.error) return null;

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        ✍️ Latest from Medium
      </h3>
      <ul className="mt-4 space-y-4">
        {data.map((article: any) => (
          <li key={article.link} className="border-b dark:border-gray-700 pb-4">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              {article.title}
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {new Date(article.pubDate).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">
              {article.contentSnippet}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}