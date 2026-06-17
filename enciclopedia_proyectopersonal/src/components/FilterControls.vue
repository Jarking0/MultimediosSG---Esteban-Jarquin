<template>
  <div class="filters">
    <input 
      type="text" 
      placeholder="Buscar astro..." 
      :value="searchQuery"
      @input="$emit('update:searchQuery', $event.target.value)"
      class="search-box"
    />
    <div class="category-buttons">
      <button 
        v-for="cat in categories" 
        :key="cat"
        @click="$emit('update:selectedCategory', cat)"
        :class="{ active: selectedCategory === cat }"
      >
        {{ cat }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['searchQuery', 'selectedCategory', 'categories']);
defineEmits(['update:searchQuery', 'update:selectedCategory']);
</script>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
.search-box {
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
.category-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.category-buttons button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: var(--card-bg);
  color: var(--text-color);
}
.category-buttons button.active {
  background-color: var(--primary-color);
  color: white;
}
</style>