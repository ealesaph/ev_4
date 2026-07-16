'use client';

import { CATEGORIAS, ESTADOS } from '@/types/Resource';

interface FilterCategoryProps {
  category: string;
  onCategoryChange: (category: string) => void;
  status: string;
  onStatusChange: (status: string) => void;
}

export default function FilterCategory({
  category,
  onCategoryChange,
  status,
  onStatusChange,
}: FilterCategoryProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      >
        <option value="">Todas las categorías</option>
        {CATEGORIAS.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      >
        <option value="">Todos los estados</option>
        {ESTADOS.map((est) => (
          <option key={est} value={est}>{est}</option>
        ))}
      </select>
    </div>
  );
}