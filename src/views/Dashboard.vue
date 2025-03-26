<script setup>
import { ref } from 'vue';
import StorageChart from '@/components/layouts/Dashbord/storageChart.vue';
import RequestChart from '@/components/layouts/Dashbord/requestChart.vue';

const totalBooks = ref(10000);
const usedStorage = ref(750);
const totalRequests = ref(120);
const resolvedRequests = ref(90);
const daHuy = ref(10);
</script>

<template>
    <div class="dashboard-container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <!-- Storage Summary Card -->
            <div class="dashboard-card bg-gradient-to-br from-blue-50 to-white">
                <h2 class="dashboard-card-title">Tổng số chổ chứa sách:
                    <span class="text-blue-600">{{ totalBooks.toLocaleString() }}</span>
                </h2>
                <progress :value="(usedStorage / totalBooks) * 100" max="100" class="dashboard-progress"></progress>
                <p class="dashboard-card-text">
                    Đã sử dụng:
                    <span class="font-semibold">{{ usedStorage.toLocaleString() }}</span> /
                    <span class="font-semibold">{{ totalBooks.toLocaleString() }}</span>
                </p>
                <router-link :to="{ name: 'book' }"><button class="btn btn-primary w-10 mt-3">Đến
                        mục quản lý sách</button></router-link>
            </div>

            <!-- Storage Chart Card -->
            <div class="dashboard-card bg-gradient-to-br from-green-50 to-white">
                <h2 class="dashboard-card-title">Tỷ lệ kho chứa</h2>
                <div class="chart-container">
                    <StorageChart :usedStorage="usedStorage" :totalBooks="totalBooks" />
                </div>
            </div>

            <!-- Request Chart Card -->
            <div class="dashboard-card bg-gradient-to-br from-purple-50 to-white">
                <h2 class="dashboard-card-title">Yêu cầu xử lý</h2>
                <div class="chart-container">
                    <RequestChart :resolvedRequests="resolvedRequests" :totalRequests="totalRequests" :daHuy="daHuy" />
                </div>
                <router-link :to="{ name: 'review' }"><button class="btn btn-primary w-10 mt-3">Đến
                        mục giải quyết yêu cầu</button></router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Container styling */
.dashboard-container {
    min-height: 100vh;

    /* Equivalent to bg-gray-50 */
}

/* Card styling */
.dashboard-card {
    margin-top: 20px;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    /* Equivalent to border-gray-200 */
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
}

.dashboard-card:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

/* Card title */
.dashboard-card-title {
    font-size: 1.25rem;
    /* Equivalent to text-xl */
    font-weight: bold;
    margin-bottom: 16px;
    color: #374151;
    /* Equivalent to text-gray-700 */
    display: flex;
    align-items: center;
}

/* Card text */
.dashboard-card-text {
    color: #4b5563;
    /* Equivalent to text-gray-600 */
    margin-top: 12px;
}

/* Progress bar */
.dashboard-progress {
    width: 100%;
    height: 12px;
    margin-top: 8px;
    border-radius: 9999px;
    overflow: hidden;
    appearance: none;
    /* Remove default styling */
}

.dashboard-progress::-webkit-progress-bar {
    background-color: #e5e7eb;
    /* Equivalent to bg-gray-200 */
    border-radius: 9999px;
}

.dashboard-progress::-webkit-progress-value {
    background-color: #3b82f6;
    /* Equivalent to bg-blue-500 */
    border-radius: 9999px;
}

/* Chart container */
.chart-container {
    height: 200px;
    margin-top: 8px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .dashboard-card {
        padding: 16px;
    }

    .dashboard-card-title {
        font-size: 1.125rem;
        /* Equivalent to text-lg */
    }
}
</style>