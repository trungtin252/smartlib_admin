<template>
    <BookList v-if="route.path === '/book'"></BookList>
    <RouterView></RouterView>
    <BookEdit v-if="route.path === '/book/edit'"></BookEdit>

</template>

<script setup>
import { useRoute } from 'vue-router';
import BookEdit from '@/components/layouts/BookEdit.vue';
import BookList from '@/components/layouts/BookList.vue';

const route = useRoute();


</script>