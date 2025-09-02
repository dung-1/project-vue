<template>
    <header class="header">
        <div class="logo">MY-APP</div>
        <nav class="nav">
            <a href="#" class="nav-link">Home</a>
            <a href="#" class="nav-link">About</a>
            <a href="#" class="nav-link">Contact</a>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #e8ecef;
    color: #000000;
    padding: 12px 24px;
}
.logo {
    font-size: 1.5rem;
    font-weight: bold;
}
.nav {
    display: flex;
    gap: 16px;
}
.nav-link {
    color: #000000;
    text-decoration: none;
    font-size: 1rem;
}
.nav-link:hover {
    text-decoration: underline;
}
</style>