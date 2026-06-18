<template>
  <article class="card" @click="$emit('seleccionar', entry)" :class="claseCategoria">
    
    <div class="card-header-wrapper">
      <div class="card-image-container">
        <img :src="entry.imagen_pista" :alt="entry.titulo" class="card-img-track" />
      </div>
      
      <div class="logo-wrapper">
        <img :src="entry.imagen_logo" :alt="entry.titulo + ' logo'" class="card-img-logo" />
      </div>
    </div>

    <div class="card-content">
      <h2>{{ entry.titulo }}</h2>
      <span class="badge">{{ entry.categoria }}</span>
      <p class="description">{{ entry.descripcion }}</p>
      
      <div class="card-audio" @click.stop v-if="entry.audio">
        <button class="play-btn" @click="toggleAudio" :aria-label="playing ? 'Pausar' : 'Reproducir'">
          <span v-if="!playing">▶</span>
          <span v-else>⏸</span>
        </button>
        <span class="audio-label">{{ playing ? 'Reproduciendo...' : 'Escuchar narración' }}</span>
        <audio ref="audioRef" :src="entry.audio" @ended="playing = false"></audio>
      </div>

      <div class="ver-mas">
        <span>Ver detalles</span>
        <span class="arrow">➔</span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['entry']);
defineEmits(['seleccionar']);

// LOGICA DE AUDIO
const audioRef = ref(null);
const playing = ref(false);

function toggleAudio() {
  if (!audioRef.value) return;
  
  if (playing.value) {
    audioRef.value.pause();
    playing.value = false;
  } else {
    audioRef.value.play();
    playing.value = true;
  }
}

const claseCategoria = computed(() => {
  const cat = props.entry.categoria.toLowerCase();
  if (cat.includes('monoplaza')) return 'border-red';
  if (cat.includes('resistencia')) return 'border-blue';
  if (cat.includes('rally')) return 'border-green';
  return 'border-gray';
});
</script>

<style scoped>
.card {
  background-color: var(--card-bg);
  color: var(--text-color); 
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
  cursor: pointer;
  
  border-left: 5px solid transparent; 
  box-sizing: border-box; 
  height: 100%; 
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
}
.card:hover .card-img-track {
  transform: scale(1.05);
}

.border-red { border-left-color: #dc3232; }
.border-blue { border-left-color: #3b82f6; }
.border-green { border-left-color: #10b981; }
.border-gray { border-left-color: #6b7280; }

.card-header-wrapper {
  position: relative;
  width: 100%;
  flex-shrink: 0;
}

.card-image-container {
  width: 100%;
  height: 180px; 
  overflow: hidden; 
}

.card-img-track {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  transition: transform 0.4s ease;
}

.logo-wrapper {
  position: absolute; 
  bottom: -30px;
  right: 15px;
  width: 60px; 
  height: 60px; 
  background-color: var(--card-bg);
  border-radius: 50%; 
  display: flex; 
  justify-content: center; 
  align-items: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
  z-index: 2;
}

.card-img-logo { 
  width: 40px; 
  height: 40px; 
  object-fit: contain; 
}

.card-content { 
  padding: 2.5rem 1.5rem 1.5rem 1.5rem; 
  flex-grow: 1; 
  display: flex; 
  flex-direction: column; 
}

.card-content h2 { 
  margin: 0 0 0.5rem 0; 
  font-size: 1.4rem; 
  color: var(--text-color);
}

.badge {
  display: inline-block; padding: 0.3rem 0.6rem; background-color: var(--primary-color);
  color: white; border-radius: 20px; font-size: 0.75rem; font-weight: bold; margin-bottom: 1rem; align-self: flex-start;
}

.description { 
  line-height: 1.5; 
  opacity: 0.9; 
  margin-bottom: 1.5rem; 
  color: var(--text-color); 
}

.card-audio {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(150,150,150,0.2);
  margin-top: auto;
}

.play-btn {
  width: 35px; height: 35px;
  border-radius: 50%;
  background-color: #dc3232;
  color: white;
  border: none;
  cursor: pointer;
  display: flex; justify-content: center; align-items: center;
  font-size: 1rem;
  transition: transform 0.2s, background-color 0.2s;
}

.play-btn:hover {
  transform: scale(1.1);
  background-color: #b91c1c;
}

.audio-label {
  font-size: 0.85rem;
  font-weight: bold;
  opacity: 0.8;
}

audio { display: none; } 

.ver-mas {
  display: flex; justify-content: space-between; align-items: center;
  font-weight: bold; color: var(--primary-color); font-size: 0.9rem;
  margin-top: 1rem; 
}
.arrow { transition: transform 0.3s; }
.card:hover .arrow { transform: translateX(5px); }
</style>