import express from "express";
import { getAll } from "./routes/mundiales/getAll.js";
import { getBySlug } from "./routes/mundiales/getBySlug.js";
import { getByCampeon } from "./routes/mundiales/getByCampeon.js";
import { random } from "./routes/mundiales/random.js";
import { search } from "./routes/mundiales/search.js";

const app = express();

const HOST = "localhost";
const PORT = 4321;

app.get("/", (req, res) => res.json({ 
  name: "API Copa Mundial de la FIFA", 
  version: "1.0",
  endpoints: ["/mundiales", "/mundial/:slug", "/campeon/:pais", "/random", "/search/:text", "/imagenes/*"]
}));

app.get("/mundiales", getAll);
app.get("/mundial/:slug", getBySlug);
app.get("/campeon/:pais", getByCampeon);
app.get("/random", random);
app.get("/search/:text", search);

app.use("/imagenes", express.static("public/imagenes"));

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, HOST, () => {
  console.log(`Servidor de la FIFA corriendo en http://${HOST}:${PORT}/`);
});