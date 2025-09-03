<template>
    <aside class="sidebar">
        <nav>
            <ul>
                <li><router-link to="/dashboard"><i class="fa-solid fa-house"></i> Dashboard</router-link></li>
                <li><router-link to="/categories"><i class="fa-solid fa-chart-simple"></i> Category</router-link></li>
                <li><router-link to="/products"><i class="fa-solid fa-laptop"></i> Product</router-link></li>
                <li><a href="#"><i class="fa-solid fa-right-from-bracket"></i> Logout</a></li>
            </ul>
        </nav>
    </aside>
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>

<style scoped>
.sidebar {
    width: 220px;
    background: #2c3e50;
    color: #fff;
    height: 100vh;
    padding: 20px 0;
}
.sidebar nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.sidebar nav ul li {
    margin: 20px 0;
}
.sidebar nav ul li a {
    color: #fff;
    text-decoration: none;
    padding: 10px 20px;
    display: block;
    border-radius: 4px;
    transition: background 0.2s;
    text-align: justify;
}
.sidebar nav ul li a:hover {
    background: #34495e;
}
</style>