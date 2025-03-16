<template>
    <table class="table table-striped table-hover table-bordered ">
        <thead>
            <tr>
                <th scope="col ">Mã người dùng</th>
                <th scope="col">Họ</th>
                <th scope="col">Tên</th>
                <th scope="col">Vai trò</th>
                <th scope="col">Ngày sinh</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Thao tác</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user, index) in Users" :key="user._id">
                <td>{{ user.maDocGia }}</td>
                <td>{{ user.hoTenDem }}</td>
                <td>{{ user.ten }}</td>
                <td><span class="badge text-bg-warning">
                        {{ user.vaiTro }}
                    </span></td>
                <td>{{ new Date(user.ngaySinh).toLocaleDateString() }}</td>
                <td>{{ user.diaChi }}</td>
                <td>{{ user.soDienThoai }}</td>
                <td>
                    <button type="button" class="btn btn-outline-info btn-sm">Chi tiết</button>
                    <button type="button" class="btn btn-outline-danger btn-sm"
                        @click="deleteUser(user._id.$oid)">Xóa</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import userService from '@/service/user.service';
import { onMounted, ref } from 'vue';

const Users = ref([]);

// const deleteUser = (id) => {
//     users.value = users.value.filter(user => user._id.$oid !== id);
// };

const getUser = async () => {
    try {
        const response = await userService.getAllUser();
        console.log(response);
        Users.value = response;
    } catch (error) {
        console.log(error);
    }
}
onMounted(getUser);
</script>

<style scoped>
.table-container {
    max-width: 100%;
    overflow-x: auto;
}

.btn {
    --bs-btn-padding-y: .2px;
    --bs-btn-padding-x: .5rem;
    --bs-btn-font-size: .75rem;
    margin-top: 0px;
    margin-right: 10px;
}
</style>
