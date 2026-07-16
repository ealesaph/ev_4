'use client';

import { useState, useEffect } from 'react';
import { Resource, CATEGORIAS, ESTADOS } from '@/types/Resource';
import { validateResource, ValidationErrors, getTodayFormatted, generateId } from '@/utils/validations';

interface ResourceFormProps {
  resource?: Resource | null;
  onSave: (resource: Resource) => void;
  onCancel: () => void;
}

const initialResource: Omit<Resource, 'id'> = {
  nombre: '',
  categoria: 'Redes',
  cantidad: 1,
  estado: 'Disponible',
  ubicacion: '',
  responsable: '',
  fechaRegistro: getTodayFormatted(),
  descripcion: '',
};

export default function ResourceForm({ resource, onSave, onCancel }: ResourceFormProps) {
  const [formData, setFormData] = useState<Omit<Resource, 'id'>>(initialResource);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (resource) {
      const { id, ...rest } = resource;
      setFormData(rest);
    } else {
      setFormData(initialResource);
    }
  }, [resource]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
    // Limpiar error del campo
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateResource(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const newResource: Resource = {
      id: resource?.id || generateId(),
      ...formData,
    };

    onSave(newResource);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-950/50">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {resource ? '✏️ Editar Recurso' : '➕ Nuevo Recurso'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">
            Nombre del recurso *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 ${
              errors.nombre ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría *
          </label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          >
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Cantidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad *
          </label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            min="0"
            step="1"
            className={`w-full px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 ${
              errors.cantidad ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.cantidad && <p className="text-red-500 text-xs mt-1">{errors.cantidad}</p>}
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado *
          </label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          >
            {ESTADOS.map((est) => (
              <option key={est} value={est}>{est}</option>
            ))}
          </select>
        </div>

        {/* Ubicación */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ubicación *
          </label>
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 ${
              errors.ubicacion ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.ubicacion && <p className="text-red-500 text-xs mt-1">{errors.ubicacion}</p>}
        </div>

        {/* Responsable */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Responsable
          </label>
          <input
            type="text"
            name="responsable"
            value={formData.responsable}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Fecha Registro */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de registro * (DD-MM-YYYY)
          </label>
          <input
            type="text"
            name="fechaRegistro"
            value={formData.fechaRegistro}
            onChange={handleChange}
            placeholder="DD-MM-YYYY"
            className={`w-full px-3 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 ${
              errors.fechaRegistro ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.fechaRegistro && <p className="text-red-500 text-xs mt-1">{errors.fechaRegistro}</p>}
        </div>

        {/* Descripción */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          {isSubmitting ? 'Guardando...' : resource ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
}