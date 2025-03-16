<template>
    <nav aria-label="Page navigation">
        <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
                    &laquo;
                </button>
            </li>

            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                <button class="page-link" @click="changePage(page)">{{ page }}</button>
            </li>

            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
                    &raquo;
                </button>
            </li>
        </ul>
    </nav>
</template>

<script setup>


const props = defineProps({
    totalPages: Number,
    currentPage: Number,
});


const emit = defineEmits(['changePage']);

const changePage = (page) => {
    if (page >= 1 && page <= props.totalPages) {
        emit('changePage', page);
    }
};
</script>

<style scoped>
.pagination {
    display: flex;
    list-style: none;
    gap: 5px;
    justify-content: center;
    padding: 10px;
}

.page-item button {
    border: 1px solid #ddd;
    padding: 5px 10px;
    cursor: pointer;
    background-color: white;
}

.page-item.active button {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
}

.page-item.disabled button {
    opacity: 0.5;
    pointer-events: none;
}
</style>
