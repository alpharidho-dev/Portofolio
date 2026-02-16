import type { Metadata } from 'next';
import Experience from '../components/sections/Experience';

export const metadata: Metadata = {
    title: 'Pengalaman',
    description: 'Perjalanan karir Satria Mahatir sebagai Frontend Developer. Dari freelance hingga posisi full-time.',
};

export default function ExperiencePage() {
    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Pengalaman <span className="gradient-text">Kerja</span>
                </h1>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Perjalanan karir profesional saya sebagai Frontend Developer.
                </p>
            </div>

            {/* Experience Timeline */}
            <Experience />
        </div>
    );
}
