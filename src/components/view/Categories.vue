<template>
    <div class="categories-page">
        <div class="header">
            <h1>Category Management</h1>
            <button class="add-button" @click="showModal = true"> <i class="fa-solid fa-plus"></i>Add Category</button>
        </div>

        <!-- Modal Add Category -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal">
                <h2>Add New Category</h2>
                <form @submit.prevent="onCreate">
                    <div class="form-group">
                        <label>Category Name:</label>
                        <input 
                            v-model="newCategory.categoryName" 
                            placeholder="Enter category name" 
                            required 
                        />
                    </div>
                    <div class="form-group">
                        <label>Description:</label>
                        <textarea 
                            v-model="newCategory.description" 
                            placeholder="Enter description"
                            rows="3"
                        ></textarea>
                    </div>
                    <div class="modal-buttons">
                        <button type="submit" :disabled="loading">Save</button>
                        <button type="button" @click="closeModal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>

        <table class="category-table">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th style="width: 250px;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cat in categories" :key="cat.id">
                    <td>{{ categories.indexOf(cat) + 1 }}</td>
                    <td v-if="editId !== cat.id">{{ cat.categoryName }}</td>
                    <td v-else>
                        <input v-model="editCategory.categoryName" required />
                    </td>
                    <td v-if="editId !== cat.id">{{ cat.description }}</td>
                    <td v-else>
                        <input v-model="editCategory.description" required />
                    </td>
                    <td style="display: flex;">
                        <button v-if="editId !== cat.id" @click="onEdit(cat)" class="bg-warning text-light"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                        <button v-if="editId === cat.id" @click="onUpdate(cat.id)" class="bg-success text-light"><i class="fa-solid fa-check"></i> Save</button>
                        <button v-if="editId === cat.id" @click="cancelEdit" class="text-light bg-secondary"><i class="fa-solid fa-circle-notch"></i> Cancel</button>
                        <button @click="onDelete(cat.id)" :disabled="loading" class="bg-danger text-light"><i class="fa-solid fa-xmark"></i> Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="loading" class="loading">Loading...</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '../../stores/categoryStore'
import type { Category } from '../../types'
import { debounce } from 'lodash'
import { notifySuccess, notifyError, confirmAction } from '../../untils/notifications'

const route = useRoute()
const store = useCategoryStore()
const { categories, loading, fetchCategories, createCategory, updateCategory, removeCategory } = store

const showModal = ref(false)
const newCategory = ref<Partial<Category>>({ 
    categoryName: '', 
    description: '' 
})
const editId = ref<number | null>(null)
const editCategory = ref<Partial<Category>>({ categoryName: '', description: '' })

// Theo dõi route changes
const debouncedFetch = debounce(() => {
    fetchCategories()
}, 300)

watch(
  () => route.path,
  () => {
    debouncedFetch()
  }
)

// Khởi tạo dữ liệu
onMounted(async () => {
    await fetchCategories()
})

const onCreate = async () => {
    if (!newCategory.value.categoryName?.trim()) return
    try {
        await createCategory(newCategory.value)
        await fetchCategories()
        showModal.value = false
        newCategory.value = { categoryName: '', description: '' }
        notifySuccess('Created successfully')
    } catch (error) {
        notifyError('Failed to create category!')
    }
}

const onEdit = (cat: Category) => {  
    editId.value = cat.id
    editCategory.value = {
        categoryName: cat.categoryName,
        description: cat.description
    }
}

const onUpdate = async (id: number) => {
    if (!editCategory.value.categoryName?.trim()) return
    try {
        await updateCategory(id, editCategory.value)
        await fetchCategories()
        editId.value = null
        notifySuccess('Updated successfully')
    } catch (error) {
        notifyError('Failed to update category!')
    }
}

const cancelEdit = () => {
    editId.value = null
}

const onDelete = async (id: number) => {
    const ok = await confirmAction('Delete this category?', 'This action cannot be undone')
    if (!ok) return
    try {
        await removeCategory(id)
        await fetchCategories()
        notifySuccess('Deleted successfully')
    } catch (error) {
        notifyError('Failed to delete category!')
    }
}

const closeModal = () => {
    showModal.value = false
    newCategory.value = { categoryName: '', description: '' }
}
</script>

<style scoped>
.categories-page {
    width: 100%;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px #0001;
    max-height: 350px;
}

h1 {
    margin: 0;
    display: flex;
    padding-bottom: 20px;
    font-size: 24px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.add-button {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.add-button:hover {
    background: #45a049;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background: white;
    padding: 24px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 20px;
}

.modal-buttons button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.modal-buttons button[type="submit"] {
    background: #4CAF50;
    color: white;
}

.modal-buttons button[type="button"] {
    background: #f44336;
    color: white;
}

.modal-buttons button:hover {
    opacity: 0.9;
}

.modal-buttons button:disabled {
    background: #cccccc;
    cursor: not-allowed;
}

.category-table {
    width: 100%;
    border-collapse: collapse;
}

.category-table th,
.category-table td {
    border: 1px solid #eee;
    padding: 8px;
    text-align: left;
}

.loading {
    margin-top: 16px;
    color: #888;
}

button {
    margin-right: 4px;
}
</style>