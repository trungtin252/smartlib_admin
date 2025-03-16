<template>
    <div class="search-container">
        <div class="input-group">
            <select class="form-select" v-model="searchType" style="min-width: 100px;">
                <option value="title">Tên sách</option>
                <option value="author">Tác giả</option>
            </select>
            <select class="form-select" aria-label="Default select example" style="min-width: 200px; display: inline;"
                v-model="category">
                <option value="">--Tất cả danh mục--</option>
                <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.ten }}
                </option>
            </select>
            <input type="text" class="form-control" style="min-width: 200px;" v-model="searchQuery"
                :placeholder="placeholderText" />
            <button class="btn btn-primary" @click="searchBooks">Tìm kiếm <i class="fas fa-search"></i></button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const searchType = ref('title');
const category = ref('');

const placeholderText = computed(() => {
    switch (searchType.value) {
        case 'author': return 'Nhập tên tác giả...';
        case 'category': return 'Nhập danh mục sách...';
        default: return 'Nhập tên sách...';
    }
});
const emit = defineEmits(['changeTest']);

const props = defineProps({
    categories: Array
});

const searchBooks = () => {
    const search = {
        type: searchType.value,
        category: category.value,
        query: searchQuery.value
    };
    emit("changeTest", search)
};
</script>

<style scoped>
.search-container {
    max-width: 1000px;
    margin: 20px auto;
    border-radius: 8px;
}

.input-group {
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
}

.form-select,
.form-control {
    flex: 1;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    transition: all 0.3s ease-in-out;
}

.form-select:focus,
.form-control:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
}

.btn {
    padding: 10px 15px;
    border-radius: 6px;
}

.btn:hover {
    background: #0056b3;
}
</style>
