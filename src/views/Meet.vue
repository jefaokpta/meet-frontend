<script setup>
import { ref } from 'vue';
import VideoParticipant from '@/components/VideoParticipant.vue';

const videosList = ref([
  {id: 1, title: 'Vue 3 for everyone', speaker: 'John Doe'},
  {id: 2, title: 'React 18 alpha', speaker: 'Jane Doe'},
  // {id: 3, title: 'Angular 12 is out', speaker: 'John Doe'},
  // {id: 4, title: 'Svelte 4 is coming', speaker: 'Jane Doe'},
  // {id: 5, title: 'Ember 4 is here', speaker: 'John Doe'},
  // {id: 6, title: 'Backbone 2 is back', speaker: 'Jane Doe'},
  // {id: 7, title: 'Meteor 2 is hot', speaker: 'John Doe'},
  // {id: 8, title: 'Aurelia 2 is cool', speaker: 'Jane Doe'},
  // {id: 9, title: 'Polymer 3 is awesome', speaker: 'John Doe'},
  // {id: 10, title: 'Vanilla JS rocks', speaker: 'Jane Doe'},
  // {id: 11, title: 'TypeScript is the future', speaker: 'John Doe'},
  // {id: 12, title: 'JavaScript is everywhere', speaker: 'Jane Doe'},
  // {id: 13, title: 'WebAssembly is fast', speaker: 'John Doe'},
  // {id: 14, title: 'Rust is safe', speaker: 'Jane Doe'},
  // {id: 15, title: 'Deno is secure', speaker: 'John Doe'},
  // {id: 16, title: 'Node.js is powerful', speaker: 'Jane Doe'},
]);
</script>

<template>
  <div class="video-container">
    <video-participant v-for="item in videosList" :key="item.id" class="video"/>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.video-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  gap: 10px;
}

.video {
  flex: 1 1 calc(25% - 10px); /* Tamanho base: 25% da largura da tela menos o espaçamento */
  max-width: calc(25% - 10px);
  aspect-ratio: 16 / 9; /* Proporção do vídeo */
  background-color: #000;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 1200px) {
  .video {
    flex: 1 1 calc(33.33% - 10px); /* Ajusta para 3 colunas */
    max-width: calc(33.33% - 10px);
  }
}

@media (max-width: 768px) {
  .video {
    flex: 1 1 calc(50% - 10px); /* Ajusta para 2 colunas */
    max-width: calc(50% - 10px);
  }
}

@media (max-width: 480px) {
  .video {
    flex: 1 1 100%; /* Ajusta para 1 coluna */
    max-width: 100%;
  }
}
</style>