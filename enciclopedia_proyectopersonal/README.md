# Enciclopedia del Sistema Solar

**Proyecto Personal - IF7102 Multimedios (Ciclo 2026)**
Sede Regional de Guanacaste, Recinto de Liberia - Universidad de Costa Rica.

Esta es una enciclopedia interactiva desarrollada como proyecto final para demostrar el aprendizaje autónomo de un framework JavaScript moderno. La aplicación permite explorar los astros de nuestro sistema solar, filtrar por categorías, buscar en tiempo real y escuchar audios descriptivos.

## Tecnologías y Framework
* **Framework elegido:** Vue 3 (utilizando Composition API con `<script setup>`).
* **Herramienta de construcción:** Vite.
* **Gestor de paquetes:** pnpm.
* **Estilos:** CSS3 puro con variables nativas para el cambio de temas.

## Características Implementadas
* **Modularidad:** Separación lógica en 4 componentes (`HeaderSection`, `FilterControls`, `EntryCard`, `AudioPlayer`).
* **Reactividad:** Uso de `ref` y `computed` para el filtrado instantáneo en la barra de búsqueda y por botones de categoría.
* **Consumo de datos:** Carga asíncrona de la información desde un archivo estático `enciclopedia.json` mediante la API `fetch()` en el hook del ciclo de vida `onMounted`.
* **Tema Dinámico:** Soporte para cambiar entre Modo Claro (☀️) y Modo Oscuro (🌙) de forma fluida.

## Instrucciones de Ejecución

Sigue estos pasos para correr el proyecto localmente en tu computadora:

1. Clona este repositorio o descarga el código fuente.
2. Abre una terminal en la carpeta raíz del proyecto (`enciclopedia_proyectopersonal`).
3. Instala las dependencias necesarias ejecutando:
   \`\`\`bash
   pnpm install
   \`\`\`
4. Inicia el servidor de desarrollo local ejecutando:
   \`\`\`bash
   pnpm run dev
   \`\`\`
5. Abre en tu navegador la URL que indique la terminal (por defecto suele ser `http://localhost:5173/`).

## Capturas de Pantalla

*(Nota para la revisión: A continuación se muestran las evidencias del funcionamiento de la interfaz)*

### Vista Principal y Filtrado
![Vista Principal](./public/capturas/vista-principal.png)

### Modo Oscuro Activado
![Modo Oscuro](./public/capturas/modo-oscuro.png)

---
**Desarrollado por:** Esteban Jarquín