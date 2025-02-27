<template>
    <h3>Danh sách yêu cầu</h3>
    <table class="table-responsive-lg" style="margin: 40px auto;">
        <table class="table table-striped table-hover table-bordered ">
            <thead>
                <tr>
                    <th scope="col" class="id">Mã yêu cầu</th>
                    <th scope="col">Mã sách</th>
                    <th scope="col">Tên sách</th>
                    <th scope="col">Thời gian yêu cầu</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Xem chi tiết yêu c</th>
                    <th scope="col" class="check">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row" class="id">lor</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td><span class="badge text-bg-success">Đã duyệt</span></td>
                    <td><button type="button" class="btn btn-outline-info btn-sm">Xem chi tiết</button></td>
                    <td>
                        <div class="form-check">
                            <button type="button" class="btn btn-outline-success btn-sm approve" @click="approve">Chấp
                                nhận
                                <i class="fa-solid fa-check"></i>
                            </button>
                            <button type="button" class="btn btn-outline-danger btn-sm reject" @click="reject">Từ chối
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </table>
</template>

<script setup>
import { showComfirm } from '@/utils/Alert';

const approve = async () => {
    const result = await showComfirm();
    if (result.isConfirmed) {
        console.log("Approve");
    }
}

const reject = async () => {
    const result = await showComfirm();
    if (result.isConfirmed) {
        console.log("Reject");
    }
}



</script>

<style scoped>
.btn {
    --bs-btn-padding-y: .2px;
    --bs-btn-padding-x: .5rem;
    --bs-btn-font-size: .75rem;
    margin-top: 0px;
    margin-right: 10px
}
</style>