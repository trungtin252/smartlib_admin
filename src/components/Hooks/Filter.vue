<template>
    <div class="filter" style="margin-bottom: 20px">
        <select class="form-select" aria-label="Default select example" style="width: 200px; display: inline;"
            v-model="status">
            <option value="cho_duyet">Chờ duyệt</option>
            <option value="chap_nhan">Chấp nhận</option>
            <option value="tu_choi">Từ chối</option>
            <option value="">Tất cả</option>
        </select>
        <input v-model="search" type="text" class="form-control" placeholder="Nhập mã yêu cầu cần tìm" />
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
    selectedStatus: String,
    searchRequestId: String
});

const emit = defineEmits(['update:selectedStatus', 'update:searchRequestId']);

const status = ref(props.selectedStatus);
const search = ref(props.searchRequestId);

watch(status, (newValue) => {
    emit('update:selectedStatus', newValue);
});

watch(search, (newValue) => {
    emit('update:searchRequestId', newValue);
});
</script>

<style scoped>
.filter {
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
