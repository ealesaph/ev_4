'use client';

import { Resource } from '@/types/Resource';

interface ResourceCardProps {
  resource: Resource;
  onEdit: (resource: Resource) => void;
  onDelete: (id: string) => void;
}

const estadoColors = {
  'Disponible': 'bg-green-100 text-green-800',
  'En uso': 'bg-yellow-100 text-yellow-800',
  'En mantención': 'bg-red-100 text-red-800',
};

export default function ResourceCard({ resource, onEdit, onDelete }: ResourceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800">{resource.nombre}</h3>
          <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${estadoColors[resource.estado]}`}>
            {resource.estado}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(resource)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ✏️ Editar
          </button>
          <button
            onClick={() => onDelete(resource.id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-1 text-sm text-gray-600">
        <span>📂 {resource.categoria}</span>
        <span>📦 {resource.cantidad} unidades</span>
        <span>📍 {resource.ubicacion}</span>
        <span>📅 {resource.fechaRegistro}</span>
        {resource.responsable && <span>👤 {resource.responsable}</span>}
        {resource.descripcion && (
          <span className="col-span-2 text-gray-500 text-xs italic">{resource.descripcion}</span>
        )}
      </div>
    </div>
  );
}