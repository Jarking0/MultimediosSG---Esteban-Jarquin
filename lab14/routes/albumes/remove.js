import * as db from "../../data/albumes.js";

export const remove = (req, res) => {
  const result = db.remove(req.params.slug);
  if (result.notFound) {
    return res.status(404).json({ error: "El álbum a eliminar no existe" });
  }

  res.status(204).send(); 
};