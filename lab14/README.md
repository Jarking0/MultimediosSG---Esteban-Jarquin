## Capturas de Pruebas (HTTPie / XH)

### 1. Operaciones de Lectura (GET)

**Obtener todos los álbumes (200 OK):**
`xh GET :4321/albumes`
![Prueba GET Todos](./public/capturas/todos.png)

**Obtener un álbum específico (200 OK):**
`xh GET :4321/album/the-search`
![Prueba GET Slug](./public/capturas/album.png)

**Obtener álbumes por género (200 OK):**
`xh GET :4321/genero/Rock`
![Prueba GET Genero](./public/capturas/genero.png)

**Búsqueda por texto (200 OK):**
`xh GET :4321/search/jackson`
![Prueba GET Search](./public/capturas/search.png)

**Error al buscar álbum inexistente (404 Not Found):**
`xh GET :4321/album/no-existe`
![Prueba GET 404](./public/capturas/noexiste.png)

---

### 2. Operaciones de Escritura (POST, PUT, DELETE)

**Crear un nuevo álbum (201 Created):**
`xh POST :4321/albumes titulo="Un Verano Sin Ti" artista="Bad Bunny" genero="Reggaeton" anio:=2022 sello="Rimas" pistas:=23 imagen="uvst.avif" slug="un-verano-sin-ti" resumen="El album mas escuchado del 2022." descripcion="Bad Bunny rompe records con este increible disco caribeno."`
![Prueba POST 201](./public/capturas/create.png)

**Error al crear un álbum con slug duplicado (409 Conflict):**
*(Se ejecuta exactamente el mismo comando de arriba por segunda vez)*
`xh POST :4321/albumes titulo="Un Verano Sin Ti" artista="Bad Bunny" genero="Reggaeton" anio:=2022 sello="Rimas" pistas:=23 imagen="uvst.avif" slug="un-verano-sin-ti" resumen="El album mas escuchado del 2022." descripcion="Bad Bunny rompe records con este increible disco caribeno."`
![Prueba POST 409](./public/capturas/post.png)

**Error de validación de Zod por datos incompletos (400 Bad Request):**
`xh POST :4321/albumes titulo="Incompleto"`
![Prueba POST 400](./public/capturas/incompleto.png)

**Actualizar un álbum existente (200 OK):**
`xh PUT :4321/album/un-verano-sin-ti titulo="Un Verano Sin Ti (Edicion Especial)" artista="Bad Bunny" genero="Reggaeton" anio:=2022 sello="Rimas" pistas:=25 imagen="uvst.avif" slug="un-verano-sin-ti" resumen="El album mas escuchado del 2022." descripcion="Version extendida del exitoso disco caribeno."`
![Prueba PUT 200](./public/capturas/put.png)

**Eliminar un álbum (204 No Content):**
`xh DELETE :4321/album/un-verano-sin-ti`
![Prueba DELETE 204](./public/capturas/delete.png)

---

###Verificación de Imágenes Estáticas

Prueba de acceso a imágenes a través del navegador web demostrando el correcto funcionamiento de `express.static`:

* **Thriller (Michael Jackson):** [http://localhost:4321/imagenes/thriller.png](http://localhost:4321/imagenes/thriller.png)
* **The Search (NF):** [http://localhost:4321/imagenes/thesearch.png](http://localhost:4321/imagenes/thesearch.png)

