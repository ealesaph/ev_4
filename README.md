# Sistema de Gestión de Recursos Tecnológicos

Aplicación SPA desarrollada con React y Next.js para administrar los recursos tecnológicos de un laboratorio (notebooks, routers, switches, access points, impresoras 3D, sensores IoT, kits Arduino, cámaras, herramientas de red, entre otros), reemplazando el registro manual en planillas.

## Integrantes
- Estudiante 1: Enrique Alegría
- Estudiante 2: _(completar)_

## Descripción del proyecto
El sistema permite registrar, listar, editar, eliminar, buscar y filtrar recursos tecnológicos directamente desde el navegador, sin necesidad de un backend. Toda la información se conserva en el propio navegador del usuario mediante Local Storage, Session Storage y Cookies.

## Objetivo
Desarrollar una aplicación web SPA con React y Next.js que permita gestionar recursos tecnológicos mediante operaciones CRUD, utilizando Local Storage como almacenamiento principal, Session Storage para datos temporales de sesión y Cookies para preferencias simples del usuario.

## Tecnologías utilizadas
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Local Storage
- Session Storage
- Cookies

## Instalación y ejecución
```bash
git clone <URL_DEL_REPOSITORIO>
cd ev_4/gestion-recursos-lab
npm install
npm run dev
```
Luego abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Funcionalidades
- Crear recurso, con formulario y validaciones.
- Listar recursos en formato de tarjetas.
- Editar un recurso existente.
- Eliminar un recurso, con modal de confirmación previo.
- Buscar por nombre y filtrar por categoría o estado.
- Guardar el listado de recursos en Local Storage.
- Guardar filtros y búsqueda actual en Session Storage.
- Guardar tema (claro/oscuro) y nombre de usuario en Cookies.

## Estructura de carpetas
```
gestion-recursos-lab/
├── app/
│    ├── page.tsx        # Página principal: estado, CRUD y filtrado
│    └── layout.tsx
├── components/
│    ├── Header.tsx
│    ├── ResourceForm.tsx
│    ├── ResourceList.tsx
│    ├── ResourceCard.tsx
│    ├── SearchBar.tsx
│    ├── FilterCategory.tsx
│    ├── ThemeToggle.tsx
│    └── ConfirmDeleteModal.tsx
├── hooks/
│    ├── useLocalStorage.ts
│    ├── useSessionStorage.ts
│    └── useCookie.ts
├── types/
│    └── Resource.ts
└── utils/
     └── validations.ts
```

## Componentes principales
| Componente | Responsabilidad |
|---|---|
| `Header` | Título de la app, contador de recursos, nombre de usuario (cookie) y botón de tema. |
| `ResourceForm` | Crear y editar recursos, con validación de campos en tiempo real. |
| `ResourceList` | Renderiza el listado de recursos filtrados o un mensaje de "sin resultados". |
| `ResourceCard` | Muestra un recurso individual con sus datos y acciones de editar/eliminar. |
| `SearchBar` | Búsqueda de recursos por nombre. |
| `FilterCategory` | Filtro por categoría y por estado. |
| `ThemeToggle` | Alterna modo claro/oscuro y lo guarda en cookie. |
| `ConfirmDeleteModal` | Confirmación antes de eliminar un recurso. |

## Hooks utilizados
- **useState / useEffect**: manejo de estado local y sincronización con el almacenamiento del navegador al montar los componentes.
- **useLocalStorage** *(hook personalizado)*: lee y escribe en `window.localStorage`, usado para persistir el arreglo completo de recursos.
- **useSessionStorage** *(hook personalizado)*: lee y escribe en `window.sessionStorage`, usado para el término de búsqueda y los filtros activos.
- **useCookie** *(hook personalizado)*: lee y escribe cookies vía `document.cookie`, usado para el tema visual y el nombre de usuario.

## Uso de almacenamiento del navegador
| Mecanismo | Clave | Contenido |
|---|---|---|
| Local Storage | `lab_resources` | Listado completo de recursos tecnológicos (fuente de verdad del CRUD). |
| Session Storage | `lab_search` | Término de búsqueda actual. |
| Session Storage | `lab_filter_category` | Categoría seleccionada en el filtro. |
| Session Storage | `lab_filter_status` | Estado seleccionado en el filtro. |
| Cookie | `theme` | Preferencia de modo claro/oscuro (30 días). |
| Cookie | `user_name` | Nombre visible del usuario (30 días). |

No se almacena en ningún caso contraseñas, tokens ni datos personales sensibles.

## Validaciones
Implementadas en `utils/validations.ts` mediante `validateResource`:
- Nombre obligatorio, mínimo 3 caracteres.
- Categoría, estado y ubicación obligatorios.
- Cantidad obligatoria, entera y no negativa.
- Fecha de registro obligatoria, con formato `DD-MM-AAAA` y validación de que sea una fecha real.
- Responsable y descripción son opcionales.

## Uso de inteligencia artificial
Se utilizó IA como apoyo durante el desarrollo para: generar una estructura inicial de componentes, hooks y tipos; sugerir validaciones para el formulario; ayudar a corregir errores y explicar mensajes de error; y recomendar buenas prácticas para el uso de Local Storage, Session Storage y Cookies. El equipo revisó, comprende y puede explicar la totalidad del código entregado.

## Capturas de pantalla
_(Agregar aquí capturas de: listado de recursos, formulario con validación, edición, modal de confirmación de borrado, búsqueda/filtros en uso, y modo claro/oscuro.)_

## Conclusión
El desarrollo permitió aplicar en la práctica componentes, hooks y los tres mecanismos de almacenamiento del navegador en una aplicación real, reforzando la comprensión de cuándo usar Local Storage, Session Storage o Cookies según la persistencia y el alcance necesarios, además de la importancia de validar datos y organizar el proyecto en una estructura de carpetas clara.