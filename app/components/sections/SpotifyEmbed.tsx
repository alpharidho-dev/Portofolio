'use client';

export default function SpotifyEmbed() {
    return (
        <section className="mt-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                🎧 Listening to
            </h3>
            <div className="relative overflow-hidden rounded-xl">
                <iframe
                    src="https://open.spotify.com/embed/playlist/3m6ekXBQtfksPavdlF9Lk5?utm_source=generator"
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl shadow-lg"
                />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
                🎵 Timeless Peace
            </p>
        </section>
    );
}