import "dotenv/config";
import express from "express";

import { getAll } from "./routes/albumes/getAll.js";
import { getBySlug } from "./routes/albumes/getBySlug.js";
import { getByGenero } from "./routes/albumes/getByGenero.js";
import { search } from "./routes/albumes/search.js";
import { create } from "./routes/albumes/create.js";
import { update } from "./routes/albumes/update.js";
import { remove } from "./routes/albumes/remove.js";

const app = express();

app.use(express.json());

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 4321;

app.get("/", (req, res) => res.json({ name: "DiscoStore API", version: "1.0" }));

app.get("/albumes", getAll);
app.get("/album/:slug", getBySlug);
app.get("/genero/:genero", getByGenero);
app.get("/search/:text", search);

app.post("/albumes", create);
app.put("/album/:slug", update);
app.delete("/album/:slug", remove);

app.use("/imagenes", express.static("public/imagenes"));

app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

app.listen(PORT, HOST, () => {
  console.log(`DiscoStore corriendo en http://${HOST}:${PORT}/`);
});