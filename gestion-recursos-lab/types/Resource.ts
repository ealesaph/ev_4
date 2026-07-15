export interface Resource {
    id: string;
    nombre: string;
    categoria: string;
    cantidad: number;
    estado: 'Disponible' | 'En uso' | 'En mantención';
    ubicacion: string;
    responsable?: string;
    fechaRegistro: string; //Ver como hacerlo con formato DD-MM-YYYY
    descripcion?: string;
}

export type Categoria = 'Redes' | 'Hardware' | 'Software' | 'IoT' | 'Impresión 3D' | 'Herramientas' | 'Otros';
export type Estado = 'Disponible' | 'En uso' | 'En mantención';

export const CATEGORIAS: Categoria[] = ['Redes', 'Hardware', 'Software', 'IoT', 'Impresión 3D', 'Herramientas', 'Otros'];
export const ESTADOS: Estado[] = ['Disponible', 'En uso', 'En mantención'];