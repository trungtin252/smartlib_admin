<template>
    <table class="table table-striped table-hover table-bordered ">
        <thead>
            <tr>
                <th scope="col-1" style="width: 12%;">Mã người dùng</th>
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
                <td style="width: 12%;">{{ user.maDocGia }}</td>
                <td style="width: 15%;">{{ user.hoTenDem }}</td>
                <td style="width: 10%;">{{ user.ten }}</td>
                <td style="width: 8%;"><span class=" badge text-bg-warning">
                        {{ user.vaiTro }}
                    </span></td>
                <td style="width: 10%;">{{ new Date(user.ngaySinh).toLocaleDateString() }}</td>
                <td style="width: 23%;">{{ user.diaChi }}</td>
                <td>{{ user.soDienThoai }}</td>
                <td>
                    <button type="button" class="btn btn-outline-info btn-sm">Chi tiết</button>
                    <button type="button" class="btn btn-outline-danger btn-sm"
                        @click="deleteUser(user._id.$oid)">Xóa</button>
                </td>
            </tr>
        </tbody>
    </table>

    <table class="table table-striped table-hover table-bordered " v-if="currenUserRole === 'admin'">
        <thead>
            <tr>
                <th scope="col ">Mã nhân viên</th>
                <th scope="col">Họ</th>
                <th scope=" col">Tên</th>
                <th scope="col">Vai trò</th>
                <th scope="col">Ngày sinh</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Thao tác</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(staff, index) in Staffs" :key="staff._id">
                <td style="width: 12%;">{{ staff.maNhanVien }}</td>
                <td style="width: 15%;">{{ staff.ten }}</td>
                <td style="width: 10%;">{{ staff.hoTenDem }}</td>
                <td style=" width: 8%;"><span class="badge text-bg-warning">
                        {{ staff.vaiTro }}
                    </span></td>
                <td style="width: 10%;">{{ new Date(staff.ngaySinh).toLocaleDateString() }}</td>
                <td style="width: 23%;">{{ staff.diaChi }}</td>
                <td>{{ staff.soDienThoai }}</td>
                <td>
                    <button type=" button" class="btn btn-outline-info btn-sm" v-if="staff.vaiTro !== 'admin'">Chi
                        tiết</button>
                    <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteUser(user._id.$oid)"
                        v-if="staff.vaiTro !== 'admin'">Xóa</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import staffService from '@/service/staff.service';
import userService from '@/service/user.service';
import { getCookie } from '@/utils/cookie';
import { onMounted, ref } from 'vue';

const Users = ref([]);
const Staffs = ref([]);
const currenUserRole = ref('staff');

// const deleteUser = (id) => {
//     users.value = users.value.filter(user => user._id.$oid !== id);
// };

const getUser = async () => {
    try {
        const response = await userService.getAllUser();
        Users.value = response;
    } catch (error) {
        console.log(error);
    }
}

const getStaff = async () => {
    try {
        const response = await staffService.getAllStaff();
        response.forEach(element => {
            if (element._id === getCookie("staffId")) {
                if (element.vaiTro === "admin") {
                    currenUserRole.value = "admin";
                }
            }
        });
        Staffs.value = response;
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => { getStaff(), getUser() });
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
