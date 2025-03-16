<template>
    <div class="right-section">
        <div class="dropdown">
            <div class="avatar_contain" data-bs-toggle="dropdown">
                <img v-if="userAvatar" :src="userAvatar" alt="Avatar" class="profile-avatar rounded-circle"
                    @error="userAvatar = defaultAvatar" />
                <i v-else class="fa-solid fa-user"></i>
            </div>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton2">
                <li><button class="dropdown-item" @click="goToProfile">Hồ sơ</button></li>
                <li><button class="dropdown-item" @click="logout">Đăng xuất</button></li>
            </ul>
        </div>
    </div>
</template>



<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import DefaultAvatar from "@/assets/logo.svg"
import { deleteAllCookie } from "@/utils/cookie";
const router = useRouter();

// Giả sử user có dữ liệu avatar từ API hoặc local storage
const user = ref({
    avatar: ""
});

const userAvatar = computed(() => user.value.avatar || DefaultAvatar);

const goToProfile = () => {
    router.push("/profile");
};

const logout = async () => {
    const result = await Swal.fire({
        title: "Bạn có chắc chắn?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vâng, đăng xuất!",
        cancelButtonText: "Hủy"
    });

    if (result.isConfirmed) {
        deleteAllCookie();
        router.push("/login");
        setTimeout(() => window.location.reload(), 1);
    }
};
</script>


<style scoped>
.right-section {
    display: flex;
    align-items: center;
}

.profile-avatar {
    width: 40px;
    height: 40px;
    cursor: pointer;
}

.avatar_contain {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    background-color: white;
    cursor: pointer;
}

.dropdown-menu {
    min-width: 150px;
}
</style>
