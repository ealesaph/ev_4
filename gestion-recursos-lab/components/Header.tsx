'use client';

import { useCookie } from '@/hooks/useCookie';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  resourceCount?: number;
}

export default function Header({ resourceCount = 0 }: HeaderProps) {
  const [userName, setUserName] = useCookie<string>('user_name', 'Usuario');

  return (
    <header className="bg-white shadow-md border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Gestión de Recursos
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {resourceCount} recursos registrados
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-200">👤</span>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Tu nombre"
              className="text-sm border border-gray-300 rounded-md px-2 py-1 w-32 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}