<template>
  <article class="card">
    <img :src="entry.imagen" :alt="entry.titulo" class="card-img" />
    <div class="card-content">
      <h2>{{ entry.titulo }}</h2>
      <span class="badge">{{ entry.categoria }}</span>
      <p>{{ entry.descripcion }}</p>
      
      <!-- Componente hijo anidado -->
      <AudioPlayer v-if="entry.audio" :src="entry.audio" />
    </div>
  </article>
</template>

<script setup>
import AudioPlayer from './AudioPlayer.vue';
defineProps(['entry']);
</script>

<style scoped>
.card {
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
}
.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.card-content {
  padding: 1.5rem;
}
.badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: 3px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}
</style>