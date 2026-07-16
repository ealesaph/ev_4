'use client';

import { Resource } from '@/types/Resource';

interface ResourceCardProps {
  resource: Resource;
  onEdit: (resource: Resource) => void;
  onDelete: (id: string) => void;
}

const estadoColors = {
  'Disponible': 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300 dark:bg-emerald-900/80 dark:text-emerald-200 dark:ring-emerald-700',
  'En uso': 'bg-amber-100 text-amber-800 ring-1 ring-amber-300 dark:bg-amber-900/80 dark:text-amber-200 dark:ring-amber-700',
  'En mantención': 'bg-rose-100 text-rose-800 ring-1 ring-rose-300 dark:bg-rose-900/80 dark:text-rose-200 dark:ring-rose-700',
};

export default function ResourceCard({ resource, onEdit, onDelete }: ResourceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-950/40">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{resource.nombre}</h3>
          <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${estadoColors[resource.estado]}`}>
            {resource.estado}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(resource)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium dark:text-blue-400 dark:hover:text-blue-300"
          >
            ✏️ Editar
          </button>
          <button
            onClick={() => onDelete(resource.id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium dark:text-red-400 dark:hover:text-red-300"
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-1 text-sm text-gray-600 dark:text-gray-300">
        <span>📂 {resource.categoria}</span>
        <span>📦 {resource.cantidad} unidades</span>
        <span>📍 {resource.ubicacion}</span>
        <span>📅 {resource.fechaRegistro}</span>
        {resource.responsable && <span>👤 {resource.responsable}</span>}
        {resource.descripcion && (
          <span className="col-span-2 text-gray-500 text-xs italic dark:text-gray-400">{resource.descripcion}</span>
        )}
      </div>
    </div>
  );
}