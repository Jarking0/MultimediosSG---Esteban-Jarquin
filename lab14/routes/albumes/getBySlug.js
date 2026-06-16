import * as db from "../../data/albumes.js";

export const getBySlug = (req, res) => {
  const album = db.getBySlug(req.params.slug);

  if (!album) {
    return res.status(404).json({ error: "El álbum solicitado no existe" });
  }

  res.status(200).json(album);
};