<template>
    <div class="container mt-4">
        <div class="card shadow-lg p-4">
            <div class="text-center position-relative">
                <div class="avatar-container">
                    <img :src="infoUser.avatar" class="rounded-circle border img-thumbnail" width="150" height="150"
                        alt="Avatar">
                    <label class="edit-avatar">
                        <i class="fa-solid fa-pen"></i>
                        <input type="file" class="d-none" @change="uploadAvatar">
                    </label>
                </div>

            </div>
            <div class="mt-3">
                <h3 class="text-center">{{ infoUser.name }}</h3>
                <p class="text-center text-muted">@{{ infoUser.userName }}</p>

                <div class="row mt-3">
                    <div class="col-md-6">
                        <p><strong>Email:</strong> {{ infoUser.email }}</p>
                        <p><strong>Số điện thoại:</strong> {{ infoUser.phone }}</p>
                        <p><strong>Giới tính:</strong> {{ infoUser.gender }}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Ngày sinh:</strong> {{ infoUser.birthday }}</p>
                        <p><strong>Địa chỉ:</strong> {{ infoUser.address }}</p>
                        <p><strong>Mô tả:</strong> {{ infoUser.bio }}</p>
                    </div>
                </div>

                <!-- <router-link :to="{ name: 'editprofile' }"><button class="btn btn-primary w-100 mt-3">Chỉnh sửa thông
                        tin</button></router-link> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const infoUser = ref({
    name: "Trần Minh Quang",
    userName: "tranminhquang123",
    email: "quangtran@example.com",
    phone: "0123-456-789",
    gender: "Nam",
    birthday: "1995-08-15",
    address: "123 Đường ABC, TP. HCM",
    bio: "Lập trình viên đam mê công nghệ.",
    avatar: "https://i.pravatar.cc/150?img=3" // Ảnh đại diện mặc định
});

// Xử lý upload ảnh đại diện
const uploadAvatar = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            infoUser.value.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};
</script>

<style scoped>
.card {
    max-width: 500px;
    margin: auto;
}

/* Vị trí icon chỉnh sửa */
.edit-avatar {
    position: absolute;
    bottom: 11px;
    right: 179px;
    color: white;
    border-radius: 50%;
    border: #7c7d7e solid 2px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

/* Hiệu ứng hover */
.edit-avatar:hover {
    background: #0056b3;
}
</style>
