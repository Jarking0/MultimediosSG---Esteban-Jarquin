import * as mundial from "../../data/mundiales.js";

export const random = (req, res) => {
  const randomMundial = mundial.getRandom();
  res.json(randomMundial);
};