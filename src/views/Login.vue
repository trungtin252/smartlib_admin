<template>
    <section class="vh-100">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow-2-strong" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">

                            <h3 class="mb-5">Đăng nhập vào hệ thống</h3>

                            <div data-mdb-input-init class="form-outline mb-4"
                                style="display: flex; flex-direction: column; align-items:start;">
                                <label class="form-label" for="typeEmailX-2">Mã nhân viên</label>
                                <input type="email" id="typeEmailX-2" class="form-control form-control-lg"
                                    v-model="staffId" />

                            </div>

                            <div data-mdb-input-init class="form-outline mb-4"
                                style="display: flex; flex-direction: column; align-items:start;">
                                <label class="form-label" for="typePasswordX-2">Mật khẩu</label>
                                <input type="password" id="typePasswordX-2" class="form-control form-control-lg"
                                    v-model="password" />

                            </div>


                            <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg btn-block"
                                type="submit" @click="login()">Đăng nhập</button>

                            <hr class="my-4">

                            <!-- <button data-mdb-button-init data-mdb-ripple-init class="btn btn-lg btn-block btn-primary"
                                style="background-color: #dd4b39;" type="submit"><i class="fab fa-google me-2"></i> Sign
                                in with google</button>
                            <button data-mdb-button-init data-mdb-ripple-init
                                class="btn btn-lg btn-block btn-primary mb-2" style="background-color: #3b5998;"
                                type="submit"><i class="fab fa-facebook-f me-2"></i>Sign in with facebook</button> -->

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import router from '@/router/index.router';
import loginService from '@/service/login.service';
import { showErrorLogin, showSuccessLogin } from '@/utils/Alert';
import { setCookie } from '@/utils/cookie';
import { generateToken } from '@/utils/generateToken';
import { computed, ref } from 'vue';

const staffId = ref('');
const password = ref('');
const isAuthenticated = ref(false);;

// Computed properties for validation
const isFormValid = computed(() => {
    return staffId.value && staffId.value.length >= 1
});

const login = async () => {

    if (!isFormValid.value) {
        return;
    }

    const infoLogin = {
        staffID: staffId.value,
        password: password.value
    };

    try {
        const loginResult = await loginService.Login(infoLogin);
        console.log(loginResult);
        if (loginResult) {
            setisAuthenticated(loginResult._id);
        } else {
            showErrorLogin();
        }
    } catch (error) {
        showErrorLogin();
    }
};


const setisAuthenticated = (userId) => {
    setCookie("staffId", userId, 1);
    router.push("/profile");
    showSuccessLogin();

    setTimeout(() => window.location.reload(), 1000);
};

</script>

<style scoped></style>