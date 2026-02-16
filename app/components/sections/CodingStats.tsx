'use client';

import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CodingStats() {
  const { data, error } = useSWR('/api/github', fetcher);
  const [duration, setDuration] = useState('Loading...');

  useEffect(() => {
    if (!data?.created_at) return;

    const updateDuration = () => {
      const created = new Date(data.created_at);
      const now = new Date();
      const diffMs = now.getTime() - created.getTime();

      const seconds = Math.floor(diffMs / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30.44);
      const years = Math.floor(months / 12);

      const remainderMonths = months % 12;
      const remainderDays = Math.floor(days % 30.44);
      const remainderHours = hours % 24;
      const remainderMinutes = minutes % 60;
      const remainderSeconds = seconds % 60;

      let formatted = '';
      if (years > 0) {
        formatted += `${years} thn ${remainderMonths} bln `;
      } else if (months > 0) {
        formatted += `${months} bln ${remainderDays} hr `;
      } else {
        formatted += `${days} hr `;
      }
      formatted += `${remainderHours.toString().padStart(2, '0')}:${remainderMinutes
        .toString()
        .padStart(2, '0')}:${remainderSeconds.toString().padStart(2, '0')}`;

      setDuration(formatted);
    };

    updateDuration();
    const interval = setInterval(updateDuration, 1000);
    return () => clearInterval(interval);
  }, [data?.created_at]);

  const finalDuration = error ? '10+' : duration;

  return (
    <motion.div
      className="glass-card text-center py-4"
      style={{ cursor: 'default' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Clock className="mx-auto mb-2" size={22} style={{ color: 'var(--accent-start)' }} />
      <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
        {finalDuration}
      </p>
      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
        Jam Terbang
      </p>
    </motion.div>
  );
}