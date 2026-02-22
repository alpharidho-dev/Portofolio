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

// Floating particle positions (fixed to avoid hydration mismatch)
const particles = [
  { x: '10%', y: '15%', size: 4, delay: 0, duration: 6 },
  { x: '85%', y: '20%', size: 3, delay: 1, duration: 8 },
  { x: '75%', y: '70%', size: 5, delay: 2, duration: 7 },
  { x: '20%', y: '80%', size: 3, delay: 0.5, duration: 9 },
  { x: '50%', y: '10%', size: 4, delay: 1.5, duration: 6.5 },
  { x: '90%', y: '50%', size: 3, delay: 3, duration: 8.5 },
  { x: '5%', y: '55%', size: 5, delay: 2.5, duration: 7.5 },
  { x: '60%', y: '85%', size: 3, delay: 0.8, duration: 6.8 },
  { x: '35%', y: '30%', size: 4, delay: 1.2, duration: 7.2 },
  { x: '45%', y: '60%', size: 3, delay: 2.2, duration: 8.2 },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="min-h-[calc(100vh-10rem)] flex flex-col justify-center py-12 relative overflow-hidden">
      {/* Floating Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: 'var(--accent-start)',
            opacity: 0.15,
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 10, 0, -10, 0],
            opacity: [0.1, 0.25, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Gradient orbs */}
      <div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent-start), transparent)', opacity: 0.06 }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent-end), transparent)', opacity: 0.06 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10"
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
            Sedang belajar untuk jadi IMPHNEN Sukses
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