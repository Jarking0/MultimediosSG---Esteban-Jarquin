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
        No se encontraron astros. ☄️
      </p>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import HeaderSection from './components/HeaderSection.vue';
import FilterControls from './components/FilterControls.vue';
import EntryCard from './components/EntryCard.vue';

// Estado Reactivo
const entries = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('Todas');
const isDarkMode = ref(false);

// Extraer categorías únicas
const categories = computed(() => {
  const cats = new Set(entries.value.map(e => e.categoria));
  return ['Todas', ...cats];
});

// Computed property para filtrar en tiempo real (Requisito cumplido)
const filteredEntries = computed(() => {
  return entries.value.filter(entry => {
    const matchesSearch = entry.titulo.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'Todas' || entry.categoria === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

// Ciclo de vida: Cargar datos desde JSON (Requisito cumplido)
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
/* Variables CSS globales para el modo claro/oscuro */
:root {
  --bg-color: #f0f2f5;
  --text-color: #333333;
  --card-bg: #ffffff;
  --header-bg: #ffffff;
  --primary-color: #3b82f6;
}

.dark-mode {
  --bg-color: #121212;
  --text-color: #f3f4f6;
  --card-bg: #1f2937;
  --header-bg: #1f2937;
  --primary-color: #2563eb;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease;
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