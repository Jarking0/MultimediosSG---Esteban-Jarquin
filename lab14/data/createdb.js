import { DatabaseSync } from "node:sqlite";
import data from "./data.json" with { type: "json" };
import { cwd } from "node:process";
import { readFileSync } from "node:fs";

const db = new DatabaseSync(`${cwd()}/data/discostore.db`);
const sql = readFileSync(`${cwd()}/data/CREATE.SQL`, "utf-8");
db.exec(sql);

const query = db.prepare(`INSERT INTO albumes (titulo, artista, genero, anio, sello, pistas, imagen, slug, resumen, descripcion) 
VALUES (:titulo, :artista, :genero, :anio, :sello, :pistas, :imagen, :slug, :resumen, :descripcion)`);

for (const album of data) {
  query.run(album);
}
console.log("Base de datos DiscoStore inicializada.");