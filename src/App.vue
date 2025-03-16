<script setup>
import Header from "./components/layouts/Header.vue"
import Footer from "./components/layouts/Footer.vue";

</script>

<template>
  <Header></Header>
  <div class="container-fluid">
    <RouterView />
  </div>
  <Footer></Footer>
</template>
