// app/tracker/page.tsx
import { techStack } from '@/app/components/sections/Tracker';

export default function TrackerPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2 gradient-text">📚 Tracker Pembelajaran</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Teknologi yang sedang saya pelajari dan tingkat pemahamannya.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {techStack.map((tech, index) => (
          <div
            key={index}
            className="glass-card p-5 rounded-xl hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{tech.icon}</span>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {tech.name}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {tech.category || 'Teknologi'}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                {tech.level}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}