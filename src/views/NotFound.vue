<template>
    <div class="not-found">
        <h1>404 - Không tìm thấy trang</h1>
        <p>Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
        <button @click="goHome">Quay về trang chủ</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.push('/');
};
</script>

<style scoped>
.not-found {
    text-align: center;
    padding: 50px;
}

h1 {
    font-size: 2rem;
    color: #ff4d4d;
}

p {
    font-size: 1.2rem;
    margin-bottom: 20px;
}

button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
