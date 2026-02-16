'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, Code2, Coffee } from 'lucide-react';

const highlights = [
  { icon: Clock, label: 'Bulan Ngoding', value: '10+' },
  { icon: Code2, label: 'Teknologi Dipelajari', value: '8+' },
  { icon: BookOpen, label: 'Kelas', value: '10 SMK' },
  { icon: Coffee, label: 'Semangat', value: '100%' },
];

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

      {/* Highlight Stats */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {highlights.map((item, i) => (
          <motion.div
            key={item.label}
            className="glass-card text-center py-4"
            style={{ cursor: 'default' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
          >
            <item.icon
              className="mx-auto mb-2"
              size={22}
              style={{ color: 'var(--accent-start)' }}
            />
            <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {item.value}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}