import * as db from "../../data/albumes.js";
import { albumSchema } from "./schemas.js";

export const update = (req, res) => {
  const parsed = albumSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Datos inválidos", details: parsed.error.issues });
  }

  const result = db.update(req.params.slug, parsed.data);
  if (result.notFound) {
    return res.status(404).json({ error: "El álbum a actualizar no existe" });
  }

  res.status(200).json(parsed.data);
};