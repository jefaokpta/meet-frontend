<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  src: {
    type: MediaStream,
    required: true
  }
});
const videoRef = ref(null);

onMounted(() => {
  videoRef.value.srcObject = props.src;
});

</script>

<template>
  <div class="video-container">
    <video ref="videoRef" autoplay></video>
    <div class="name-overlay">{{ name }}</div>
  </div>
</template>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  height: 100%;
}

video {
  width: 100%;
  height: auto;
}

.name-overlay {
  position: absolute;
  bottom: 1px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}
</style>