# API Copa Mundial de la FIFA

API REST desarrollada con Node.js, Express y SQLite que provee información sobre diversas ediciones de la Copa Mundial.

## Configuración y Ejecución

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

## Capturas de Pruebas (HTTPie / XH)

1. `xh GET :4321/mundiales`

   ![Prueba 1](./public/capturas/Prueba1.png)

2. `xh GET :4321/mundiales include==full`

   ![Prueba 2](./public/capturas/Prueba2.png)

3. `xh GET :4321/mundial/qatar-2022`

   ![Prueba 3](./public/capturas/Prueba3.png)

4. `xh GET :4321/mundial/inexistente` (Debe devolver 404)

   ![Prueba 4](./public/capturas/Prueba4.png)

5. `xh GET :4321/campeon/Argentina`

   ![Prueba 5](./public/capturas/Prueba5.png)

6. `xh GET :4321/random`

   ![Prueba 6](./public/capturas/Prueba6.png)

7. `xh GET :4321/search/final`

   ![Prueba 7](./public/capturas/Prueba7.png)

8. `xh GET :4321/search/ab` (Debe devolver 400 JSON)

   ![Prueba 8](./public/capturas/Prueba8.png)

---

## Verificación de Imágenes Estáticas

Para comprobar que las imágenes sirven correctamente desde el servidor de Node.js, estan los siguientes enlaces mientras el servidor esté corriendo (`pnpm run dev`):

* **Qatar 2022:** [http://localhost:4321/imagenes/qatar-2022.png](http://localhost:4321/imagenes/qatar-2022.png)
* **Rusia 2018:** [http://localhost:4321/imagenes/rusia-2018.png](http://localhost:4321/imagenes/rusia-2018.png)
* **Brasil 2014:** [http://localhost:4321/imagenes/brasil-2014.jpg](http://localhost:4321/imagenes/brasil-2014.jpg)
* **Sudáfrica 2010:** [http://localhost:4321/imagenes/sudafrica-2010.jpg](http://localhost:4321/imagenes/sudafrica-2010.jpg)
* **Alemania 2006:** [http://localhost:4321/imagenes/alemania-2006.jpg](http://localhost:4321/imagenes/alemania-2006.jpg)
* **Corea-Japón 2002:** [http://localhost:4321/imagenes/corea-japon-2002.png](http://localhost:4321/imagenes/corea-japon-2002.png)