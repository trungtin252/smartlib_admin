<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div v-if="props.book" class="form-group">
            <label for="id">Mã sách</label>
            <Field name="id" type="text" class="form-control" v-model="bookLocal.maSach" disabled />
            <ErrorMessage name="id" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="name">Tên sách</label>
            <Field name="name" type="text" class="form-control" v-model="bookLocal.tieuDe" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="desc">Mô tả</label>
            <Field name="desc" as="textarea" class="form-control" v-model="bookLocal.moTa" rows="4" />
            <ErrorMessage name="desc" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="location">Vị trí trong thư viện</label>
            <Field name="location" type="text" class="form-control" v-model="bookLocal.viTri" />
        </div>
        <div class="form-group">
            <label for="numberInLib">Số lượng trong thư viện</label>
            <Field name="numberInLib" type="number" class="form-control" v-model="bookLocal.soLuongTrongThuVien"
                :min="1" />
            <ErrorMessage name="numberInLib" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="pageCount">Số trang</label>
            <Field name="pageCount" type="number" class="form-control" v-model="bookLocal.soTrang" :min="0" />
            <ErrorMessage name="pageCount" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="publisher">Nhà xuất bản</label>
            <Field name="publisher" as="select" class="form-control" v-model="bookLocal.nhaXuatBan">
                <option value="">Chọn nhà xuất bản</option>
                <option v-for="publisher in publishers" :key="publisher._id" :value="publisher._id">
                    {{ publisher.ten }}
                </option>
            </Field>
        </div>
        <div class="form-group">
            <label for="pushlisYear">Năm xuất bản</label>
            <Field name="pushlisYear" type="text" class="form-control" v-model="bookLocal.namXuatBan" />
        </div>
        <div class="form-group">
            <label for="author">Tác giả</label>
            <Field name="author" as="select" class="form-control" v-model="bookLocal.tacGia">
                <option value="">Chọn tác giả </option>
                <option v-for="author in authors" :key="author._id" :value="author._id">
                    {{ author.ten }}
                </option>
            </Field>
            <ErrorMessage name="author" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="category">Thể loại</label>
            <Field name="category" as="select" class="form-control" v-model="bookLocal.theLoai">
                <option value="">Chọn thể loại </option>
                <option v-for="category in categories" :key="category._id" :value="category._id">
                    {{ category.ten }}
                </option>
            </Field>
        </div>
        <div class="form-group">
            <label for="price">Giá</label>
            <Field name="price" type="number" class="form-control" v-model="bookLocal.gia" :min="0" />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Hình ảnh</label>
            <input name="image" type="file" class="form-control" @change="handleFileUpload" accept="image/*" />

            <!-- Hiển thị ảnh xem trước -->
            <div v-if="previewImage" class="preview-container">
                <img :src="previewImage" alt="Xem trước hình ảnh" class="preview-image" />
            </div>


        </div>

        <div class="form-group-btn">
            <button class="btn btn-success">Lưu</button>
            <button v-if="bookLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteBook">
                Xóa
            </button>
            <button type="button" class="ml-2 btn btn-primary" @click="cancel">
                Thoát
            </button>
        </div>
    </Form>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, watch } from "vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import categoryService from "@/service/category.service";
import authorService from "@/service/author.service";
import publisherService from "@/service/publisher.service";

const bookLocal = ref('');
const authors = ref([]);
const publishers = ref([]);
const categories = ref([]);
const previewImage = ref("");
const selectedFile = ref(null);

const props = defineProps({
    book: { type: Object, required: true }
});


watch(() => props.book, (newBook) => {
    if (!!newBook && Object.keys(newBook).length > 0) {
        bookLocal.value = { ...newBook };
        previewImage.value = newBook.hinhAnh
    } else {
        bookLocal.value = {
            tieuDe: "",
            moTa: "",
            soLuongTrongThuVien: "",
            soTrang: "",
            nhaXuatBan: "",
            namXuatBan: "",
            tacGia: "",
            theLoai: "",
            gia: "",
            viTri: "",
            hinhAnh: ""
        };
        previewImage.value = "";
    }
}, { immediate: true });


const emit = defineEmits(["submit:book", "delete:book"]);
const router = useRouter();

const bookFormSchema = yup.object().shape({
    name: yup.string().required("Tên sách không được để trống"),
    numberInLib: yup
        .number()
        .typeError("Số lượng trong thư viện không được bỏ trống")
        .min(1, "Số lượng phải lớn hơn hoặc bằng 1")
        .required("Số lượng không được để trống"),
    pageCount: yup
        .number()
        .typeError("Số trang không được bỏ trống")
        .min(1, "Số trang phải lớn hơn hoặc bằng 1")
        .required("Số trang không được để trống"),
    author: yup.string().required("Tác giả không được để trống"),
    price: yup
        .number()
        .typeError("Giá phải là số")
        .min(0, "Giá không được âm")
        .required("Giá không được để trống"),
});




const submitBook = () => {
    const formData = new FormData();

    for (const key in bookLocal.value) {
        formData.append(key, bookLocal.value[key]);
    }

    if (selectedFile.value) {
        formData.append("hinhAnh", selectedFile.value);
    }

    emit("submit:book", formData);
};

const deleteBook = () => {
    emit("delete:book", bookLocal.value._id);
};

const cancel = () => {
    const reply = window.confirm('You have unsaved changes! Do you want to leave?');
    if (reply) {
        router.push({ name: "book" });
    }
};

const getCategory = async () => {
    categories.value = await categoryService.getAll();
}

const getAuthor = async () => {
    authors.value = await authorService.getAll();

}

const getPublisher = async () => {
    publishers.value = await publisherService.getAll();
}

const getInfo = () => {
    getAuthor();
    getCategory();
    getPublisher();
}

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;

        // Hiển thị ảnh xem trước
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

onMounted(() => getInfo())
</script>
<style scoped>
label {
    display: block;
    margin-top: 10px;
}

.card-container.card {
    max-width: 400px !important;
    padding: 40px 40px;
}

.card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}

.error-feedback {
    color: red;
    font-size: 14px;
    margin-top: 5px;
    display: block;
}


.preview-container {
    margin-top: 10px;
    width: 150px;
    height: 150px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

label {
    font-weight: bold;
}

.form-group-btn {
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    gap: 10px;
}
</style>