import { z } from "zod";

export const albumSchema = z.object({
  titulo: z.string().min(1, "El título es requerido"),
  artista: z.string().min(1, "El artista es requerido"),
  genero: z.string().min(1, "El género es requerido"),
  anio: z.number().int().min(1900, "Año inválido"),
  sello: z.string().min(1, "El sello es requerido"),
  pistas: z.number().int().min(1, "Debe tener al menos 1 pista"),
  imagen: z.string().min(1, "La imagen es requerida"),
  slug: z.string().min(1, "El slug es requerido"),
  resumen: z.string().min(10, "Resumen muy corto"),
  descripcion: z.string().min(10, "Descripción muy corta")
});