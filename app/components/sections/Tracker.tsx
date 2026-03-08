'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, BarChart3, Loader2, AlertCircle } from 'lucide-react';
import { fetchHackatimeStats, type HackatimeStats } from '@/app/lib/hacktime';

type RangeOption = {
  value: string;
  label: string;
};

const rangeOptions: RangeOption[] = [
  { value: 'last_7_days', label: '7 Hari' },
  { value: 'last_30_days', label: '30 Hari' },
  { value: 'last_6_months', label: '6 Bulan' },
  { value: 'last_year', label: '1 Tahun' },
];

export default function Tracker() {
  const [stats, setStats] = useState<HackatimeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState('last_7_days');

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHackatimeStats(range);
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal memuat data');
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [range]);

  const statCards = stats
    ? [
      {
        title: 'Total Coding',
        value: stats.data.human_readable_total || '0',
        icon: Clock,
        color: '#6366f1',
      },
      {
        title: 'Rata-rata Harian',
        value: stats.data.human_readable_daily_average || '0',
        icon: BarChart3,
        color: '#06b6d4',
      },
      {
        title: 'Bahasa Terbanyak',
        value: stats.data.languages?.[0]?.name || '-',
        icon: Calendar,
        color: '#8b5cf6',
      },
    ]
    : [];

  return (
    <div>
      {/* Range Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {rangeOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setRange(opt.value)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              background:
                range === opt.value
                  ? 'linear-gradient(135deg, var(--accent-start), var(--accent-mid))'
                  : 'var(--bg-card)',
              color: range === opt.value ? '#fff' : 'var(--text-secondary)',
              border: `1px solid ${range === opt.value ? 'transparent' : 'var(--border-color)'}`,
              boxShadow:
                range === opt.value ? '0 4px 15px rgba(99, 102, 241, 0.3)' : 'none',
              transform: range === opt.value ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-16"
        >
          <Loader2 className="animate-spin" size={32} style={{ color: 'var(--accent-start)' }} />
          <span className="ml-3 text-sm" style={{ color: 'var(--text-muted)' }}>
            Memuat data...
          </span>
        </motion.div>
      )}

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card text-center py-8"
        >
          <AlertCircle className="mx-auto mb-3" size={32} style={{ color: '#ef4444' }} />
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {error}
          </p>
        </motion.div>
      )}

      {/* Stats */}
      {!loading && !error && stats && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {statCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="glass-card"
                style={{ cursor: 'default' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: `${card.color}15` }}
                  >
                    <card.icon size={18} style={{ color: card.color }} />
                  </div>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                    {card.title}
                  </p>
                </div>
                <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {card.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Languages */}
          {stats.data.languages && stats.data.languages.length > 0 && (
            <motion.div
              className="glass-card"
              style={{ cursor: 'default' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
                Bahasa Pemrograman
              </h3>
              <div className="space-y-3">
                {stats.data.languages.slice(0, 8).map((lang, i) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: 'var(--text-secondary)' }}>{lang.name}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{lang.text}</span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: 'var(--bg-secondary)' }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, var(--accent-start), var(--accent-mid))`,
                          opacity: 1 - i * 0.1,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.percent}%` }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Projects */}
          {stats.data.projects && stats.data.projects.length > 0 && (
            <motion.div
              className="glass-card mt-4"
              style={{ cursor: 'default' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
                Proyek
              </h3>
              <div className="space-y-2">
                {stats.data.projects.slice(0, 6).map((proj) => (
                  <div
                    key={proj.name}
                    className="flex items-center justify-between py-2 px-3 rounded-lg transition-colors duration-150"
                    style={{ background: 'var(--bg-secondary)' }}
                  >
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {proj.name}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {proj.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}