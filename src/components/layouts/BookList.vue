<template>
    <h3>Danh sách sách</h3>
    <div class="search_container">
        <SearchBook @changeTest="changeTest" :categories="categories"></SearchBook>
        <Sort v-model:sortValue="sortValue"></Sort>
    </div>

    <div class="table-container">
        <table class="table table-responsive-lg table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col">Mã sách</th>
                    <th scope="col">Tên sách</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Danh mục</th>
                    <th scope="col">Số trang</th>
                    <th scope="col">Năm xuất bản</th>
                    <th scope="col">Tác giả</th>
                    <th scope="col">Giá (VND) </th>
                    <th scope="col" class="check">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(book, index) in books" :key="book._id">
                    <td><b>{{ book.maSach }}</b></td>
                    <td><b>{{ book.tieuDe }}</b></td>
                    <td>{{ book.soLuongTrongThuVien }}</td>
                    <td>
                        <img :src="book.hinhAnh" alt="Book Image" width="50" height="50" />
                    </td>
                    <td></td>
                    <td>{{ book.soTrang }}</td>
                    <td>{{ book.namXuatBan }}</td>
                    <td>{{ book.tacGia.ten }}</td>
                    <td> {{ book.gia }}</td>
                    <td class="check">
                        <router-link :to="{ name: 'book.edit', params: { id: book._id } }"
                            class="btn btn-outline-info btn-sm">
                            Chi tiết
                        </router-link>
                        <button type="button" class="btn btn-outline-danger btn-sm"
                            @click="deleteBook(book._id)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <router-link :to="{
            name: 'book.add'
        }">
            <button type="button" class="btn btn-info">Thêm sách + </button>
        </router-link>
        <Pagination :totalPages="totalPages" :currentPage="currentPage" @changePage="changePage" />
    </div>
</template>

<script setup>
import Pagination from '@/components/Hooks/Pagination.vue';
import SearchBook from '@/components/Hooks/SearchBook.vue';
import Sort from '@/components/Hooks/Sort.vue';
import bookService from '@/service/book.service';
import categoryService from '@/service/category.service';
import { showComfirm, showErrorDeleteBook, showSuccessDelete } from '@/utils/Alert';
import { computed, onMounted, ref, watch } from 'vue';

const books = ref([]);
const categories = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const searchValue = ref({});
const sortValue = ref('maSach');

// Lay sach
const getAllBooks = async (page, query) => {
    try {
        const response = await bookService.getAll(page, 6, query, sortValue.value);
        totalPages.value = response.totalPages;
        books.value = response.books;
    } catch (error) {
        console.error('Lỗi khi lấy sách:', error);
        return [];
    }
};

const filteredBook = computed(() => {
    console.log(sortValue.value);
});


watch(sortValue, (newValue) => {
    refesh();
}
)

// Lay danh muc
const getAllCategory = async () => {
    try {
        const response = await categoryService.getAll();
        categories.value = response;
    } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error);
        return [];
    }
}

const changePage = async (page) => {
    currentPage.value = page;
    await getAllBooks(page, {})
};

const changeTest = (check) => {
    let test = {}
    if (check.type == 'title') {
        test = {
            title: check.query,
            category: check.category
        }
    } else {
        test = {
            author: check.query,
            category: check.category
        }
    }
    searchValue.value = test;
    getAllBooks(1, searchValue.value)
}

const deleteBook = async (id) => {
    try {
        const result = await showComfirm();
        if (result.isConfirmed) {
            const check = await bookService.deleteBook(id);
        }
        showSuccessDelete();
        refesh();
    } catch (error) {
        showErrorDeleteBook();
    }

};

const refesh = async () => {
    getAllBooks(1, searchValue.value);
    getAllCategory();
}
onMounted(() => refesh());

</script>

<style scoped>
.table-container {
    max-width: 100%;
    overflow-x: auto;
}

.btn-outline-info,
.btn-outline-danger {
    --bs-btn-padding-y: .2px;
    --bs-btn-padding-x: .5rem;
    --bs-btn-font-size: .75rem;
    margin-top: 0px;
    margin-right: 10px;
}

img {
    border-radius: 5px;
    object-fit: cover;
}

.check {
    width: 150px;
}

.search_container {
    width: 70%;
}
</style>