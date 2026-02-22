export interface TechItem {
  name: string;
  level: 'Pemula' | 'Menengah' | 'Lanjutan';
  progress: number;
  icon?: string;
  category?: string;
}

export const techStack: TechItem[] = [
  { name: 'HTML', level: 'Lanjutan', progress: 85, icon: '🌐', category: 'Frontend' },
  { name: 'CSS', level: 'Menengah', progress: 65, icon: '🎨', category: 'Frontend' },
  { name: 'JavaScript', level: 'Lanjutan', progress: 75, icon: '📜', category: 'Frontend' },
  { name: 'TypeScript', level: 'Menengah', progress: 50, icon: '🔷', category: 'Frontend' },
  { name: 'React', level: 'Menengah', progress: 55, icon: '⚛️', category: 'Frontend' },
  { name: 'Next.js', level: 'Menengah', progress: 50, icon: '▲', category: 'Frontend' },
  { name: 'Tailwind CSS', level: 'Menengah', progress: 60, icon: '💨', category: 'Frontend' },
  { name: 'Figma', level: 'Pemula', progress: 35, icon: '🎯', category: 'Desain' },
  { name: 'Python', level: 'Pemula', progress: 25, icon: '🐍', category: 'Backend' },
  { name: 'PostgreSQL', level: 'Pemula', progress: 20, icon: '🐘', category: 'Backend' },
  { name: 'Golang', level: 'Pemula', progress: 15, icon: '🐹', category: 'Backend' },
  { name: 'Git', level: 'Menengah', progress: 60, icon: '📂', category: 'Tools' },
  { name: 'Framer Motion', level: 'Menengah', progress: 45, icon: '🎬', category: 'Frontend' },
  { name: 'Supabase', level: 'Pemula', progress: 20, icon: '⚡', category: 'Backend' },
];

export default function Tracker() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {techStack.map((tech, index) => (
        <div key={index} className="glass-card p-4 text-center">
          <span className="text-3xl block mb-2">{tech.icon}</span>
          <h3 className="font-semibold">{tech.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{tech.level}</p>
        </div>
      ))}
    </div>
  );
}