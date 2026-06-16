import * as db from "../../data/albumes.js";

export const search = (req, res) => {
  // Aquí podríamos meter Zod también, pero para el search básico tomamos el parámetro directo
  const query = req.params.text;
  const results = db.search(query);

  res.status(200).json(results);
};