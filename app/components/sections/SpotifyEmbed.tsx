'use client';

interface Props {
  src?: string;
  height?: number;
  title?: string;
}

export default function SpotifyEmbed({ 
  src = "https://open.spotify.com/embed/playlist/37i9dQZF1DX4CB6zI8FWXS", // default The 1975
  height = 380,
  title = "🎧 Listen on Spotify" 
}: Props) {
  return (
    <section className="mt-12">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {title}
      </h3>
      <div className="relative overflow-hidden rounded-xl">
        <iframe
          src={src}
          width="100%"
          height={height}
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl shadow-lg dark:shadow-gray-800/50"
          style={{ borderRadius: '12px' }}
        />
      </div>
    </section>
  );
}