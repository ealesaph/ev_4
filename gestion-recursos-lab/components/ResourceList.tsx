'use client';

import { Resource } from '@/types/Resource';
import ResourceCard from './ResourceCard';

interface ResourceListProps {
  resources: Resource[];
  onEdit: (resource: Resource) => void;
  onDelete: (id: string) => void;
}

export default function ResourceList({ resources, onEdit, onDelete }: ResourceListProps) {
  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hay recursos registrados</p>
        <p className="text-gray-400 text-sm">Agrega tu primer recurso usando el formulario</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}