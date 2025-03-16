<template>

    <div class="header bg-light">
        <div class="container-fluid bg-light">

            <nav class="navbar navbar-expand-lg navbar-light ">

                <!-- Logo -->
                <a class="navbar-brand logo-container" @click="goToDashboard">
                    <img src="../../assets/logo.svg" alt="SmartLib_logo" id="logo" />
                </a>


                <div v-if="isLogin" class="collapse navbar-collapse menu-items" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
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
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <profile-header></profile-header>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script setup>
import router from '@/router/index.router';
import ProfileHeader from './ProfileHeader.vue';
import { getCookie } from '@/utils/cookie';
import SideBar from './Hook/SideBar.vue';

const isLogin = getCookie("staffId");

const goToDashboard = () => {
    router.push('/');
};

const goToBook = () => {
    router.push('/book');
};

const goToUser = () => {
    router.push('/user');
};

const goToReview = () => {
    router.push('/review')
}
</script>

<style scoped>
.header {
    background-color: black;
}

.container-fluid {
    min-height: 20px;
}


.navbar {
    padding: 10px 15px;
}

.logo-container {
    width: 70px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
}

#logo {
    width: 100%;
}

.menu-items {
    display: flex;
    align-items: center;
}


.navbar-nav {
    display: flex;
    align-items: center;
    gap: 20px;
}


.search-container {
    margin-right: 0;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
}

@media (max-width: 992px) {
    .menu-items {
        display: block;
        text-align: center;
    }

    .navbar-nav {
        flex-direction: column;
        gap: 10px;
    }

    .search-container {
        margin-bottom: 10px;
    }
}
</style>
