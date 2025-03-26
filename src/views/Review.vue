<template>
    <!-- <h3>Danh sách yêu cầu</h3> -->
    <Filter v-model:selectedStatus="selectedStatus" v-model:searchRequestId="searchRequestId" />
    <button type="button" class="btn btn-primary" @click="openScanner" style="margin-bottom: 20px;">Quét QR</button>
    <table class=" table table-striped table-hover table-bordered ">
        <thead>
            <tr>
                <th scope=" col" class="id">Mã yêu cầu</th>
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
                            class="btn btn-outline-primary btn-sm taken"
                            @click="handleTakenBookManual(borrow._id, borrow.maYeuCau, borrow.sach.maSach, borrow.sach.tieuDe, borrow.sach.viTri, borrow.maBiMat)">Đã
                            lấy
                            sách
                            <!-- <i class="fa-solid fa-xmark"></i> -->
                        </button>
                        <button v-if="borrow.trangThai == 'da_lay'" type="button"
                            class="btn btn-outline-secondary btn-sm return" @click="handleReturnBook(borrow._id)">Đã trả
                            sách
                            <!-- <i class="fa-solid fa-xmark"></i> -->
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <QRScan ref="qrScanner" @qr-scanned="handleQrResult" />
</template>

<script setup>
import borrowService from '@/service/borrow.service';
import { showComfirm, showConfimGetBookAuto, showConfimGetBookManual, showError, showNoteDeniBorrow, showSuccess } from '@/utils/Alert';
import { computed, onMounted, ref, watch } from 'vue';
import Filter from '@/components/Hooks/Filter.vue';
import { formatDate } from '@/utils/fomatDate';
import QRScan from '@/components/Hooks/QRScan.vue';

const borrows = ref([]);
const selectedStatus = ref('');
const qrScanner = ref(null);
const searchRequestId = ref("");

const openScanner = () => {
    qrScanner.value.startCamera();
};

// Xử lý quét QR
const handleQrResult = async (result) => {
    try {
        const qrData = JSON.parse(result);
        const borrowId = qrData.borrowId;
        const secretCode = qrData.secretCode;

        for (const borrow of borrows.value) {
            if (borrowId && borrowId === borrow._id && borrow.trangThai === 'chap_nhan' && borrow.maBiMat === secretCode) {
                await handleTakenBookAuto(borrow._id, borrow.maYeuCau, borrow.sach.maSach, borrow.sach.tieuDe, borrow.sach.viTri, borrow.maBiMat);
                return;
            }
        }

        showError("Quét thất bại", "Không tìm thấy yêu cầu hoặc đã lấy sách trước đó, vui lòng kiểm tra lại");
    } catch (error) {
        showError("Lỗi đọc mã QR", "Mã QR không hợp lệ hoặc đã bị thay đổi.");
        console.error("Lỗi khi parse JSON:", error);
    }
};


// Get borrow
const getAllBorrow = async () => {
    try {
        const response = await borrowService.getAll();
        borrows.value = response.filter(borrow => (borrow.trangThai !== 'hoan_thanh' && borrow.trangThai !== 'da_huy'));
    } catch (error) {
        console.error('Lỗi :', error);
    }
}

// Lọc
const filteredBorrows = computed(() => {
    return borrows.value.filter(borrow => {
        const matchStatus = !selectedStatus.value || borrow.trangThai === selectedStatus.value;
        const matchSearch = !searchRequestId.value || borrow.maYeuCau.toLowerCase().includes(searchRequestId.value.toLowerCase());
        return matchStatus && matchSearch;
    });
});


watch(filteredBorrows, (newBorrow) => {
    getAllBorrow();
});

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

const handleTakenBookManual = async (id, maYeuCau, maSach, tieuDe, viTri, maBiMat) => {
    const result = await showConfimGetBookManual(maYeuCau, maSach, tieuDe, viTri);
    if (result.value == maBiMat) {
        const statusChangeInfo = {
            id: id,
            newstatus: 'da_lay',
            takenDay: new Date()
        }
        await borrowService.changeStatus(statusChangeInfo);
        showSuccess("Lấy sách thành công", "Đã lấy sách thành công !");
        getAllBorrow();
    } else {
        showError("Lấy sách thất bại", " Sai mã bí mật lấy sách vui lòng kiểm tra lại");
    }
}

const handleTakenBookAuto = async (id, maYeuCau, maSach, tieuDe, viTri) => {
    const result = await showConfimGetBookAuto(maYeuCau, maSach, tieuDe, viTri);
    if (result.isConfirmed) {
        const statusChangeInfo = {
            id: id,
            newstatus: 'da_lay',
            takenDay: new Date()
        }
        await borrowService.changeStatus(statusChangeInfo);
        showSuccess("Lấy sách thành công", "Đã lấy sách thành công !");
        getAllBorrow();
    } else {
        showError("Lấy sách thất bại", " Sai mã bí mật lấy sách vui lòng kiểm tra lại");
    }
}


const handleReturnBook = async (id) => {
    const result = await showComfirm();
    if (result.isConfirmed) {

        const statusChangeInfo = {
            id: id,
            newstatus: 'hoan_thanh',
        }
        await borrowService.changeStatus(statusChangeInfo);
        getAllBorrow();
    }
}


onMounted(() => getAllBorrow())


</script>

<style scoped>
.btn-outline-danger,
.btn-outline-primary,
.btn-outline-secondary,
.btn-outline-success {
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