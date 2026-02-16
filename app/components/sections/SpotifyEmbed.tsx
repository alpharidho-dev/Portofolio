'use client';

import { motion } from 'framer-motion';

export default function SpotifyEmbed() {
  return (
    <section className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-heading">🎧 Playlist favorit yang nemenin ngoding</h2>
        <p className="text-xs text-muted-foreground mb-2">
            Pastiin udah login spotify di laptop lu kalo blm bakal muncul (preview 30 detik doang kalo ga login) </p>
        <div className="mt-2 glass-card spotify-card overflow-hidden" style={{ padding: 0 }}>
          <iframe
            title="Spotify Embed"
            src="https://open.spotify.com/embed/playlist/3m6ekXBQtfksPavdlF9Lk5?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl border-0"
            style={{ borderRadius: '12px', position: 'relative', zIndex: 2 }}
          />
        </div>
        <a
          href="https://open.spotify.com/playlist/3m6ekXBQtfksPavdlF9Lk5"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-sm text-accent-start hover:underline"
        >
          Buka playlist di Spotify →
        </a>
      </motion.div>
    </section>
  );
}