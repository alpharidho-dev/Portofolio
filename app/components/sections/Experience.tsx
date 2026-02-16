'use client';

import { motion } from 'framer-motion';
import { Building2, Calendar, GraduationCap } from 'lucide-react';

const experiences = [
    {
        role: 'Siswa Jurusan RPL',
        company: 'SMK Taruna Bhakti',
        period: '2024 — Sekarang',
        type: 'Pendidikan',
        icon: GraduationCap,
        description: [
            'Belajar dasar-dasar pemrograman dan web development',
            'Menguasai HTML, CSS, dan JavaScript native',
            'Mulai eksplorasi framework seperti React dan Next.js',
            'Mengikuti event guru tamu dan mendapat pengalaman dasar Golang',
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'React'],
    },
    {
        role: 'Belajar Mandiri',
        company: 'Self-learning',
        period: '2024 — Sekarang',
        type: 'Mandiri',
        icon: Building2,
        description: [
            'Belajar TypeScript dan framework modern secara otodidak',
            'Eksplorasi Next.js dan Tailwind CSS untuk membuat project',
            'Belajar dasar desain UI/UX menggunakan Figma',
            'Mencoba Python dan PostgreSQL sebagai pengetahuan tambahan',
        ],
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
    },
];

export default function Experience() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative">
                <div
                    className="absolute left-[18px] top-6 bottom-6 w-px hidden sm:block"
                    style={{
                        background: 'linear-gradient(to bottom, var(--accent-start), var(--border-color))',
                    }}
                />

                <div className="space-y-6">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.company + exp.role}
                            className="glass-card sm:ml-12 relative"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.15, duration: 0.4 }}
                        >
                            <div
                                className="absolute -left-[2.65rem] top-7 w-3.5 h-3.5 rounded-full hidden sm:block border-2"
                                style={{
                                    background: i === 0 ? 'var(--accent-start)' : 'var(--bg-card)',
                                    borderColor: 'var(--accent-start)',
                                    boxShadow: i === 0 ? '0 0 8px rgba(99, 102, 241, 0.4)' : 'none',
                                }}
                            />

                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                <div>
                                    <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                                        {exp.role}
                                    </h3>
                                    <p className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--accent-start)' }}>
                                        <exp.icon size={14} />
                                        {exp.company}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span
                                        className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                                        style={{
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-muted)',
                                            border: '1px solid var(--border-color)',
                                        }}
                                    >
                                        {exp.type}
                                    </span>
                                    <p
                                        className="flex items-center gap-1 text-xs whitespace-nowrap"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        <Calendar size={12} />
                                        {exp.period}
                                    </p>
                                </div>
                            </div>

                            <ul className="mt-4 space-y-2">
                                {exp.description.map((desc, j) => (
                                    <li
                                        key={j}
                                        className="text-sm flex items-start gap-2.5"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        <span
                                            className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                            style={{ background: 'var(--accent-start)' }}
                                        />
                                        {desc}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                                {exp.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="text-[11px] px-2 py-0.5 rounded-md font-mono font-medium"
                                        style={{
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--accent-start)',
                                            border: '1px solid var(--border-color)',
                                        }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}