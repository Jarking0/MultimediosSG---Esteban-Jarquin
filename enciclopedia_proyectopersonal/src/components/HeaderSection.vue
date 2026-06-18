<template>
  <header class="header">
    <h1>Enciclopedia del Automovilismo</h1>
    <button @click="$emit('toggle-theme')" class="theme-btn">
      {{ isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro' }}
    </button>
  </header>
</template>

<script setup>
defineProps(['isDark']);
defineEmits(['toggle-theme']);
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--header-bg);
  color: var(--text-color);
  border-radius: 8px;
  margin-bottom: 2rem;
}
.theme-btn {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
}
</style>