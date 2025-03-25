<template>
    <div>
        <!-- Nút mở sidebar -->
        <button class="menu-btn" @click="toggleSidebar">
            <i class="fa-solid fa-bars"></i>
        </button>

        <!-- Sidebar -->
        <div v-if="isOpen" class="sidebar-overlay" @click="closeSidebar">
            <div class="sidebar" @click.stop>
                <button class="close-btn" @click="closeSidebar">
                    <i class="fa-solid fa-times"></i>
                </button>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <button class="nav-link" @click="goToUser">
                            <i class="fa-solid fa-users"></i>
                            <span>Quản lý người dùng</span>
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" @click="goToBook">
                            <i class="fa-solid fa-book"></i>
                            <span>Quản lý sách</span>
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" @click="goToReview">
                            <i class="fa-solid fa-check-to-slot"></i>
                            <span>Xét duyệt yêu cầu</span>
                        </button>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="goToHistory">
                            <i class="fa fa-history" aria-hidden="true"></i>
                            <span>Lịch sử yêu cầu</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isOpen = ref(false);

const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
};

const closeSidebar = () => {
    isOpen.value = false;
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

const goToHistory = () => {
    router.push('/history');
    closeSidebar();
}

// Đóng sidebar khi nhấn phím Esc
const handleKeydown = (e) => {
    if (e.key === 'Escape') closeSidebar();
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
/* Nút mở menu */
.menu-btn {
    position: fixed;
    top: 25px;
    left: 15px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    z-index: 1100;
}

/* Overlay */
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
    transition: transform 0.3s ease-in-out;
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

.navbar-nav {
    margin-top: 50px;
}

/* Các mục menu */
.nav-link {
    display: flex;
    align-items: center;
    gap: 10px;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 10px;
    width: 100%;
    text-align: left;
}

.nav-link:hover {
    background: #f0f0f0;
}
</style>
