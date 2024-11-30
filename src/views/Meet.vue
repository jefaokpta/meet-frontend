<script setup>

import {ref} from "vue";
import VideoParticipant from "@/components/VideoParticipant.vue";

const videosList = ref([
  {
    id: 1,
    title: 'Vue 3 for everyone',
    speaker: 'John Doe',
  },
  {
    id: 2,
    title: 'React 18 alpha',
    speaker: 'Jane Doe',
  },
  {
    id: 3,
    title: 'Angular 12 is out',
    speaker: 'John Doe',
  },
  {
    id: 4,
    title: 'Svelte 4 is coming',
    speaker: 'Jane Doe',
  },
  {
    id: 5,
    title: 'Ember 4 is here',
    speaker: 'John Doe',
  },
  {
    id: 6,
    title: 'Backbone 2 is back',
    speaker: 'Jane Doe',
  },
]);
</script>

<template>
  <div>
    <h1>Meet</h1>
    <p>Find and meet other developers</p>
  </div>
  <div class="container">
    <video-participant v-for="item in videosList" class="participant" />
  </div>
</template>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 90%;
  height: 100%;
}
.participant {
  width: 30%;
  border: 1px solid #000;
  box-sizing: border-box;
}
</style>