'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const roles = ['Frontend Developer', 'Siswa SMK Taruna Bhakti'];

const socialLinks = [
  { icon: Github, href: 'https://github.com/vidialpha-max', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/alpha-vidi-5658b43a0/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/alpharidhooo/', label: 'Instagram' },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Mode mengetik
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 100);
      } else {
        // Selesai mengetik, tunggu 2 detik lalu hapus
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      // Mode menghapus
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        // Selesai menghapus, pindah ke role berikutnya
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="min-h-[calc(100vh-10rem)] flex flex-col justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Status Badge */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="status-badge">
            <span className="dot" />
            Sedang belajar & membangun
          </span>
        </motion.div>

        {/* Nama */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          Halo, saya
          <br />
          <span className="gradient-text">Alpharidho</span>
        </h1>

        {/* Typing Animation */}
        <div className="mt-4 h-10 flex items-center">
          <span
            className="text-2xl sm:text-3xl font-semibold font-mono"
            style={{ color: 'var(--accent-start)' }}
          >
            {displayText}
          </span>
          <span
            className="ml-0.5 w-0.5 h-7 inline-block animate-pulse"
            style={{ background: 'var(--accent-start)' }}
          />
        </div>

        {/* Deskripsi */}
        <motion.p
          className="mt-6 text-base sm:text-lg leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Siswa SMK Taruna Bhakti kelas 10 yang lagi rajin belajar coding. <br />
          Fokus di frontend web development dan terus eksplorasi hal baru.
        </motion.p>

        {/* Lokasi */}
        <motion.p
          className="mt-4 flex items-center gap-1.5 text-sm"
          style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <MapPin size={14} />
          Depok
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, var(--accent-start), var(--accent-mid))',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
            }}
          >
            Lihat Proyek
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
            }}
          >
            Tentang Saya
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="mt-8 flex gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent-start hover:text-accent-start"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
              }}
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}