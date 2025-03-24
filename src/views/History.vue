<template>
    <button @click="handleDeleteAllHistory" class="btn btn-danger" style="margin: 10px 0;">Xóa tất cả</button>
    <table class="table table-striped table-hover table-bordered ">
        <thead>
            <tr>
                <th scope="col" class="id">Mã yêu cầu</th>
                <th scope="col">Mã sách</th>
                <th scope="col">Tên sách</th>
                <th scope="col">Độc giả</th>
                <th scope="col">Thời gian yêu cầu</th>
                <th scope="col">Trạng thái</th>
                <th scope="col" class="check">Thao tác</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="borrow in filteredBorrows" :key="borrow._id">
                <th scope="row" class="id">{{ borrow.maYeuCau }}</th>
                <td>{{ borrow.sach.maSach }}</td>
                <td>{{ borrow.sach.tieuDe }}</td>
                <td>{{ borrow.docGia.maDocGia }}</td>
                <td>{{ formatDate(borrow.ngayMuon) }}</td>
                <td>
                    <span v-if="borrow.trangThai == 'hoan_thanh'" class="badge text-bg-primary">
                        Đã hoàn thành
                    </span>
                    <span v-if="borrow.trangThai == 'da_huy'" class="badge text-bg-danger">
                        Đã hủy
                    </span>

                </td>
                <td>
                    <div class="form-check">

                        <button type="button" class="btn btn-outline-danger btn-sm delete"
                            @click="handleDeleteBorrow(borrow._id)">Xóa vĩnh viễn khỏi lịch sử
                            <!-- <i class="fa-solid fa-xmark"></i> -->
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import borrowService from '@/service/borrow.service';
import { showComfirm, showNoteDeniBorrow } from '@/utils/Alert';
import { computed, onMounted, ref, watch } from 'vue';
import { formatDate } from '@/utils/fomatDate';

const borrows = ref([]);
const selectedStatus = ref('');

const getAllBorrow = async () => {
    try {
        const response = await borrowService.getAll();
        borrows.value = response.filter(borrow => (borrow.trangThai == 'hoan_thanh' || borrow.trangThai == 'da_huy'));
    } catch (error) {
        console.error('Lỗi :', error);
    }
}

const filteredBorrows = computed(() => {
    if (!selectedStatus.value) return borrows.value;
    return borrows.value.filter(borrow => borrow.trangThai === selectedStatus.value);
});


watch(filteredBorrows, (newValue) => {
    getAllBorrow();
}
)

const handleDeleteBorrow = async (id) => {
    const result = await showComfirm();
    if (result.isConfirmed) {
        await borrowService.deleteBorrow(id);
        getAllBorrow();
    }
}

const handleDeleteAllHistory = async () => {
    const result = await showComfirm();
    if (result.isConfirmed) {
        const test = filteredBorrows.value;
        test.forEach(element => {
            borrowService.deleteBorrow(element._id);
        });
    }
}


onMounted(() => getAllBorrow())


</script>

<style scoped>
.btn-outline-danger {
    --bs-btn-padding-y: .2px;
    --bs-btn-padding-x: .5rem;
    --bs-btn-font-size: .75rem;
    margin-top: 0px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    gap: 2px;
}

.form-check {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>