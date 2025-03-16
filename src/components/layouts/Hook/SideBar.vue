<template>
    <div class="sidebar-overlay" @click="closeSidebar">
        <div class="sidebar" @click.stop>
            <button class="close-btn" @click="closeSidebar">
                <i class="fa-solid fa-times"></i>
            </button>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" @click="goToUser">
                        <i class="fa-solid fa-users"></i>
                        <span>Quản lý người dùng</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click="goToBook">
                        <i class="fa-solid fa-book"></i>
                        <span>Quản lý sách</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click="goToReview">
                        <i class="fa-solid fa-check-to-slot"></i>
                        <span>Xét duyệt yêu cầu</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import router from '@/router/index.router';

const emit = defineEmits(['close']);

const closeSidebar = () => {
    emit('close');
};

const goToUser = () => {
    router.push('/user');
    closeSidebar();
};

const goToBook = () => {
    router.push('/book');
    closeSidebar();
};

const goToReview = () => {
    router.push('/review');
    closeSidebar();
};
</script>

<style scoped>
/* Overlay mờ khi mở sidebar */
.sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 1000;
}

/* Sidebar */
.sidebar {
    width: 250px;
    height: 100%;
    background: white;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
    position: relative;
    transform: translateX(0);
}

/* Nút đóng */
.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}
</style>
