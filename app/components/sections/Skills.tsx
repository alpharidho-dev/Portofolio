import { Check } from 'lucide-react';

const skills = [
  'HTML', 'CSS', 'JavaScript', 'React Native',
  'Firebase', 'Node.js', 'Python', 'C++',
  'C#', 'Go', 'Ruby', 'Java', 'Kotlin',
  'Swift', 'Rust', 'Other'
];

export default function Skills() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Skills
      </h2>
      <p className="mt-1 text-gray-600 dark:text-gray-400">
        My professional skills:
      </p>
      <ul className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {skills.map((skill) => (
          <li key={skill} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Check className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}