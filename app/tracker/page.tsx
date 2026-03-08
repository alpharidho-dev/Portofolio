'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Loader2, Folder, Clock, Calendar, BarChart3, Monitor, Cpu } from 'lucide-react';
import { fetchHackatimeStats, HackatimeStats, StatItem } from '@/app/lib/hacktime';

function ProgressBar({ percent, delay = 0 }: { percent: number; delay?: number }) {
  return (
    <motion.div
      className="h-2 rounded-full overflow-hidden"
      style={{ background: 'var(--bg-tertiary, rgba(255,255,255,0.05))' }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          background: 'linear-gradient(to right, var(--accent-start), var(--accent-end))',
        }}
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.8, delay }}
      />
    </motion.div>
  );
}

function StatSection({
  title,
  icon,
  items,
  delay = 0,
}: {
  title: string;
  icon: React.ReactNode;
  items: StatItem[];
  delay?: number;
}) {
  if (!items || items.length === 0) return null;
  const top5 = items.slice(0, 5);

  return (
    <motion.div
      className="glass-card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <h3
        className="text-md font-semibold mb-4 flex items-center gap-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {icon} {title}
      </h3>
      <div className="space-y-3">
        {top5.map((item, i) => (
          <div key={item.name}>
            <div className="flex justify-between items-center mb-1">
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.name}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {item.text}
              </span>
            </div>
            <ProgressBar percent={item.percent} delay={delay + i * 0.05} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function TrackerPage() {
  const [stats, setStats] = useState<HackatimeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState('last_7_days');

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchHackatimeStats(range)
      .then((data) => setStats(data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Gagal mengambil data')
      )
      .finally(() => setLoading(false));
  }, [range]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2
          className="animate-spin"
          size={32}
          style={{ color: 'var(--accent-start)' }}
        />
      </div>
    );
  }

  if (error || !stats?.data) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 text-lg mb-2">Gagal mengambil data</p>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {error || 'Data tidak tersedia'}
        </p>
      </div>
    );
  }

  const { data } = stats;

  const rangeOptions = [
    { value: 'last_7_days', label: '7 Hari' },
    { value: 'last_30_days', label: '30 Hari' },
    { value: 'last_6_months', label: '6 Bulan' },
    { value: 'last_year', label: '1 Tahun' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Tracker <span className="gradient-text">Coding</span>
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Waktu coding yang tercatat di Hackatime • {data.human_readable_range}
          </p>
        </div>

        {/* Range selector */}
        <div className="flex gap-2 flex-wrap">
          {rangeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setRange(opt.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background:
                  range === opt.value
                    ? 'linear-gradient(to right, var(--accent-start), var(--accent-end))'
                    : 'var(--bg-secondary)',
                color:
                  range === opt.value ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <motion.div
          className="glass-card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock size={24} style={{ color: 'var(--accent-start)' }} />
            <h2
              className="text-lg font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Total Waktu
            </h2>
          </div>
          <p
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            {data.human_readable_total || '0 secs'}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {data.human_readable_range}
          </p>
        </motion.div>

        <motion.div
          className="glass-card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 size={24} style={{ color: '#f59e0b' }} />
            <h2
              className="text-lg font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Rata-rata Harian
            </h2>
          </div>
          <p
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            {data.human_readable_daily_average || '0 secs'}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            per hari
          </p>
        </motion.div>

        {data.best_day && (
          <motion.div
            className="glass-card p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Calendar size={24} style={{ color: '#10b981' }} />
              <h2
                className="text-lg font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Hari Tersibuk
              </h2>
            </div>
            <p
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              {data.best_day.text}
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              {new Date(data.best_day.date).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </motion.div>
        )}
      </div>

      {/* Stats grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatSection
          title="Bahasa Teratas"
          icon={<Code2 size={18} />}
          items={data.languages}
          delay={0.3}
        />
        <StatSection
          title="Proyek Teratas"
          icon={<Folder size={18} />}
          items={data.projects}
          delay={0.4}
        />
        <StatSection
          title="Editor"
          icon={<Monitor size={18} />}
          items={data.editors}
          delay={0.5}
        />
        <StatSection
          title="Sistem Operasi"
          icon={<Cpu size={18} />}
          items={data.operating_systems}
          delay={0.6}
        />
      </div>
    </div>
  );
}