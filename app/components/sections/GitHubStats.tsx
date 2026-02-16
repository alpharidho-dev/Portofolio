'use client';

import useSWR from 'swr';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const langColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Go: '#00ADD8',
  Kotlin: '#A97BFF',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Rust: '#dea584',
  Ruby: '#701516',
  Java: '#b07219',
  Swift: '#F05138',
};

export default function GitHubStats() {
  const { data, error } = useSWR('/api/github', fetcher, { refreshInterval: 3600000 });

  if (error)
    return (
      <div
        className="mt-12 p-4 rounded-xl text-sm"
        style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: '#ef4444',
        }}
      >
        ⚠️ Gagal memuat data GitHub
      </div>
    );

  if (!data)
    return (
      <div className="mt-12 glass-card animate-pulse" style={{ cursor: 'default' }}>
        <div className="h-5 w-32 rounded" style={{ background: 'var(--bg-secondary)' }} />
        <div className="mt-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full" style={{ background: 'var(--bg-secondary)' }} />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-40 rounded" style={{ background: 'var(--bg-secondary)' }} />
            <div className="h-3 w-56 rounded" style={{ background: 'var(--bg-secondary)' }} />
          </div>
        </div>
      </div>
    );

  return (
    <section className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-heading">GitHub</h2>

        {/* Profile Card */}
        <div className="mt-6 glass-card" style={{ cursor: 'default' }}>
          <div className="flex items-center gap-4">
            <img
              src={data.avatar_url}
              alt="GitHub Avatar"
              className="w-14 h-14 rounded-full ring-2"
              style={{ '--tw-ring-color': 'var(--accent-start)' } as React.CSSProperties}
            />
            <div>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                {data.name}
              </p>
              <div className="flex items-center gap-3 mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                <span>{data.public_repos} repo</span>
                <span>·</span>
                <span>{data.followers} pengikut</span>
                <span>·</span>
                <span>{data.following} mengikuti</span>
              </div>
            </div>
          </div>
        </div>

        {/* Repositories */}
        {data.top_repos?.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.top_repos.map((repo: any, i: number) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card block"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <Github size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    <span
                      className="font-medium text-sm truncate"
                      style={{ color: 'var(--accent-start)' }}
                    >
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                </div>

                {repo.description && (
                  <p
                    className="mt-2 text-xs line-clamp-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {repo.description}
                  </p>
                )}

                <div className="mt-3 flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: langColors[repo.language] || '#888' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star size={11} />
                    {repo.stars}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}