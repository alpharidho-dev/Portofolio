'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Filter, X, Calendar, Tag, ExternalLink } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

interface Certificate {
    id: string;
    title: string;
    description: string | null;
    event_name: string;
    event_type: string;
    date: string;
    image_url: string;
    tags: string[];
}

const eventTypeLabels: Record<string, { label: string; emoji: string; color: string }> = {
    competition: { label: 'Lomba', emoji: '🏆', color: '#f59e0b' },
    workshop: { label: 'Workshop', emoji: '🛠️', color: '#06b6d4' },
    course: { label: 'Kursus', emoji: '📖', color: '#8b5cf6' },
    other: { label: 'Lainnya', emoji: '📌', color: '#22c55e' },
};

export default function AchievementGallery() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            setLoading(true);
            try {
                let query = supabase
                    .from('certificates')
                    .select('*')
                    .order('date', { ascending: false });

                if (filter !== 'all') {
                    query = query.eq('event_type', filter);
                }

                const { data, error } = await query;
                if (error) throw error;
                setCertificates(data || []);
            } catch (err) {
                console.error('Error fetching certificates:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, [filter]);

    const filterOptions = [
        { value: 'all', label: 'Semua', emoji: '📋' },
        ...Object.entries(eventTypeLabels).map(([key, val]) => ({
            value: key,
            label: val.label,
            emoji: val.emoji,
        })),
    ];

    return (
        <div>
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
                {filterOptions.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => setFilter(opt.value)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                        style={{
                            background: filter === opt.value
                                ? 'linear-gradient(135deg, var(--accent-start), var(--accent-mid))'
                                : 'var(--bg-card)',
                            color: filter === opt.value ? '#fff' : 'var(--text-secondary)',
                            border: `1px solid ${filter === opt.value ? 'transparent' : 'var(--border-color)'}`,
                            boxShadow: filter === opt.value ? '0 4px 15px rgba(99, 102, 241, 0.3)' : 'none',
                            transform: filter === opt.value ? 'scale(1.05)' : 'scale(1)',
                        }}
                    >
                        <span>{opt.emoji}</span>
                        {opt.label}
                    </button>
                ))}
            </div>

            {/* Loading */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="glass-card animate-pulse" style={{ cursor: 'default' }}>
                            <div className="aspect-[4/3] rounded-lg mb-3" style={{ background: 'var(--bg-secondary)' }} />
                            <div className="h-4 w-3/4 rounded mb-2" style={{ background: 'var(--bg-secondary)' }} />
                            <div className="h-3 w-1/2 rounded" style={{ background: 'var(--bg-secondary)' }} />
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && certificates.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                >
                    <Award className="mx-auto mb-4" size={48} style={{ color: 'var(--text-muted)' }} />
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Belum Ada Sertifikat
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        Sertifikat akan muncul di sini setelah ditambahkan.
                    </p>
                </motion.div>
            )}

            {/* Gallery Grid */}
            {!loading && certificates.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {certificates.map((cert, i) => {
                        const typeInfo = eventTypeLabels[cert.event_type] || eventTypeLabels.other;
                        return (
                            <motion.div
                                key={cert.id}
                                className="glass-card group cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => setSelectedCert(cert)}
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={cert.image_url}
                                        alt={cert.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                        <span className="text-white text-xs font-medium flex items-center gap-1">
                                            <ExternalLink size={12} />
                                            Lihat Detail
                                        </span>
                                    </div>
                                    {/* Type Badge */}
                                    <span
                                        className="absolute top-2 right-2 text-[11px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm"
                                        style={{
                                            background: `${typeInfo.color}20`,
                                            color: typeInfo.color,
                                            border: `1px solid ${typeInfo.color}30`,
                                        }}
                                    >
                                        {typeInfo.emoji} {typeInfo.label}
                                    </span>
                                </div>

                                {/* Info */}
                                <h3
                                    className="font-semibold text-sm line-clamp-1"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {cert.title}
                                </h3>
                                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                                    <Filter size={10} />
                                    {cert.event_name}
                                </p>
                                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                                    <Calendar size={10} />
                                    {new Date(cert.date).toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>

                                {/* Tags */}
                                {cert.tags && cert.tags.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {cert.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] px-1.5 py-0.5 rounded-md font-mono"
                                                style={{
                                                    background: 'var(--bg-secondary)',
                                                    color: 'var(--accent-start)',
                                                    border: '1px solid var(--border-color)',
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(0,0,0,0.8)' }}
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-3xl w-full max-h-[90vh] overflow-auto rounded-2xl"
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-3 right-3 z-10 p-2 rounded-full transition-colors"
                                style={{
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                    border: '1px solid var(--border-color)',
                                }}
                            >
                                <X size={18} />
                            </button>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={selectedCert.image_url}
                                alt={selectedCert.title}
                                className="w-full object-contain max-h-[60vh]"
                                style={{ background: 'var(--bg-secondary)' }}
                            />
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span
                                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                        style={{
                                            background: `${(eventTypeLabels[selectedCert.event_type] || eventTypeLabels.other).color}15`,
                                            color: (eventTypeLabels[selectedCert.event_type] || eventTypeLabels.other).color,
                                        }}
                                    >
                                        {(eventTypeLabels[selectedCert.event_type] || eventTypeLabels.other).emoji}{' '}
                                        {(eventTypeLabels[selectedCert.event_type] || eventTypeLabels.other).label}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                    {selectedCert.title}
                                </h2>
                                <p className="text-sm mt-1 flex items-center gap-1.5" style={{ color: 'var(--accent-start)' }}>
                                    <Award size={14} />
                                    {selectedCert.event_name}
                                </p>
                                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                                    <Calendar size={12} />
                                    {new Date(selectedCert.date).toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                                {selectedCert.description && (
                                    <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                        {selectedCert.description}
                                    </p>
                                )}
                                {selectedCert.tags && selectedCert.tags.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        {selectedCert.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2 py-0.5 rounded-md font-mono flex items-center gap-1"
                                                style={{
                                                    background: 'var(--bg-secondary)',
                                                    color: 'var(--accent-start)',
                                                    border: '1px solid var(--border-color)',
                                                }}
                                            >
                                                <Tag size={10} />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
