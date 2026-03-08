'use client';

import { motion } from 'framer-motion';
import { Monitor, Server, Palette, Wrench } from 'lucide-react';
import {
  SiHtml5, SiJavascript, SiTypescript, SiReact, SiTailwindcss,
  SiPython, SiGo, SiPostgresql, SiSupabase, SiGit, SiGithub, SiVercel, SiFigma
} from '@icons-pack/react-simple-icons';


export const skillCategories = [
  {
    title: 'Frontend',
    icon: Monitor,
    color: '#6366f1',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Desain',
    icon: Palette,
    color: '#8b5cf6',
    skills: ['Figma', 'Responsive Design', 'UI/UX dasar'],
  },
  {
    title: 'Backend (dasar)',
    icon: Server,
    color: '#06b6d4',
    skills: ['Python', 'Golang', 'PostgreSQL', 'Supabase'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    color: '#22c55e',
    skills: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Antigravity'],
  },
];

const getSkillIcon = (skillName: string): React.ReactNode | null => {
  const map: Record<string, React.ReactNode> = {

    'HTML': <SiHtml5 size={16} />,
    'JavaScript': <SiJavascript size={16} />,
    'TypeScript': <SiTypescript size={16} />,
    'React': <SiReact size={16} />,
    'Tailwind CSS': <SiTailwindcss size={16} />,
    'Python': <SiPython size={16} />,
    'Golang': <SiGo size={16} />,
    'PostgreSQL': <SiPostgresql size={16} />,
    'Supabase': <SiSupabase size={16} />,
    'Git': <SiGit size={16} />,
    'GitHub': <SiGithub size={16} />,
    'Vercel': <SiVercel size={16} />,
    'Figma': <SiFigma size={16} />,
  };
  return map[skillName] || null;
};

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
              {category.skills.map((skillName) => (
                <span
                  key={skillName}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',

                  }}
                >
                  <span className="text-base">{getSkillIcon(skillName)}</span>
                  {skillName}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
