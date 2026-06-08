#! /usr/bin/env node
import { parseArgs } from "node:util";
import { argv, exit } from "node:process";
import { readFileSync, writeFileSync } from "node:fs";
import { styleText } from "node:util";

// Definición de opciones
const options = {
  file: { type: "string", short: "f" },
  output: { type: "string", short: "o" },
  help: { type: "boolean", short: "h" }
};

const { values } = parseArgs({ args: argv.slice(2), options, strict: false });

// Mostrar ayuda si falta --file o se pide --help
if (values.help || !values.file) {
  console.log(styleText("blue", "Uso:"));
  console.log("  node analizar.js --file <archivo.txt> [--output <resumen.txt>]");
  console.log("  node analizar.js -f <archivo.txt> [-o <resumen.txt>]");
  exit(0);
}

try {
  // Leer archivo
  const contents = readFileSync(values.file, { encoding: "utf-8" });

  // Calcular métricas
  const lineas = contents.split("\n").length;
  const palabras = contents.trim().split(/\s+/).filter(Boolean).length;
  const caracteres = contents.length;

  // Mostrar resultados en consola con colores
  console.log(styleText("magenta", "Análisis del archivo: ") + values.file);
  console.log(styleText("green", `Líneas: ${lineas}`));
  console.log(styleText("blue", `Palabras: ${palabras}`));
  console.log(styleText("yellow", `Caracteres: ${caracteres}`));

  // Si se especifica --output, escribir resumen
  if (values.output) {
    const resumen = `Archivo: ${values.file}
Líneas: ${lineas}
Palabras: ${palabras}
Caracteres: ${caracteres}
`;
    writeFileSync(values.output, resumen, { encoding: "utf-8" });
    console.log(styleText(["bgGreen", "black"], `Resumen guardado en ${values.output}`));
  }
} catch (err) {
  console.error(styleText("red", "Error: ") + err.message);
}
