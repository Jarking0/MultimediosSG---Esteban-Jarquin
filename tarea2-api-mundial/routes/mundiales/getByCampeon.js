import * as mundial from "../../data/mundiales.js";

export const getByCampeon = (req, res) => {
  const mundiales = mundial.getByCampeon(req.params.pais);
  // Devolvemos un arreglo de strings (los slugs) como pide el enunciado
  res.json(mundiales.map(m => m.slug));
};