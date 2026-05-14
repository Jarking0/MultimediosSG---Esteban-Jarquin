import { defineConfig } from 'vite';

export default defineConfig({
  root: "src", 
  base: "/MultimediosSG---Esteban-Jarquin/lab10/", 
  build: {
    outDir: "../dist", 
    target: "esnext"
  }
});