# API Copa Mundial de la FIFA 🏆

API REST desarrollada con Node.js, Express y SQLite que provee información sobre diversas ediciones de la Copa Mundial.

## ⚙️ Configuración y Ejecución

1. Instalar dependencias:
   \`\`\`bash
   pnpm install
   \`\`\`

2. Poblar la base de datos (SQLite):
   \`\`\`bash
   pnpm run db:create
   \`\`\`

3. Iniciar el servidor en modo desarrollo:
   \`\`\`bash
   pnpm run dev
   \`\`\`
   El servidor se iniciará en `http://localhost:4321`

## 📸 Capturas de Pruebas (HTTPie / XH)

*(Sustituye este texto por las imágenes de tus capturas de pantalla)*

1. `xh GET :4321/mundiales`
   ![Prueba 1](./capturas/prueba1.png)
2. `xh GET :4321/mundiales include==full`
   ![Prueba 2](./capturas/prueba2.png)
3. `xh GET :4321/mundial/qatar-2022`
   ![Prueba 3](./capturas/prueba3.png)
4. `xh GET :4321/mundial/inexistente` (Debe devolver 404)
   ![Prueba 4](./capturas/prueba4.png)
5. `xh GET :4321/campeon/Argentina`
   ![Prueba 5](./capturas/prueba5.png)
6. `xh GET :4321/random`
   ![Prueba 6](./capturas/prueba6.png)
7. `xh GET :4321/search/final`
   ![Prueba 7](./capturas/prueba7.png)
8. `xh GET :4321/search/ab` (Debe devolver 400 JSON)
   ![Prueba 8](./capturas/prueba8.png)