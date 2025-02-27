<template>
    <h3>Danh sách sách</h3>
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
                    <th scope="col">Giá</th>
                    <th scope="col" class="check">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(book, index) in books" :key="book._id.$oid">
                    <td>{{ index + 1 }}</td>
                    <td>{{ book.title }}</td>
                    <td>{{ book.inLibrary }}</td>
                    <td>
                        <img :src="book.image" alt="Book Image" width="50" height="50" />
                    </td>
                    <td>{{ book.category.$oid }}</td>
                    <td>{{ book.pageCount }}</td>
                    <td>{{ new Date(book.publishYear.$date).getFullYear() }}</td>
                    <td>{{ book.author.$oid }}</td>
                    <td>{{ book.price.toLocaleString() }} VND</td>
                    <td class="check">
                        <button type="button" class="btn btn-outline-info btn-sm">Chi tiết</button>
                        <button type="button" class="btn btn-outline-danger btn-sm"
                            @click="deleteBook(book._id.$oid)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const books = ref([
    {
        "_id": { "$oid": "66c8a0bdfe7fed000a3d7c6b" },
        "title": "Create GUI Applications with Python & Qt6",
        "inLibrary": 56,
        "image": "http://localhost:3000/api/upload/1725602584235.jpg",
        "category": { "$oid": "66c895f2d9518e22fa4ccb40" },
        "pageCount": 12031,
        "publishYear": { "$date": "1970-01-01T00:00:02.000Z" },
        "author": { "$oid": "66cc81b85b8e4dbc790c245f" },
        "price": 10000
    }
]);

const deleteBook = (id) => {
    books.value = books.value.filter(book => book._id.$oid !== id);
};
</script>

<style scoped>
.table-container {
    max-width: 100%;
    overflow-x: auto;
}

.btn {
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
</style>