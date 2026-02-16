'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: 'Portofolio Website',
        description:
            'Website portofolio pribadi ini Dibuat pakai Next.js, Tailwind CSS, dan Framer Motion. Ada dark mode, animasi, dan integrasi GitHub API.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        github: 'https://github.com/vidialpha-max/portfolio',
        live: 'https://:portofolio-new-hazel.vercel.app',
        featured: true,
    },
    {
        title: 'Latihan HTML & CSS',
        description:
            'Kumpulan project latihan selama belajar HTML dan CSS. Dari layout sederhana sampai halaman responsif.',
        tech: ['HTML5', 'CSS3', 'Responsive Design'],
        github: 'https://github.com/vidialpha-max',
        live: null,
        featured: false,
    },
    {
        title: 'Latihan JavaScript',
        description:
            'Beberapa project kecil pakai JavaScript native seperti to-do list, kalkulator, dan manipulasi DOM.',
        tech: ['JavaScript'],
        github: 'https://github.com/vidialpha-max',
        live: null,
        featured: false,
    },
];

export default function Projects() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Featured Projects */}
            <div className="space-y-4">
                {projects.filter(p => p.featured).map((project, i) => (
                    <motion.div
                        key={project.title}
                        className="glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                                        {project.title}
                                    </h3>
                                    <span
                                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                        style={{
                                            background: 'rgba(99, 102, 241, 0.1)',
                                            color: 'var(--accent-start)',
                                            border: '1px solid rgba(99, 102, 241, 0.2)',
                                        }}
                                    >
                                        Unggulan
                                    </span>
                                </div>
                                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                    {project.description}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.tech.map((t) => (
                                <span
                                    key={t}
                                    className="text-xs px-2.5 py-1 rounded-lg font-medium font-mono"
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

                        <div className="mt-4 flex gap-4 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover:text-accent-start"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                <Github size={14} />
                                Source Code
                            </a>
                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover:text-accent-start"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    <ExternalLink size={14} />
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Other Projects */}
            <h3 className="mt-10 text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Proyek Latihan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.filter(p => !p.featured).map((project, i) => (
                    <motion.div
                        key={project.title}
                        className="glass-card flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    >
                        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {project.title}
                        </h3>
                        <p
                            className="mt-2 text-sm leading-relaxed flex-grow"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            {project.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                            {project.tech.map((t) => (
                                <span
                                    key={t}
                                    className="text-[11px] px-2 py-0.5 rounded-md font-mono"
                                    style={{
                                        background: 'var(--bg-secondary)',
                                        color: 'var(--text-muted)',
                                        border: '1px solid var(--border-color)',
                                    }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div className="mt-3 flex gap-3 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs font-medium transition-colors hover:text-accent-start"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                <Github size={12} />
                                Kode
                            </a>
                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-xs font-medium transition-colors hover:text-accent-start"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    <ExternalLink size={12} />
                                    Demo
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}