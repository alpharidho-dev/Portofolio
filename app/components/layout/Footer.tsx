'use client';

import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

const socialLinks = [
    { icon: Github, href: 'https://github.com/vidialpha-max', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/alpha-vidi-5658b43a0/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/alpharidhooo/', label: 'Instagram' },
    { icon: Mail, href: 'mailto:alpharidho@example.com', label: 'Email' },
];

export default function Footer() {
    return (
        <footer className="mt-20 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
                {/* Gradient accent line */}
                <div
                    className="w-20 h-1 rounded-full mx-auto mb-8"
                    style={{ background: 'linear-gradient(90deg, var(--accent-start), var(--accent-end))' }}
                />

                <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        Mari Terhubung
                    </h3>
                    <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Mau ngobrol soal coding, kolaborasi, atau sekadar kenalan? Hubungi saya lewat sosial media di bawah!
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3 pt-2">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-secondary)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--accent-start)';
                                    e.currentTarget.style.color = 'var(--accent-start)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                aria-label={social.label}
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
