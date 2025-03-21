<template>
    <div v-if="props.id" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <BookForm :book="book" @submit:book="updateBook" @delete:book="deleteBook" />
        <!-- <p>{{ message }}</p> -->
    </div>
    <div v-else class="page">
        <h4>Thêm mới liên hệ</h4>
        <BookForm @submit:book="createBook" />
        <!-- <p>{{ message }}</p> -->
    </div>
</template>

<script setup>
import bookService from '@/service/book.service';
import BookForm from '../Hooks/BookForm.vue';

import { ref, onMounted, defineProps } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showComfirm, showErrorDeleteBook, showSuccessDelete, showSuccessUpdateBook } from '@/utils/Alert';

const props = defineProps({
    id: { type: String, required: true },
});


const router = useRouter();
const route = useRoute();

const book = ref(null);
// const message = ref("");

const getBook = async (id) => {
    try {
        if (id) {
            book.value = await bookService.getBookById(id);
        }
    } catch (error) {
        console.log(error);
        router.push({
            name: "notfound",
            params: { pathMatch: route.path.split("/").slice(1) },
            query: route.query,
            hash: route.hash,
        });
    }
};

const createBook = async (data) => {
    try {
        await bookService.createBook(data);
        alert("Liên hệ thêm thành công");
        router.push({ name: "contactbook" });
    } catch (error) {
        console.log(error);
    }
};

const updateBook = async (data) => {
    try {
        await bookService.update(book.value._id, data);
        showSuccessUpdateBook();
        router.push({ name: "book" });
    } catch (error) {
        console.log(error);
    }
};

const deleteBook = async (id) => {
    try {
        const result = await showComfirm();
        if (result.isConfirmed) {
            const check = await bookService.deleteBook(id);
        }
        showSuccessDelete();
        router.push({ name: "book" });
    } catch (error) {
        showErrorDeleteBook();
    }

};

onMounted(() => {
    getBook(props.id);
});
</script>