<script setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
    resolvedRequests: Number,
    totalRequests: Number,
    daHuy: Number
});

const chartData = {
    labels: ['Đã giải quyết', 'Đã hủy', 'Chưa giải quyết'],
    datasets: [
        {
            label: 'Số lượng',
            data: [props.resolvedRequests, props.daHuy, props.totalRequests - props.resolvedRequests - props.daHuy],
            backgroundColor: ['#82ca9d', '#FF6384', '#FFD700']
        }
    ]
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
};
</script>

<template>
    <Bar :data="chartData" :options="chartOptions" style="width: 90%; height: 200px;" />
</template>
