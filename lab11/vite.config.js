import { defineConfig } from 'vite';

export default defineConfig({
  root: "src", 
  base: "/MultimediosSG---Esteban-Jarquin/lab11/", 
  build: {
    outDir: "../dist", 
    target: "esnext"
  }
});