import type { Metadata } from 'next';
import Bio from '../components/sections/Bio';
import Skills from '../components/sections/Skills';
import SpotifyEmbed from '../components/sections/SpotifyEmbed';

export const metadata: Metadata = {
    title: 'Tentang Saya',
    description: 'Kenali lebih dekat Alpharidho — Frontend Developer berbasis di Depok. Keahlian, teknologi, dan cerita di balik layar.',
};

export default function AboutPage() {
    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Tentang <span className="gradient-text">Saya</span>
                </h1>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Sedikit cerita tentang siapa saya dan apa yang saya kerjakan.
                </p>
            </div>

            <Bio />

            <div className="mt-12">
                <h2 className="section-heading mb-6">Keahlian Teknis</h2>
                <Skills />
            </div>

            <SpotifyEmbed />
        </div>
    );
}
