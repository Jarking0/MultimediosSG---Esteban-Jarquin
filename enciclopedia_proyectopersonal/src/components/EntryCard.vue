<template>
  <article class="card">
    <div class="card-image-container">
      <img :src="entry.imagen_pista" :alt="entry.titulo + ' en pista'" class="card-img-track" />
      
      <div class="logo-wrapper">
        <img :src="entry.imagen_logo" :alt="entry.titulo + ' logo'" class="card-img-logo" />
      </div>
    </div>

    <div class="card-content">
      <h2>{{ entry.titulo }}</h2>
      <span class="badge">{{ entry.categoria }}</span>
      <p class="description">{{ entry.descripcion }}</p>
      
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

  color: var(--text-color); 
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
}

.card-image-container {
  position: relative;
  width: 100%;
  height: 220px;
  background-color: #e5e7eb; 
}

.card-img-track {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-wrapper {
  position: absolute;
  bottom: -25px;
  right: 20px;
  width: 70px;
  height: 70px;
  background-color: var(--card-bg);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: background-color 0.3s ease;
}

.card-img-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.card-content {
  padding: 2rem 1.5rem 1.5rem 1.5rem; 
}

.card-content h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.badge {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.description {
  line-height: 1.6;
  opacity: 0.9;
}
</style>