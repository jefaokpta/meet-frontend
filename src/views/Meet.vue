<script setup>
import { ref } from 'vue';
import VideoParticipant from '@/components/VideoParticipant.vue';
import Peer from 'peerjs';

const videosList = ref([]);
const myId = ref(null);
const peerId = ref(null);

const addVideo = () => {
  videosList.value.push({
    id: videosList.value.length + 1,
    speaker: 'Unknown',
  });
};

const peer = new Peer();
const sendMessage = (message) => {
  const anotherPeer = peer.connect(peerId.value);
  anotherPeer.on('open', () => {
    anotherPeer.send(message);
  });
};
const callPeer = () => {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const call = peer.call(peerId.value, stream);
      call.on('stream', remoteStream => {
        videosList.value.push({
          id: call.peer,
          speaker: 'originador',
          stream: remoteStream,
        });
      });
    })
    .catch(error => {
      console.error('Error accessing media devices.', error);
    });
};

peer.on('open', id => {
  myId.value = id;
});

peer.on('connection', conn => {
  conn.on('data', data => {
    console.log('Received', data);
  });
});


peer.on('call', call => {
  console.log('bateu no call')
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      call.answer(stream);
      call.on('stream', remoteStream => {
        videosList.value.push({
          id: call.peer,
          speaker: 'remoto',
          stream: remoteStream,
        });
      });
    })
    .catch(error => {
      console.error('Error accessing media devices.', error);
    });
});

</script>

<template>
  <div>
    <div>
      <h1>Meet my id {{myId}}</h1>
      <button @click="addVideo"  >Adiciona video</button>
      <input v-model="peerId" placeholder="Peer ID" />
      <button @click="sendMessage('fala ae!')">Send Message</button>
      <button @click="callPeer">Video Call Peer</button>
    </div>
    <div class="video-container">
      <video-participant :name="item.speaker" v-for="item in videosList" :key="item.id" class="video"/>
    </div>
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