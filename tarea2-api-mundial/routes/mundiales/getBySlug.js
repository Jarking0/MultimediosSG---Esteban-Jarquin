import * as mundial from "../../data/mundiales.js";

const notFound = (res, message) => {
  return res.status(404).json({ error: message });
}

export const getBySlug = (req, res) => {
  const edicion = mundial.getBySlug(req.params.slug);

  if (!edicion) {
    return notFound(res, "Edición del Mundial no encontrada");
  }

  res.json(edicion);
};