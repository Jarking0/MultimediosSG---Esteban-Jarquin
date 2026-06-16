import * as db from "../../data/albumes.js";

export const getAll = (req, res) => {
  res.header("Content-type", "application/json");
  const contents = db.getAll();
  res.status(200).json(contents);
};