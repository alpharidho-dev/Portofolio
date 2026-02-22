'use client';

import { motion } from 'framer-motion';
import { Monitor, Server, Palette, Wrench } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Monitor,
    color: '#6366f1',
    skills: [
      { name: 'HTML', icon: '🌐' },
      { name: 'CSS', icon: '🎨' },
      { name: 'JavaScript', icon: '📜' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '▲' },
      { name: 'Tailwind CSS', icon: '💨' },
    ],
  },
  {
    title: 'Desain',
    icon: Palette,
    color: '#8b5cf6',
    skills: [
      { name: 'Figma', icon: '🎯' },
      { name: 'Responsive Design', icon: '📱' },
      { name: 'UI/UX dasar', icon: '✨' },
    ],
  },
  {
    title: 'Backend (dasar)',
    icon: Server,
    color: '#06b6d4',
    skills: [
      { name: 'Python', icon: '🐍' },
      { name: 'Golang', icon: '🐹' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'Supabase', icon: '⚡' },
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    color: '#22c55e',
    skills: [
      { name: 'Git', icon: '📂' },
      { name: 'GitHub', icon: '🐙' },
      { name: 'VS Code', icon: '💻' },
      { name: 'Vercel', icon: '🚀' },
    ],
  },
];

export default function Skills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillCategories.map((category, i) => (
          <motion.div
            key={category.title}
            className="glass-card"
            style={{ cursor: 'default' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ background: `${category.color}15` }}
              >
                <category.icon size={18} style={{ color: category.color }} />
              </div>
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                {category.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <span className="text-base">{skill.icon}</span>
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}