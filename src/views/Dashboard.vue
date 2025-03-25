<script setup>
import { ref } from 'vue';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const totalBooks = ref(1000);
const usedStorage = ref(750);
const totalRequests = ref(120);
const resolvedRequests = ref(90);

const storageData = ref([
    { name: 'Đã sử dụng', value: usedStorage.value },
    { name: 'Còn trống', value: totalBooks.value - usedStorage.value }
]);

const requestData = ref([
    { name: 'Đã giải quyết', value: resolvedRequests.value },
    { name: 'Chưa giải quyết', value: totalRequests.value - resolvedRequests.value }
]);

const COLORS = ['#0088FE', '#00C49F'];
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div class="border rounded-lg p-4 shadow">
            <h2 class="text-xl font-bold">Tổng số sách: {{ totalBooks }}</h2>
            <progress :value="(usedStorage / totalBooks) * 100" max="100" class="w-full mt-2"></progress>
            <p class="text-gray-600">Đã sử dụng: {{ usedStorage }} / {{ totalBooks }}</p>
        </div>

        <div class="border rounded-lg p-4 shadow">
            <h2 class="text-xl font-bold">Tỷ lệ kho chứa</h2>
            <PieChart width="300" height="200">
                <Pie :data="storageData" cx="50%" cy="50%" outerRadius="60" fill="#8884d8" dataKey="value">
                    <Cell v-for="(entry, index) in storageData" :key="index" :fill="COLORS[index % COLORS.length]" />
                </Pie>
                <Tooltip />
            </PieChart>
        </div>

        <div class="border rounded-lg p-4 shadow">
            <h2 class="text-xl font-bold">Yêu cầu xử lý</h2>
            <BarChart width="300" height="200" :data="requestData">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Legend></Legend>
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
        </div>
    </div>
</template>
