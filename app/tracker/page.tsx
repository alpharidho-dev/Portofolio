// app/tracker/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Loader2 } from 'lucide-react';
import { TechItem } from '@/app/components/sections/Tracker';

export default function TrackerPage() {
  const [techStack, setTechStack] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Panggil API eksternal yang nanti dibuat user
    const fetchTrackerData = async () => {
      try {
        const res = await fetch('/api/tracker');
        if (res.ok) {
          const data = await res.json();
          setTechStack(data);
        }
      } catch (error) {
        console.error('Gagal mengambil data tracker:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackerData();
  }, []);

  const totalTech = techStack.length;
  const categories = [...new Set(techStack.map((t) => t.category))].filter(Boolean) as string[];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1
          className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          📚 Tracker <span className="gradient-text">Pembelajaran</span>
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Teknologi yang sedang saya pelajari, datanya dikontrol penuh lewat API eksternal saya.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin" size={32} style={{ color: 'var(--accent-start)' }} />
        </div>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            <motion.div
              className="glass-card text-center py-4 flex flex-col items-center justify-center"
              style={{ cursor: 'default' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Code2 className="mb-2" size={22} style={{ color: 'var(--accent-start)' }} />
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {totalTech}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Total Teknologi</p>
            </motion.div>
            <motion.div
              className="glass-card text-center py-4 flex flex-col items-center justify-center"
              style={{ cursor: 'default' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Layers className="mb-2" size={22} style={{ color: '#f59e0b' }} />
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {categories.length}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Kategori</p>
            </motion.div>
          </div>

          {/* Tech Stack Grid — Icon and Name only */}
          {categories.map((cat) => (
            <div key={cat} className="mb-8">
              <h2
                className="text-lg font-bold mb-4 flex items-center gap-2"
                style={{ color: 'var(--text-primary)' }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--accent-start)' }}
                />
                {cat}
              </h2>
              <div className="flex flex-wrap gap-3">
                {techStack
                  .filter((t) => t.category === cat)
                  .map((tech, index) => (
                    <motion.span
                      key={tech.name}
                      className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className="text-lg">{tech.icon}</span>
                      {tech.name}
                    </motion.span>
                  ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}