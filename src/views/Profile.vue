<template>
    <div class="container mt-4">
        <div class="card shadow-lg p-4">
            <div class="text-center position-relative">
                <div class="avatar-container">
                    <img :src="staffInfo.anhDaiDien" class="rounded-circle border img-thumbnail" width="150"
                        height="150" alt="Avatar">
                    <!-- <label class="edit-avatar">
                        <i class="fa-solid fa-pen"></i>
                        <input type="file" class="d-none" @change="uploadAvatar">
                    </label> -->
                </div>

            </div>
            <div class="mt-3">
                <h3 class="text-center">{{ staffInfo.hoTenDem }} {{ staffInfo.ten }}</h3>
                <p class="text-center text-muted"></p>

                <div class="row mt-3">
                    <div class="col-md-6">
                        <p><strong>Mã nhân viên:</strong> {{ staffInfo.maNhanVien }}</p>
                        <p><strong>Số điện thoại:</strong> {{ staffInfo.soDienThoai }}</p>
                        <p><strong>Vai trò:</strong> {{ staffInfo.vaiTro }}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Ngày sinh:</strong> {{ staffInfo.ngaySinh }}</p>
                        <p><strong>Địa chỉ:</strong> {{ staffInfo.diaChi }} </p>
                    </div>
                </div>

                <!-- <router-link :to="{ name: 'editprofile' }"><button class="btn btn-primary w-100 mt-3">Chỉnh sửa thông
                        tin</button></router-link> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import StafffService from '@/service/staff.service';
import { getCookie } from '@/utils/cookie';
import { onMounted, ref } from 'vue';

const staffInfo = ref({});


// Xử lý lấy thông tin sách
const getStaffInfo = async () => {
    try {
        const staffId = getCookie("staffId");
        const response = await StafffService.getStaffInfo(staffId);
        response.ngaySinh = new Date(response.ngaySinh).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        staffInfo.value = response;
    } catch {
        console.log("Lỗi khi lấy thông tin");
    }
}

onMounted(getStaffInfo)

// // Xử lý upload ảnh đại diện
// const uploadAvatar = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             infoUser.value.avatar = e.target.result;
//         };
//         reader.readAsDataURL(file);
//     }
// };


</script>

<style scoped>
.card {
    max-width: 500px;
    margin: auto;
}

.card img {
    max-height: 150px;
    max-width: 150px;
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
