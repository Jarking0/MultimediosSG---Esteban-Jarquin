import * as db from "../../data/albumes.js";
import { albumSchema } from "./schemas.js";

export const create = (req, res) => {
  const parsed = albumSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Datos inválidos", details: parsed.error.issues });
  }

  const result = db.create(parsed.data);
  if (result.conflict) {
    return res.status(409).json({ error: "Ya existe un álbum con ese slug" });
  }

  res.status(201).header("Location", `/album/${parsed.data.slug}`).json(parsed.data);
};