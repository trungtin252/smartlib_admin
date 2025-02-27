<template>
    <table class="table-responsive-lg" style="margin: 40px auto;">
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
                <tr v-for="(user, index) in users" :key="user._id.$oid">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.roles }}</td>
                    <td>{{ new Date(user.birthdate.$date).toLocaleDateString() }}</td>
                    <td>{{ user.address }}</td>
                    <td>{{ user.phone }}</td>
                    <td>
                        <button type="button" class="btn btn-outline-info btn-sm">Chi tiết</button>
                        <button type="button" class="btn btn-outline-danger btn-sm"
                            @click="deleteUser(user._id.$oid)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </table>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([
    {
        "_id": { "$oid": "66c892e751e4c3a583236598" },
        "firstName": "Min",
        "lastName": "Tram",
        "roles": "admin",
        "birthdate": { "$date": "2004-10-04T00:00:00.000Z" },
        "address": "Soc Trang",
        "phone": "0123456789"
    }
]);

const deleteUser = (id) => {
    users.value = users.value.filter(user => user._id.$oid !== id);
};
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
