'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Check, Image as ImageIcon, Loader2 } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

const eventTypes = [
    { value: 'competition', label: '🏆 Lomba' },
    { value: 'workshop', label: '🛠️ Workshop' },
    { value: 'course', label: '📖 Kursus' },
    { value: 'other', label: '📌 Lainnya' },
];

export default function AchievementUpload() {
    const isAdmin = process.env.NEXT_PUBLIC_ADMIN_MODE === 'true';
    const [isOpen, setIsOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        title: '',
        description: '',
        event_name: '',
        event_type: 'competition',
        date: '',
        tags: '',
    });
    const [file, setFile] = useState<File | null>(null);

    if (!isAdmin) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) {
            setFile(f);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(f);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError('Pilih gambar terlebih dahulu');
            return;
        }
        setUploading(true);
        setError('');

        try {
            // Upload image to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('certificates')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('certificates')
                .getPublicUrl(fileName);

            const imageUrl = urlData.publicUrl;

            // Insert metadata
            const { error: insertError } = await supabase.from('certificates').insert({
                title: form.title,
                description: form.description || null,
                event_name: form.event_name,
                event_type: form.event_type,
                date: form.date,
                image_url: imageUrl,
                tags: form.tags
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean),
            });

            if (insertError) throw insertError;

            setSuccess(true);
            setForm({ title: '', description: '', event_name: '', event_type: 'competition', date: '', tags: '' });
            setFile(null);
            setPreview(null);

            setTimeout(() => {
                setSuccess(false);
                setIsOpen(false);
                window.location.reload();
            }, 1500);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Gagal mengupload';
            setError(message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                style={{
                    background: 'linear-gradient(135deg, var(--accent-start), var(--accent-mid))',
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                }}
            >
                <Upload size={16} />
                Tambah Sertifikat
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(0,0,0,0.7)' }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6"
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-3 right-3 p-2 rounded-full transition-colors"
                                style={{
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                }}
                            >
                                <X size={16} />
                            </button>

                            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                                Tambah Sertifikat
                            </h2>

                            {success ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                                        style={{ background: 'rgba(34, 197, 94, 0.1)' }}
                                    >
                                        <Check size={32} style={{ color: '#22c55e' }} />
                                    </div>
                                    <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Berhasil ditambahkan!</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Image Upload */}
                                    <div>
                                        <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-primary)' }}>
                                            Gambar Sertifikat *
                                        </label>
                                        <div
                                            className="relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors hover:border-[var(--accent-start)]"
                                            style={{ borderColor: 'var(--border-color)' }}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            {preview ? (
                                                <div className="relative">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={preview} alt="Preview" className="max-h-40 mx-auto rounded-lg object-contain" />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setFile(null);
                                                            setPreview(null);
                                                        }}
                                                        className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <ImageIcon className="mx-auto mb-2" size={32} style={{ color: 'var(--text-muted)' }} />
                                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                        Klik untuk memilih gambar
                                                    </p>
                                                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                                                        JPG, PNG, atau WebP
                                                    </p>
                                                </>
                                            )}
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <div>
                                        <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-primary)' }}>
                                            Judul *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.title}
                                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                                            placeholder="Contoh: Juara 1 Lomba Web Design"
                                            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors"
                                            style={{
                                                background: 'var(--bg-secondary)',
                                                border: '1px solid var(--border-color)',
                                                color: 'var(--text-primary)',
                                            }}
                                        />
                                    </div>

                                    {/* Event Name */}
                                    <div>
                                        <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-primary)' }}>
                                            Nama Event *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.event_name}
                                            onChange={(e) => setForm({ ...form, event_name: e.target.value })}
                                            placeholder="Contoh: Kompetisi IT Tingkat Kota"
                                            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors"
                                            style={{
                                                background: 'var(--bg-secondary)',
                                                border: '1px solid var(--border-color)',
                                                color: 'var(--text-primary)',
                                            }}
                                        />
                                    </div>

                                    {/* Event Type + Date */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-primary)' }}>
                                                Tipe
                                            </label>
                                            <select
                                                value={form.event_type}
                                                onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors"
                                                style={{
                                                    background: 'var(--bg-secondary)',
                                                    border: '1px solid var(--border-color)',
                                                    color: 'var(--text-primary)',
                                                }}
                                            >
                                                {eventTypes.map((t) => (
                                                    <option key={t.value} value={t.value}>
                                                        {t.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-primary)' }}>
                                                Tanggal *
                                            </label>
                                            <input
                                                type="date"
                                                required
                                                value={form.date}
                                                onChange={(e) => setForm({ ...form, date: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors"
                                                style={{
                                                    background: 'var(--bg-secondary)',
                                                    border: '1px solid var(--border-color)',
                                                    color: 'var(--text-primary)',
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-primary)' }}>
                                            Deskripsi
                                        </label>
                                        <textarea
                                            value={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                            placeholder="(opsional) Cerita singkat tentang pencapaian ini"
                                            rows={3}
                                            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors resize-none"
                                            style={{
                                                background: 'var(--bg-secondary)',
                                                border: '1px solid var(--border-color)',
                                                color: 'var(--text-primary)',
                                            }}
                                        />
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-primary)' }}>
                                            Tags
                                        </label>
                                        <input
                                            type="text"
                                            value={form.tags}
                                            onChange={(e) => setForm({ ...form, tags: e.target.value })}
                                            placeholder="coding, web, react (pisahkan dengan koma)"
                                            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors"
                                            style={{
                                                background: 'var(--bg-secondary)',
                                                border: '1px solid var(--border-color)',
                                                color: 'var(--text-primary)',
                                            }}
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-sm text-red-500">{error}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={uploading}
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--accent-start), var(--accent-mid))',
                                            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                                        }}
                                    >
                                        {uploading ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Mengupload...
                                            </>
                                        ) : (
                                            <>
                                                <Upload size={16} />
                                                Upload Sertifikat
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
