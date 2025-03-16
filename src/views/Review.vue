<template>
    <!-- <h3>Danh sách yêu cầu</h3> -->
    <Filter v-model:selectedStatus="selectedStatus" />
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
                <th scope="row" class="id">{{ borrow._id }}</th>
                <td>{{ borrow.sach.maSach }}</td>
                <td>{{ borrow.sach.tieuDe }}</td>
                <td>{{ borrow.docGia.maDocGia }}</td>
                <td>{{ borrow.ngayMuon }}</td>
                <td>
                    <span v-if="borrow.trangThai == 'chap_nhan'" class="badge text-bg-success">
                        Chấp nhận
                    </span>
                    <span v-if="borrow.trangThai == 'tu_choi'" class="badge text-bg-danger">
                        Từ chối
                    </span>
                    <span v-if="borrow.trangThai == 'cho_duyet'" class="badge text-bg-warning">
                        Chờ duyệt
                    </span>
                    <span v-if="borrow.trangThai == 'da_lay'" class="badge text-bg-primary">
                        Đã lấy sách
                    </span>

                </td>
                <td>
                    <div class="form-check">
                        <button v-if="borrow.trangThai == 'cho_duyet'" type="button"
                            class="btn btn-outline-success btn-sm approve" @click="approve(borrow._id)">Chấp
                            nhận
                            <i class="fa-solid fa-check"></i>
                        </button>
                        <button v-if="borrow.trangThai == 'cho_duyet'" type="button"
                            class="btn btn-outline-danger btn-sm reject" @click="reject(borrow._id)">Từ chối
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        <button v-if="borrow.trangThai == 'chap_nhan'" type="button"
                            class="btn btn-outline-primary btn-sm taken" @click="handleTakenBook(borrow._id)">Đã lấy
                            sách
                            <!-- <i class="fa-solid fa-xmark"></i> -->
                        </button>
                        <button v-if="borrow.trangThai == 'da_lay'" type="button"
                            class="btn btn-outline-secondary btn-sm return" @click="handleReturnBook(borrow._id)">Đã trả
                            sách
                            <!-- <i class="fa-solid fa-xmark"></i> -->
                        </button>
                        <button v-if="borrow.trangThai == 'tu_choi'" type="button"
                            class="btn btn-outline-danger btn-sm delete" @click="handleReturnBook(borrow._id)">Xóa
                            yêu cầu
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
import { format } from "date-fns"; // Import date-fns
import Filter from '@/components/Hooks/Filter.vue';

const borrows = ref([]);
const selectedStatus = ref('');

const getAllBorrow = async () => {
    try {
        const response = await borrowService.getAll();
        borrows.value = response.map(borrow => ({
            ...borrow,
            ngayMuon: format(new Date(borrow.ngayMuon), "dd/MM/yyyy HH:mm")
        }));
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


const approve = async (id) => {
    const result = await showComfirm();
    if (result.isConfirmed) {
        const statusChangeInfo = {
            id: id,
            newstatus: 'chap_nhan'
        }
        await borrowService.changeStatus(statusChangeInfo);
        getAllBorrow();
    }
}

const reject = async (id) => {
    const result = await showNoteDeniBorrow();
    if (result.isConfirmed) {
        const note = result.value;
        const statusChangeInfo = {
            id: id,
            newstatus: 'tu_choi',
            note: note
        }
        await borrowService.changeStatus(statusChangeInfo);
        getAllBorrow();
    }
}

const handleTakenBook = async (id) => {
    const result = await showComfirm();
    if (result.isConfirmed) {
        const statusChangeInfo = {
            id: id,
            newstatus: 'da_lay',
            takenDay: new Date()
        }
        await borrowService.changeStatus(statusChangeInfo);
        getAllBorrow();
    }
}

const handleReturnBook = async (id) => {
    const result = await showComfirm();
    if (result.isConfirmed) {
        const statusChangeInfo = {
            id: id,
            newstatus: 'da_tra',
        }
        await borrowService.changeStatus(statusChangeInfo);
        getAllBorrow();
    }
}


onMounted(() => getAllBorrow())


</script>

<style scoped>
.btn {
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