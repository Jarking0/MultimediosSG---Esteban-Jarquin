import * as db from "../../data/albumes.js";

export const getByGenero = (req, res) => {
  const albumes = db.getByGenero(req.params.genero);
  // El enunciado pide devolver los slugs de los álbumes de ese género
  res.status(200).json(albumes.map(album => album.slug));
};