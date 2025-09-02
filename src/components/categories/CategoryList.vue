<template>
  <div>
    <el-button type="primary" @click="openCreate">Thêm category</el-button>
    <el-table :data="categories">
      <el-table-column prop="id" label="ID" width="70" />
      <el-table-column prop="name" label="Tên" />
      <el-table-column prop="description" label="Mô tả" />
      <el-table-column label="Actions" width="180">
        <template #default="{ row }">
          <el-button size="small" @click="edit(row)">Sửa</el-button>
          <el-button size="small" type="danger" @click="del(row)">Xóa</el-button>
        </template>
      </el-table-column>
    </el-table>

    <CategoryForm v-if="showForm" :model="editing" @saved="onSaved" @close="showForm=false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'
import CategoryForm from './CategoryForm.vue'
const store = useCategoryStore()
const showForm = ref(false)
const editing = ref(null)

onMounted(()=> store.fetchCategories())

function openCreate() { editing.value = null; showForm.value = true }
function edit(row:any) { editing.value = row; showForm.value = true }
async function del(row:any) {
  await store.removeCategory(row.id)
}
function onSaved() { showForm.value = false; store.fetchCategories() }
</script>
