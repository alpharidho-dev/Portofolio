import type { Metadata } from 'next';
import Projects from '../components/sections/Projects';
import GitHubStats from '../components/sections/GitHubStats';

export default function ProjectsPage() {
    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Proyek <span className="gradient-text">Saya</span>
                </h1>
                {/* <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Kumpulan proyek yang pernah saya bangun, dari ide hingga deployment.
                </p> */}
            </div>

            {/* Projects */}
            <Projects />

            {/* GitHub Stats */}
            <GitHubStats />
        </div>
    );
}
