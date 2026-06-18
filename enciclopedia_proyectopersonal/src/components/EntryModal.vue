<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <button class="close-btn" @click="$emit('close')">✖</button>
      
      <div class="modal-header">
        <h2 class="modal-title">{{ entry.titulo }}</h2>
        <span class="modal-badge">{{ entry.categoria }}</span>
      </div>

      <nav class="tabs">
        <button :class="{ active: tabActiva === 'historia' }" @click="tabActiva = 'historia'">Historia</button>
        <button :class="{ active: tabActiva === 'datos' }" @click="tabActiva = 'datos'">Datos Técnicos</button>
        <button :class="{ active: tabActiva === 'pilotos' }" @click="tabActiva = 'pilotos'">Pilotos</button>
        <button :class="{ active: tabActiva === 'equipos' }" @click="tabActiva = 'equipos'">Equipos</button>
        <button :class="{ active: tabActiva === 'eventos' }" @click="tabActiva = 'eventos'">Timeline</button>
      </nav>

      <div class="modal-body">
        
        <div v-if="tabActiva === 'historia'" class="tab-content">
          <p v-for="(parrafo, index) in entry.historia" :key="index">{{ parrafo }}</p>
          
          <div class="historia-galeria" v-if="entry.historiaImagenes && entry.historiaImagenes.length > 0">
            <img 
              v-for="(img, i) in entry.historiaImagenes" 
              :key="i" 
              :src="img.src" 
              :alt="img.alt" 
              class="historia-img interactive"
              @click="openLightbox(img)" 
            />
          </div>

          <div class="historia-audio" v-if="entry.audio_historia">
            <AudioPlayer :src="entry.audio_historia" />
          </div>
        </div>

        <div v-if="tabActiva === 'datos'" class="tab-content stats-grid">
          <div class="stat-card" v-for="(stat, index) in entry.stats" :key="index">
            <span class="stat-label">{{ stat.label }}</span>
            <span class="stat-value">{{ stat.valor }} <small>{{ stat.unidad }}</small></span>
          </div>
        </div>

        <div v-if="tabActiva === 'pilotos'" class="tab-content">
          <div class="info-list">
            <div class="info-item" v-for="p in entry.pilotos" :key="'info-'+p.nombre">
              <div class="info-text">
                <p class="item-nombre">{{ p.nombre }}</p>
                <p class="item-detalle">{{ p.detalle }}</p>
              </div>
            </div>
          </div>

          <div class="slideshow-container" v-if="entry.pilotos && entry.pilotos.length > 0">
            <h4 class="slideshow-title">Galería de Pilotos</h4>
            <div class="slideshow-wrapper">
              <button class="slide-arrow left" @click="manualPrevPiloto">❮</button>
              
              <Transition name="fade" mode="out-in">
                <div class="slide" :key="slideIndexPilotos">
                  <img :src="entry.pilotos[slideIndexPilotos].imagen" :alt="entry.pilotos[slideIndexPilotos].nombre" class="slide-img" />
                  <div class="slide-caption">
                    <em>{{ entry.pilotos[slideIndexPilotos].nombre }}</em>
                  </div>
                </div>
              </Transition>
              
              <button class="slide-arrow right" @click="manualNextPiloto">❯</button>
            </div>
            <div class="slide-dots">
              <span v-for="(p, i) in entry.pilotos" :key="'dot-'+i" class="dot" :class="{ active: slideIndexPilotos === i }" @click="goToSlidePiloto(i)"></span>
            </div>
          </div>
        </div>

        <div v-if="tabActiva === 'equipos'" class="tab-content">
          <div class="info-list">
            <div class="info-item" v-for="e in entry.equipos" :key="'info-'+e.nombre">
              <div class="info-text">
                <p class="item-nombre">{{ e.nombre }}</p>
                <p class="item-detalle">{{ e.detalle }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="tabActiva === 'eventos'" class="tab-content timeline">
          <div class="timeline-item" v-for="(evento, index) in entry.temporadas" :key="index">
            <div class="year">{{ evento.anio }}</div>
            <div class="event-desc">{{ evento.descripcion }}</div>
          </div>
        </div>

      </div>
    </div>

    <Transition name="fade">
      <div class="lightbox-overlay" v-if="selectedImage" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">✖</button>
        <div class="lightbox-content">
          <img :src="selectedImage.src" :alt="selectedImage.alt" class="lightbox-img" />
          <p class="lightbox-caption">{{ selectedImage.alt }}</p>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import AudioPlayer from './AudioPlayer.vue';

const props = defineProps(['entry']);
defineEmits(['close']);

const tabActiva = ref('historia');

// --- LÓGICA DEL LIGHTBOX ---
const selectedImage = ref(null);

const openLightbox = (img) => {
  selectedImage.value = img;
};
const closeLightbox = () => {
  selectedImage.value = null;
};

// --- LÓGICA DEL SLIDESHOW DE PILOTOS ---
const slideIndexPilotos = ref(0);
let slideTimerPilotos = null;

const nextSlidePiloto = () => {
  if (props.entry.pilotos && props.entry.pilotos.length > 0) {
    slideIndexPilotos.value = (slideIndexPilotos.value + 1) % props.entry.pilotos.length;
  }
};

const prevSlidePiloto = () => {
  if (props.entry.pilotos && props.entry.pilotos.length > 0) {
    slideIndexPilotos.value = (slideIndexPilotos.value - 1 + props.entry.pilotos.length) % props.entry.pilotos.length;
  }
};

const startTimerPilotos = () => { 
  slideTimerPilotos = setInterval(nextSlidePiloto, 3500); 
};

const stopTimerPilotos = () => { 
  if (slideTimerPilotos) clearInterval(slideTimerPilotos); 
};

// Controles manuales que reinician el contador automático
const manualNextPiloto = () => { 
  nextSlidePiloto(); 
  stopTimerPilotos(); 
  startTimerPilotos(); 
};

const manualPrevPiloto = () => { 
  prevSlidePiloto(); 
  stopTimerPilotos(); 
  startTimerPilotos(); 
};

const goToSlidePiloto = (index) => { 
  slideIndexPilotos.value = index; 
  stopTimerPilotos(); 
  startTimerPilotos(); 
};

onMounted(() => {
  startTimerPilotos();
});

onUnmounted(() => {
  stopTimerPilotos();
});
</script>

<style scoped>
/* ESTILOS GLOBALES DEL MODAL */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(5px);
  display: flex; justify-content: center; align-items: center; z-index: 1000;
}

.modal-container {
  background: #12151f; color: #f9fafb;
  width: 90%; max-width: 650px; max-height: 90vh;
  border-radius: 12px; display: flex; flex-direction: column;
  position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.close-btn {
  position: absolute; top: 15px; right: 20px;
  background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;
  opacity: 0.7; transition: opacity 0.3s;
}
.close-btn:hover { opacity: 1; }

.modal-header { padding: 2rem 2rem 1rem 2rem; }
.modal-title { margin: 0 0 0.5rem 0; font-size: 1.8rem; }
.modal-badge { background: var(--primary-color); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }

/* TABS */
.tabs {
  display: flex; border-bottom: 1px solid #2a3143;
  padding: 0 2rem; gap: 1rem; overflow-x: auto;
}
.tabs button {
  background: none; border: none; color: #8e95a5;
  padding: 0.8rem 0.5rem; cursor: pointer; font-weight: bold;
  border-bottom: 3px solid transparent; transition: all 0.3s;
  white-space: nowrap;
}
.tabs button:hover { color: #fff; }
.tabs button.active { color: #fff; border-bottom-color: var(--primary-color); }

.modal-body { padding: 1.5rem 2rem; overflow-y: auto; flex-grow: 1; }
.tab-content p { line-height: 1.6; color: #d1d5db; }

/* 1. HISTORIA */
.historia-galeria {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px; margin-top: 12px;
}
.historia-img { 
  width: 100%; height: 110px; object-fit: cover; border-radius: 6px; 
}
.historia-img.interactive {
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.historia-img.interactive:hover {
  transform: scale(1.05);
  opacity: 0.8;
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}
.historia-audio { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1); }

/* 2. DATOS TÉCNICOS */
.stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
.stat-card {
  background: #1a1f2e; padding: 1rem; border-radius: 8px;
  border: 1px solid #2a3143; display: flex; flex-direction: column;
}
.stat-label { font-size: 0.85rem; color: #8e95a5; text-transform: uppercase; letter-spacing: 1px; }
.stat-value { font-size: 1.5rem; font-weight: bold; margin-top: 5px; color: #fff; }
.stat-value small { font-size: 0.9rem; font-weight: normal; color: #9ca3af; }

/* 3. y 4. LISTAS DE INFO */
.info-list { margin-bottom: 1.5rem; }
.info-item { padding: 8px 0; border-bottom: 0.5px solid rgba(255,255,255,0.07); }
.item-nombre { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 16px; margin: 0 0 2px; color: #fff; }
.item-detalle { font-size: 13px; color: rgba(255,255,255,0.6); margin: 0; }

/* SLIDESHOW DE PILOTOS */
.slideshow-container {
  margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;
}
.slideshow-title { margin-top: 0; margin-bottom: 1rem; font-size: 0.9rem; text-transform: uppercase; color: #8e95a5; letter-spacing: 1px; }
.slideshow-wrapper {
  position: relative; width: 100%; height: 250px; border-radius: 8px; overflow: hidden; background-color: #1a1f2e;
}
.slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; }
.slide-img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
.slide-caption {
  position: absolute; bottom: 0; left: 0; width: 100%; padding: 1rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.8)); color: #fff; font-size: 1.1rem; font-weight: bold; letter-spacing: 0.5px;
}

/* FLECHAS DE NAVEGACIÓN MANUAL */
.slide-arrow {
  position: absolute; top: 50%; transform: translateY(-50%); background-color: rgba(0, 0, 0, 0.4);
  color: white; border: none; width: 35px; height: 35px; border-radius: 50%;
  font-size: 1rem; cursor: pointer; z-index: 10; display: flex; justify-content: center; align-items: center;
  transition: background-color 0.3s, transform 0.3s;
}
.slide-arrow:hover { background-color: var(--primary-color); transform: translateY(-50%) scale(1.1); }
.slide-arrow.left { left: 10px; }
.slide-arrow.right { right: 10px; }

/* Puntos de Slideshow */
.slide-dots { display: flex; justify-content: center; gap: 8px; margin-top: 12px; }
.dot {
  width: 10px; height: 10px; background-color: rgba(255,255,255,0.2); border-radius: 50%;
  cursor: pointer; transition: background-color 0.3s, transform 0.3s;
}
.dot.active { background-color: var(--primary-color); transform: scale(1.2); }

/* TRANSICIONES GLOBALES */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* 5. TIMELINE */
.timeline-item { display: flex; gap: 1rem; margin-bottom: 1.2rem; }
.year { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; color: var(--primary-color); flex-shrink: 0; width: 50px; font-size: 1.1rem; }
.event-desc { font-family: 'Barlow', sans-serif; color: #d1d5db; line-height: 1.5; }

/* LIGHTBOX */
.lightbox-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(8px);
  display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 2000;
}
.lightbox-content { text-align: center; max-width: 90%; max-height: 90%; display: flex; flex-direction: column; align-items: center; }
.lightbox-img {
  max-width: 100%; max-height: 75vh; object-fit: contain;
  border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.lightbox-caption {
  color: #f9fafb; margin-top: 1.5rem; font-size: 1.2rem; font-style: italic; letter-spacing: 0.5px;
}
.lightbox-close {
  position: absolute; top: 25px; right: 35px; background: none; border: none;
  color: #fff; font-size: 2.5rem; cursor: pointer; opacity: 0.7; transition: opacity 0.3s ease, transform 0.3s ease;
}
.lightbox-close:hover { opacity: 1; transform: scale(1.1); }
</style>