<template>
    <div v-if="isCameraOpen" class="camera">
        <video ref="video" style="width: 800px; height: 500px;" autoplay></video>
        <canvas ref="canvas" style="display: none;"></canvas>
        <button @click="closeCamera">Đóng Camera</button>
    </div>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from 'vue';
import jsQR from 'jsqr';

const video = ref(null);
const canvas = ref(null);
const scanning = ref(false);
const isCameraOpen = ref(false);
const emit = defineEmits(['qr-scanned']);

const startCamera = () => {
    isCameraOpen.value = true;
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            if (video.value) {
                video.value.srcObject = stream;
                video.value.onloadedmetadata = () => {
                    video.value.play();
                    scanning.value = true;
                    scanFrame();
                };
            }
        })
        .catch(error => {
            console.error('Không thể truy cập camera:', error);
        });
};

const stopCamera = () => {
    if (video.value && video.value.srcObject) {
        const tracks = video.value.srcObject.getTracks();
        tracks.forEach(track => track.stop());
    }
    isCameraOpen.value = false;
};

const closeCamera = () => {
    scanning.value = false;
    stopCamera();
};

const scanFrame = () => {
    if (!scanning.value) return;

    if (!video.value || video.value.readyState !== video.value.HAVE_ENOUGH_DATA) {
        requestAnimationFrame(scanFrame);
        return;
    }

    const ctx = canvas.value.getContext('2d');
    canvas.value.width = video.value.videoWidth;
    canvas.value.height = video.value.videoHeight;

    if (canvas.value.width === 0 || canvas.value.height === 0) {
        requestAnimationFrame(scanFrame);
        return;
    }

    ctx.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
    const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
        emit('qr-scanned', code.data);
        closeCamera();
    }

    requestAnimationFrame(scanFrame);
};

// Cho phép component cha có thể gọi mở camera
defineExpose({ startCamera });
</script>

<style scoped>
.camera {
    display: flex;
    flex-direction: column;
}

button {
    margin-top: 10px;
    width: 150px;
    padding: 10px 15px;
    font-size: 16px;
    background-color: #d9534f;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
}

button:hover {
    background-color: #c9302c;
}
</style>
