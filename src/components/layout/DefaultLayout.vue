<template>
  <el-container>
    <el-aside style="width: auto !important;">
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header style="padding: 0;">
        <Header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-container>
        <el-footer>
          <Footer />
        </el-footer>
      </el-container>

    </el-container>
  </el-container>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>
