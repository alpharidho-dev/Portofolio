// app/components/sections/Tracker.tsx
export interface TechItem {
  name: string;
  level: 'Pemula' | 'Menengah' | 'Lanjutan';
  icon?: string;
  category?: string;
}

export const techStack: TechItem[] = [
  { name: 'JavaScript', level: 'Lanjutan', icon: '📜', category: 'Frontend' },
];