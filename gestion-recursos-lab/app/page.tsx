'use client';

import { useState, useEffect } from 'react';
import { Resource } from '@/types/Resource';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSessionStorage } from '@/hooks/useSessionStorage';
import Header from '@/components/Header';
import ResourceForm from '@/components/ResourceForm';
import ResourceList from '@/components/ResourceList';
import SearchBar from '@/components/SearchBar';
import FilterCategory from '@/components/FilterCategory';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

export default function Home() {
  // Local Storage: Datos principales del CRUD
  const [resources, setResources] = useLocalStorage<Resource[]>('lab_resources', []);

  // Session Storage: Filtros temporales
  const [searchTerm, setSearchTerm] = useSessionStorage<string>('lab_search', '');
  const [filterCategory, setFilterCategory] = useSessionStorage<string>('lab_filter_category', '');
  const [filterStatus, setFilterStatus] = useSessionStorage<string>('lab_filter_status', '');

  // Estado local para el formulario
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Estado para el modal de confirmación
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string; name: string }>({
    isOpen: false,
    id: '',
    name: '',
  });

  // Filtrar recursos
  const filteredResources = resources.filter((resource) => {
    const matchSearch = resource.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === '' || resource.categoria === filterCategory;
    const matchStatus = filterStatus === '' || resource.estado === filterStatus;
    return matchSearch && matchCategory && matchStatus;
  });

  // CRUD Operations
  const handleCreate = (resource: Resource) => {
    setResources((prev) => [...prev, resource]);
    setShowForm(false);
  };

  const handleUpdate = (updatedResource: Resource) => {
    setResources((prev) =>
      prev.map((r) => (r.id === updatedResource.id ? updatedResource : r))
    );
    setEditingResource(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    const resource = resources.find((r) => r.id === id);
    if (resource) {
      setDeleteModal({ isOpen: true, id, name: resource.nombre });
    }
  };

  const confirmDelete = () => {
    setResources((prev) => prev.filter((r) => r.id !== deleteModal.id));
    setDeleteModal({ isOpen: false, id: '', name: '' });
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingResource(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Header resourceCount={resources.length} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Botón para mostrar formulario */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            ➕ Nuevo Recurso
          </button>
        )}

        {/* Formulario */}
        {showForm && (
          <div className="mb-6">
            <ResourceForm
              resource={editingResource}
              onSave={editingResource ? handleUpdate : handleCreate}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {/* Búsqueda y filtros */}
        <div className="mb-6 space-y-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <FilterCategory
            category={filterCategory}
            onCategoryChange={setFilterCategory}
            status={filterStatus}
            onStatusChange={setFilterStatus}
          />
          {(filterCategory || filterStatus || searchTerm) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('');
                setFilterStatus('');
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Lista de recursos */}
        <ResourceList
          resources={filteredResources}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Modal de confirmación */}
        <ConfirmDeleteModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, id: '', name: '' })}
          onConfirm={confirmDelete}
          resourceName={deleteModal.name}
        />
      </main>
    </div>
  );
}