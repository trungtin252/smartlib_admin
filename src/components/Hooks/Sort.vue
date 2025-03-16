<template>
    <div class="sort" style="margin-bottom: 20px">
        <select class="form-select" aria-label="Default select example" style="width: 200px; display: inline;"
            v-model="sortValue">
            <option value="maSach">Mã sách tăng dần</option>
            <option value="tieuDe">Tên sách từ A- Z</option>
            <option value="soLuongTrongThuVien">Số lượng tăng dần</option>
        </select>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
    sortValue: String
});
const emit = defineEmits(['update:sortValue']);
const sortValue = ref(props.sortValue);

watch(sortValue, (newValue) => {
    emit('update:sortValue', newValue);
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
