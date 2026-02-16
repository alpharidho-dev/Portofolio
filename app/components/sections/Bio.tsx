'use client';

import { motion } from 'framer-motion';
import { BookOpen, Code2, Coffee } from 'lucide-react';
import CodingStats from './CodingStats';

export default function Bio() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card" style={{ cursor: 'default' }}>
        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Saya{' '}
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            Alpharidho
          </span>
          , siswa kelas 10 di SMK Taruna Bhakti. Baru mulai belajar coding sekitar 10 bulan
          yang lalu dan sekarang lagi fokus di frontend web development.
        </p>
        <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Saat ini saya lumayan paham{' '}
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            HTML, CSS, dan JavaScript native
          </span>
          , dan lagi belajar{' '}
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            TypeScript
          </span>
          . Saya juga udah coba beberapa framework seperti{' '}
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            React, Next.js, dan Tailwind CSS
          </span>
          . Di luar itu, pernah belajar sedikit tentang Python, PostgreSQL, dan punya pengalaman
          dasar Golang dari event guru tamu di sekolah.
        </p>
        <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Saya juga lagi memperdalam desain UI/UX di{' '}
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            Figma
          </span>
          . Masih terus belajar dan eksplorasi banyak hal baru di dunia web development.
        </p>
      </div>

      {/* Grid 4 card */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Card 1: real-time dari GitHub */}
        <CodingStats />

        {/* Card 2: Teknologi Dipelajari */}
        <motion.div
          className="glass-card text-center py-4"
          style={{ cursor: 'default' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Code2 className="mx-auto mb-2" size={22} style={{ color: 'var(--accent-start)' }} />
          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            8+
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Teknologi Dipelajari
          </p>
        </motion.div>

        {/* Card 3: Kelas */}
        <motion.div
          className="glass-card text-center py-4"
          style={{ cursor: 'default' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <BookOpen className="mx-auto mb-2" size={22} style={{ color: 'var(--accent-start)' }} />
          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            10 SMK
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Kelas
          </p>
        </motion.div>

        {/* Card 4: Semangat */}
        <motion.div
          className="glass-card text-center py-4"
          style={{ cursor: 'default' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Coffee className="mx-auto mb-2" size={22} style={{ color: 'var(--accent-start)' }} />
          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            100%
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Semangat
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}