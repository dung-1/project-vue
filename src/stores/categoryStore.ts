import { defineStore } from 'pinia'
import { ref } from 'vue'
import { categoryService } from '../services/category.service'
import type { Category } from '../types'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])
  const loading = ref(false)

  async function fetchCategories() {
    loading.value = true
    try {
      const response = await categoryService.getAll()
      categories.value = response || [] // Đảm bảo luôn có mảng
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      categories.value = [] // Reset về mảng rỗng nếu lỗi
    } finally {
      loading.value = false
    }
  }

  async function createCategory(payload: Partial<Category>) {
    try {
      const response = await categoryService.create(payload)
      return response
    } catch (error) {
      console.error('Failed to create category:', error)
      throw error
    }
  }

  async function updateCategory(id: number, payload: Partial<Category>) {
    try {
      const response = await categoryService.update(id, payload)
      return response
    } catch (error) {
      console.error('Failed to update category:', error)
      throw error
    }
  }

  async function removeCategory(id: number) {
    try {
      await categoryService.remove(id)
    } catch (error) {
      console.error('Failed to remove category:', error)
      throw error
    }
  }

  return { 
    categories, 
    loading, 
    fetchCategories, 
    createCategory, 
    updateCategory, 
    removeCategory 
  }
})
