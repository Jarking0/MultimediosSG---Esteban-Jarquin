import { defineConfig } from 'vite';

export default defineConfig({
  root: "src", 
  base: "/MultimediosSG---Esteban-Jarquin/lab8/", 
  build: {
    outDir: "../dist", 
    target: "esnext"
  }
});