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

                <div className="mt-6 glass-card overflow-hidden" style={{ padding: 0 }}>
                    <iframe
                        src="https://open.spotify.com/embed/playlist/3m6ekXBQtfksPavdlF9Lk5?utm_source=generator"
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-xl border-0"
                        style={{ borderRadius: '12px' }}
                    />
                </div>
            </motion.div>
        </section>
    );
}