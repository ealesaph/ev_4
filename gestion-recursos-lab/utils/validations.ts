import { Resource } from "@/types/Resource";

export interface ValidationErrors {
    nombre?: string;
    categoria?: string;
    cantidad?: string;
    estado?: string;
    ubicacion?: string;
    fechaRegistro?: string;
}

export const validateResource = (data: Partial<Resource>): ValidationErrors => {
    const errors: ValidationErrors = {};
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const todayStr = `${day}-${month}-${year}`;

    if (!data.nombre?.trim()) {
        errors.nombre = "El nombre del recurso es obligatorio";
    } else if (data.nombre.trim().length < 3) {
        errors.nombre = "El nombre debe tener al menos 3 caracteres";
    }

    if (!data.categoria) {
        errors.categoria = "La categoría es obligatoria";
    }

    if (data.cantidad === undefined || data.cantidad === null) {
        errors.cantidad = "La cantidad es obligatoria";
    } else if (data.cantidad < 0) {
        errors.cantidad = "La cantidad no puede ser negativa";
    } else if (!Number.isInteger(data.cantidad)) {
        errors.cantidad = "La cantidad debe ser un número entero";
    }

    if (!data.estado) {
        errors.estado = "El estado es obligatorio";
    }

    if (!data.ubicacion?.trim()) {
        errors.ubicacion = "La ubicación es obligatoria";
    }

    if (!data.fechaRegistro) {
        errors.fechaRegistro = "La fecha de registro es obligatoria";
    } else {
        // Validar formato DD-MM-YYYY
        const regex = /^\d{2}-\d{2}-\d{4}$/;
        if (!regex.test(data.fechaRegistro)) {
            errors.fechaRegistro = "Formato inválido. Use DD-MM-YYYY";
        } else {
            const [dayVal, monthVal, yearVal] = data.fechaRegistro
                .split("-")
                .map(Number);
            const dateObj = new Date(yearVal, monthVal - 1, dayVal);
            if (
                dateObj.getFullYear() !== yearVal ||
                dateObj.getMonth() !== monthVal - 1 ||
                dateObj.getDate() !== dayVal
            ) {
                errors.fechaRegistro = "Fecha inválida";
            }
        }
    }

    return errors;
};

export const generateId = (): string => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 6);
    return `rec-${timestamp}-${random}`;
};

export const getTodayFormatted = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
};
