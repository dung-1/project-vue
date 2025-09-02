<template>
  <el-dialog :visible.sync="visible" title="Category">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="Tên" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Mô tả" prop="description">
        <el-input type="textarea" v-model="form.description" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">Hủy</el-button>
      <el-button type="primary" @click="submit">Lưu</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'
import type { Category } from '@/types'
const props = defineProps<{ model: Category | null }>()
const emit = defineEmits(['saved','close'])
const store = useCategoryStore()

const visible = ref(true)
const formRef = ref()
const form = ref<Category>({ name: '', description: '' } as any)

watch(()=> props.model, (v) => {
  if (v) form.value = { ...v }
  else form.value = { name: '', description: '' } as any
})

const rules = { name: [{ required: true, message: 'Nhập tên', trigger: 'blur' }] }

async function submit() {
  await formRef.value.validate()
  if (form.value.id) await store.updateCategory(form.value.id, form.value)
  else await store.createCategory(form.value)
  emit('saved')
}

function close() { visible.value = false; emit('close') }
</script>
