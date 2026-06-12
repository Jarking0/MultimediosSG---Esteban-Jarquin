import * as mundial from "../../data/mundiales.js";

export const getAll = (req, res) => {
  res.header("Content-type", "application/json");
  const isFull = req.query.include === "full";
  
  const contents = isFull
    ? mundial.getAll()
    : mundial.getAll().map(item => item.slug);

  res.json(contents);
};