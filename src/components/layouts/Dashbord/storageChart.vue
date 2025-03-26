<script setup>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
    usedStorage: Number,
    totalBooks: Number
});

const chartData = {
    labels: ['Đã sử dụng', 'Còn trống'],
    datasets: [
        {
            data: [props.usedStorage, props.totalBooks - props.usedStorage],
            backgroundColor: ['#0088FE', '#00C49F']
        }
    ]
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
};
</script>

<template>
    <Pie :data="chartData" :options="chartOptions" style="width: 100px; height: 200px;" />
</template>
