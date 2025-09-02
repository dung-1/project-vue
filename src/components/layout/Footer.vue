<template>
    <footer class="footer">
        <div class="footer-content">
            <span>&copy; {{ new Date().getFullYear() }} DUNGCTS. All rights reserved.</span>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
};
</script>

<style scoped>
.footer {
    color: #080808;
    padding: 20px 0;
    text-align: center;
    box-shadow: 0 -2px 8px rgba(0,0,0,0.05);
    font-family: 'Segoe UI', Arial, sans-serif;
}

.footer-content {
    max-width: 900px;
    margin: 0 auto;
    font-size: 1rem;
    letter-spacing: 0.5px;
}
</style>