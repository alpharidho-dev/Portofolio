import type { Metadata } from 'next';
import Experience from '../components/sections/Experience';
import AchievementGallery from '../components/sections/AchievementGallery';

export const metadata: Metadata = {
    title: 'Pengalaman',
    description: 'Perjalanan belajar Alpharidho sebagai Frontend Developer. Dari sekolah hingga belajar mandiri.',
};

export default function ExperiencePage() {
    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Pengalaman <span className="gradient-text">& Pencapaian</span>
                </h1>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Perjalanan belajar saya dan bukti pencapaian dari berbagai kegiatan.
                </p>
            </div>

            {/* Experience Timeline */}
            <Experience />

            {/* Certificates Section */}
            <div className="mt-16">
                <h2 className="section-heading mb-6">🏆 Sertifikat & Pencapaian</h2>
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                    Bukti pencapaian dari lomba, workshop, dan kegiatan lainnya.
                </p>
                <AchievementGallery />
            </div>
        </div>
    );
}
