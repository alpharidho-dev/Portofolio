'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trophy, Zap, Target, Clock } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

interface TypingRecord {
    wpm: number;
    accuracy: number;
    language: string;
    duration_seconds: number;
    recorded_at: string;
}

export default function TypingSpeedTest() {
    const [records, setRecords] = useState<TypingRecord[]>([]);
    const [personalBest, setPersonalBest] = useState<number>(0);
    const [avgWpm, setAvgWpm] = useState<number>(0);
    const [avgAccuracy, setAvgAccuracy] = useState<number>(0);

    useEffect(() => {
        const loadRecords = async () => {
            try {
                const { data } = await supabase
                    .from('typing_records')
                    .select('*')
                    .order('recorded_at', { ascending: false })
                    .limit(10);

                if (data && data.length > 0) {
                    setRecords(data);
                    const best = Math.max(...data.map((r: TypingRecord) => r.wpm));
                    setPersonalBest(best);
                    setAvgWpm(Math.round(data.reduce((a: number, b: TypingRecord) => a + b.wpm, 0) / data.length));
                    setAvgAccuracy(
                        Math.round((data.reduce((a: number, b: TypingRecord) => a + b.accuracy, 0) / data.length) * 100) / 100
                    );
                }
            } catch {
                // ignore
            }
        };
        loadRecords();
    }, []);

    return (
        <div className="mt-12">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold gradient-text">⌨️ Kecepatan Mengetik</h2>
            </div>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                Hasil test kecepatan mengetik saya dari situs-situs populer.
            </p>

            {/* Stats Cards */}
            {records.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <motion.div
                        className="glass-card p-4 text-center"
                        style={{ cursor: 'default' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Trophy className="mx-auto mb-1" size={20} style={{ color: '#f59e0b' }} />
                        <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                            {personalBest}
                        </p>
                        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Personal Best WPM</p>
                    </motion.div>
                    <motion.div
                        className="glass-card p-4 text-center"
                        style={{ cursor: 'default' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Zap className="mx-auto mb-1" size={20} style={{ color: 'var(--accent-start)' }} />
                        <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{avgWpm}</p>
                        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Rata-rata WPM</p>
                    </motion.div>
                    <motion.div
                        className="glass-card p-4 text-center"
                        style={{ cursor: 'default' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Target className="mx-auto mb-1" size={20} style={{ color: 'var(--accent-mid)' }} />
                        <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{avgAccuracy}%</p>
                        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Rata-rata Akurasi</p>
                    </motion.div>
                    <motion.div
                        className="glass-card p-4 text-center"
                        style={{ cursor: 'default' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Clock className="mx-auto mb-1" size={20} style={{ color: 'var(--accent-end)' }} />
                        <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{records.length}</p>
                        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Total Test</p>
                    </motion.div>
                </div>
            )}

            {/* Link to Monkeytype */}
            <div className="glass-card mb-6" style={{ cursor: 'default' }}>
                <div className="flex items-center gap-3 mb-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                        style={{ background: 'rgba(202, 178, 89, 0.1)' }}
                    >
                        🐒
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                            Monkeytype
                        </h3>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            Situs tes mengetik favorit saya
                        </p>
                    </div>
                </div>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                    Saya menggunakan Monkeytype untuk mengukur dan melatih kecepatan mengetik secara rutin.
                    Hasil test di bawah diambil dari session saya di Monkeytype.
                </p>
                <a
                    href="https://monkeytype.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
                    style={{
                        background: 'linear-gradient(135deg, #cab259, #e8d67a)',
                        color: '#1a1a1a',
                        boxShadow: '0 4px 15px rgba(202, 178, 89, 0.25)',
                    }}
                >
                    Buka Monkeytype
                    <ExternalLink size={14} />
                </a>
            </div>

            {/* Records History */}
            {records.length > 0 ? (
                <div>
                    <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                        Riwayat Test Terbaru
                    </h3>
                    <div className="space-y-2">
                        {records.map((record, i) => (
                            <motion.div
                                key={i}
                                className="glass-card py-3 px-4 flex items-center justify-between"
                                style={{ cursor: 'default' }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.04 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`text-sm font-bold ${record.wpm === personalBest ? 'gradient-text' : ''
                                                }`}
                                            style={record.wpm !== personalBest ? { color: 'var(--text-primary)' } : {}}
                                        >
                                            {record.wpm} WPM
                                        </span>
                                        {record.wpm === personalBest && (
                                            <Trophy size={12} style={{ color: '#f59e0b' }} />
                                        )}
                                    </div>
                                    <span
                                        className="text-xs font-mono px-2 py-0.5 rounded-md"
                                        style={{
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--accent-start)',
                                            border: '1px solid var(--border-color)',
                                        }}
                                    >
                                        {record.language}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                                    <span
                                        style={{
                                            color:
                                                record.accuracy >= 95
                                                    ? '#22c55e'
                                                    : record.accuracy >= 80
                                                        ? '#f59e0b'
                                                        : '#ef4444',
                                        }}
                                    >
                                        {record.accuracy}%
                                    </span>
                                    <span>{record.duration_seconds}s</span>
                                    <span>{new Date(record.recorded_at).toLocaleDateString('id-ID')}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 glass-card" style={{ cursor: 'default' }}>
                    <Zap className="mx-auto mb-3" size={36} style={{ color: 'var(--text-muted)' }} />
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        Belum ada hasil test
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        Hasil test dari Monkeytype akan muncul di sini.
                    </p>
                </div>
            )}
        </div>
    );
}
