<template>
    <div class="dashboard">
        <h1>Dashboard</h1>
        <div class="stats">
            <div class="stat-card" v-for="stat in stats" :key="stat.label">
                <h2>{{ stat.value }}</h2>
                <p>{{ stat.label }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dashboard',
    data() {
        return {
            stats: [
                { label: 'Người dùng', value: 120 },
                { label: 'Đơn hàng', value: 45 },
                { label: 'Doanh thu', value: '15,000,000₫' }
            ],
        }
    }
}
</script>

<style scoped>
.dashboard {
    width:900px;
}
h1{
    margin: 0;
    display: flex;
}
.stats {
    display: flex;
    gap: 16px;
    margin-bottom: 32px;
    justify-content: flex-end;
}
.stat-card {
    background: #f5f5f5;
    padding: 16px 24px;
    border-radius: 8px;
    text-align: center;
    min-width: 120px;
}

</style>