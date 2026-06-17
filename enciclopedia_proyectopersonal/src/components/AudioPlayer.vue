<template>
  <div class="audio-player" v-if="src">
    <p>🔊 Escuchar narración:</p>
    <audio controls :src="src"></audio>
  </div>
</template>

<script setup>
defineProps(['src']);
</script>

<style scoped>
.audio-player {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ccc;
}
audio {
  width: 100%;
}
</style>