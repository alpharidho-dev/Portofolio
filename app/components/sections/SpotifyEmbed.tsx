'use client';

export default function SpotifyEmbed() {
  return (
    <section className="mt-12">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        🎧 Music I'm Into
      </h3>
      <div className="relative overflow-hidden rounded-xl">
        <iframe
          src="https://open.spotify.com/embed/artist/3mIj9lX2MWuHmhNCA7LSCW?utm_source=generator"
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl shadow-lg dark:shadow-gray-800/50"
          style={{ borderRadius: '12px' }}
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
        Currently listening to The 1975
      </p>
    </section>
  );
}