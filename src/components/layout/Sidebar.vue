<template>
    <aside class="sidebar">
        <nav>
            <ul>
                <li><router-link to="/dashboard">Trang chủ</router-link></li>
                <li><router-link to="/categories">Quản lý loại sản phẩm</router-link></li>
                <li><router-link to="/products">Quản lý sản phẩm</router-link></li>
                <li><a href="#">Đăng xuất</a></li>
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