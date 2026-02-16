'use client';

import { motion } from 'framer-motion';
import { Monitor, Server, Palette, Wrench } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Monitor,
    color: '#6366f1',
    skills: [
      'HTML5', 'CSS3', 'JavaScript',
      'TypeScript (belajar)', 'React',
      'Next.js', 'Tailwind CSS',
    ],
  },
  {
    title: 'Desain',
    icon: Palette,
    color: '#8b5cf6',
    skills: [
      'Figma (belajar)', 'Responsive Design',
      'UI/UX dasar',
    ],
  },
  {
    title: 'Backend (dasar)',
    icon: Server,
    color: '#06b6d4',
    skills: [
      'Python (dasar)', 'Golang (dasar)',
      'PostgreSQL (dasar)', 'Laragon',
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    color: '#22c55e',
    skills: [
      'Git', 'GitHub', 'VS Code', 'Vercel',
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
                <span key={skill} className="skill-badge text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}