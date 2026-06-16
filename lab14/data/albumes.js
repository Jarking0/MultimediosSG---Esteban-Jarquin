import { DatabaseSync } from "node:sqlite";
import { cwd } from "node:process";

const db = new DatabaseSync(`${cwd()}/data/discostore.db`);

export const getAll = () => db.prepare("SELECT * FROM albumes").all();

export const getBySlug = (slug) => db.prepare("SELECT * FROM albumes WHERE slug = ?").get(slug);

export const getByGenero = (genero) => db.prepare("SELECT slug FROM albumes WHERE genero = ? COLLATE NOCASE").all(genero);

export const search = (text) => db.prepare("SELECT * FROM albumes WHERE titulo LIKE ? OR descripcion LIKE ? COLLATE NOCASE").all(`%${text}%`, `%${text}%`);

// --- OPERACIONES DE ESCRITURA (NUEVO) ---

export const create = (album) => {
  if (getBySlug(album.slug)) return { conflict: true }; // Si el slug ya existe
  const stmt = db.prepare(`INSERT INTO albumes (titulo, artista, genero, anio, sello, pistas, imagen, slug, resumen, descripcion) 
                           VALUES (:titulo, :artista, :genero, :anio, :sello, :pistas, :imagen, :slug, :resumen, :descripcion)`);
  stmt.run(album);
  return { success: true };
};

export const update = (slug, album) => {
  if (!getBySlug(slug)) return { notFound: true };
  const stmt = db.prepare(`UPDATE albumes SET titulo=:titulo, artista=:artista, genero=:genero, anio=:anio, 
                           sello=:sello, pistas=:pistas, imagen=:imagen, slug=:slug, resumen=:resumen, descripcion=:descripcion 
                           WHERE slug = :oldSlug`);
  stmt.run({ ...album, oldSlug: slug });
  return { success: true };
};

export const remove = (slug) => {
  if (!getBySlug(slug)) return { notFound: true };
  db.prepare("DELETE FROM albumes WHERE slug = ?").run(slug);
  return { success: true };
};