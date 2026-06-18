<template>
  <div :class="['app-container', { 'dark-mode': isDarkMode }]">
    <main class="wrapper">
      <HeaderSection 
        :isDark="isDarkMode" 
        @toggle-theme="isDarkMode = !isDarkMode" 
      />

      <FilterControls 
        v-model:searchQuery="searchQuery"
        v-model:selectedCategory="selectedCategory"
        :categories="categories"
      />

      <div class="grid">
        <EntryCard 
          v-for="entry in filteredEntries" 
          :key="entry.id" 
          :entry="entry" 
        />
      </div>
      
      <p v-if="filteredEntries.length === 0" class="no-results">
        No se encontraron categorías.
      </p>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import HeaderSection from './components/HeaderSection.vue';
import FilterControls from './components/FilterControls.vue';
import EntryCard from './components/EntryCard.vue';

const entries = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('Todas');
const isDarkMode = ref(false);

const categories = computed(() => {
  const cats = new Set(entries.value.map(e => e.categoria));
  return ['Todas', ...cats];
});

const filteredEntries = computed(() => {
  return entries.value.filter(entry => {
    const matchesSearch = entry.titulo.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'Todas' || entry.categoria === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

onMounted(async () => {
  try {
    const response = await fetch('/data/enciclopedia.json');
    entries.value = await response.json();
  } catch (error) {
    console.error("Error cargando el JSON:", error);
  }
});
</script>

<style>

:root {
  --bg-color: #f3f4f6; /* Gris muy clarito para el fondo */
  --text-color: #1f2937; /* Gris muy oscuro para las letras (Modo claro) */
  --card-bg: #ffffff; /* Tarjetas blancas */
  --header-bg: #ffffff;
  --primary-color: #dc2626; /* Un rojo racing para el tema de autos */
}

.dark-mode {
  --bg-color: #111827; /* Azul noche muy oscuro */
  --text-color: #f9fafb; /* Blanco tiza para las letras (Modo oscuro) */
  --card-bg: #1f2937; /* Tarjetas grises oscuras */
  --header-bg: #1f2937;
  --primary-color: #ef4444; /* Rojo más brillante para el modo oscuro */
}

body {
  margin: 0;
  font-family: 'Inter', Arial, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color); /* El body hereda el color de texto correcto */
  transition: background-color 0.3s ease, color 0.3s ease;
}

.app-container {
  min-height: 100vh;
  padding: 2rem;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.no-results {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
}
</style>