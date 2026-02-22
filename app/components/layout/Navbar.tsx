"use client";

import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/about' },
  { label: 'Proyek', href: '/projects' },
  { label: 'Pengalaman', href: '/experience' },
  { label: 'Tracker', href: '/tracker' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (!mounted) return <nav className="h-16" />;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'nav-glass shadow-sm' : 'bg-transparent'
        }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold gradient-text">
            alpha.dev
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                    ? 'text-indigo-500 bg-indigo-500/10'
                    : 'hover:bg-[var(--bg-card-hover)]'
                    }`}
                  style={{
                    color: isActive ? 'var(--accent-start)' : 'var(--text-secondary)',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-2 p-2 rounded-lg transition-all duration-300 hover:rotate-180 hover:bg-[var(--bg-card-hover)]"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Toggle tema"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-60 pb-4' : 'max-h-0'
            }`}
        >
          <div
            className="border-t pt-3 flex flex-col gap-1"
            style={{ borderColor: 'var(--border-color)' }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${isActive
                    ? 'text-indigo-500 bg-indigo-500/10'
                    : ''
                    }`}
                  style={{
                    color: isActive ? 'var(--accent-start)' : 'var(--text-secondary)',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}