<script setup>
import { ref, onMounted } from 'vue';

const videoRef = ref(null);

onMounted(() => {
  navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.value.srcObject = stream;
      })
      .catch(error => {
        console.error('Error accessing media devices.', error);
      });
});

</script>

<template>
  <div>
    <video ref="videoRef" autoplay></video>
  </div>
</template>

<style scoped>

</style>