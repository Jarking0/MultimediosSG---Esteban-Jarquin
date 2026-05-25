import { defineConfig } from 'vite';

export default defineConfig({
  root: "src",
  base: "/MultimediosSG---Esteban-Jarquin/lab12/",
  build: {
    outDir: "../dist",
    target: "esnext"
  },
  test: {
    environment: "happy-dom",
    globals: true
  }
});
