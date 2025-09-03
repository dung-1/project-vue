<template>
    <div class="products-page">
        <div class="header">
            <h1>Product Management</h1>
            <button class="add-button" @click="showModal = true">
                <i class="fa-solid fa-plus"></i> Add Product
            </button>
        </div>

        <!-- Modal Add Product -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal">
                <h2>Add New Product</h2>
                <form @submit.prevent="onCreate">
                    <div class="form-group">
                        <label>Name:</label>
                        <input v-model="newProduct.productName" placeholder="Enter product name" required />
                    </div>
                    <div class="form-group">
                        <label>stockQuantity:</label>
                        <el-input-number v-model="newProduct.stockQuantity" placeholder="Enter stockQuantity" rows="3"
                            style="width: -webkit-fill-available;"></el-input-number>
                    </div>
                    <div class="form-group">
                        <label>Price:</label>
                        <input v-model.number="newProduct.price" type="number" min="0" required />
                    </div>
                    <div class="form-group">
                        <label>Category:</label>
                        <select v-model="newProduct.category_Id" required>
                            <option value="" disabled>Select category</option>
                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.categoryName }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Status:</label>
                        <select v-model="newProduct.isActive" required>
                            <option :value="true">Active</option>
                            <option :value="false">Inactive</option>
                        </select>
                    </div>
                    <div class="modal-buttons">
                        <button type="submit" :disabled="loading">Save</button>
                        <button type="button" @click="closeModal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>

        <table class="product-table">
            <thead>
                <tr>
                    <th>Order</th>
                    <th>Name</th>
                    <th>stockQuantity</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Active</th>
                    <th style="display: flex;justify-content: center;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(prod, index) in [...products].sort((a, b) => (a.id < b.id ? 1 : -1))" :key =" prod.id">
                    <td>{{ index + 1 }}</td>
                    <td v-if="editId !== prod.id">{{ prod.productName }}</td>
                    <td v-else>
                        <input v-model="editProduct.productName" required />
                    </td>
                    <td v-if="editId !== prod.id">{{ prod.stockQuantity }}</td>
                    <td v-else>
                        <input v-model="editProduct.stockQuantity" />
                    </td>
                    <td v-if="editId !== prod.id">{{ prod.price }}</td>
                    <td v-else>
                        <input v-model.number="editProduct.price" type="number" min="0" required />
                    </td>
                    <td v-if="editId !== prod.id">
                        {{ categoryName(prod.category_Id) }}
                    </td>
                    <td v-else>
                        <select v-model="editProduct.category_Id" required>
                            <option value="" disabled>Select category</option>
                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.categoryName }}
                            </option>
                        </select>
                    </td>
                    <td v-if="editId !== prod.id">
                        {{ prod.isActive ? 'Active' : 'Inactive' }}
                    </td>
                    <td v-else>
                        <select v-model="editProduct.isActive" required>
                            <option :value="true">Active</option>
                            <option :value="false">Inactive</option>
                        </select>
                    </td>
                    <td style="display: flex;justify-content: center;">
                        <button v-if="editId !== prod.id" @click="onEdit(prod)" class="bg-warning text-light"><i
                                class="fa-solid fa-pen-to-square"></i> Edit</button>
                        <button v-if="editId === prod.id" @click="onUpdate(prod.id)" class="bg-success text-light"><i
                                class="fa-solid fa-check"></i> Save</button>
                        <button v-if="editId === prod.id" @click="cancelEdit" class="text-light bg-secondary"><i
                                class="fa-solid fa-circle-notch"></i> Cancel</button>
                        <button @click="onDelete(prod.id)" :disabled="loading" class="bg-danger text-light"><i
                                class="fa-solid fa-xmark"></i> Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="loading" class="loading">Loading...</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { productService } from '../../services/product.service'
import type { Product } from '../../types'
import { useCategoryStore } from '../../stores/categoryStore'
import { ElInputNumber } from 'element-plus'
import { notifySuccess, notifyError, confirmAction } from '../../untils/notifications'

const products = ref<Product[]>([])
const loading = ref(false)
const showModal = ref(false)
const newProduct = ref<Partial<Product>>({
    productName: '',
    stockQuantity: '',
    price: 0,
    category_Id: undefined,
    isActive: true
})
const editId = ref<number | null>(null)
const editProduct = ref<Partial<Product>>({
    productName: '',
    stockQuantity: '',
    price: 0,
    category_Id: undefined,
    isActive: true
})

const categoryStore = useCategoryStore()
const categories = categoryStore.categories

const fetchProducts = async () => {
    loading.value = true
    try {
        products.value = await productService.getAll()
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    await categoryStore.fetchCategories()
    await fetchProducts()
})

const onCreate = async () => {
    if (!newProduct.value.productName?.trim() || !newProduct.value.category_Id || newProduct.value.price === undefined) return
    loading.value = true
    try {
        await productService.create(newProduct.value)
        await fetchProducts()
        showModal.value = false
        newProduct.value = { productName: '', stockQuantity: '', price: 0, category_Id: undefined, isActive: true }
        notifySuccess('Created successfully')
    } catch (error) {
        notifyError('Failed to create product!')
    } finally {
        loading.value = false
    }
}

const onEdit = (prod: Product) => {
    editId.value = prod.id
    editProduct.value = {
        productName: prod.productName,
        stockQuantity: prod.stockQuantity,
        price: prod.price,
        category_Id: prod.category_Id,
        isActive: prod.isActive
    }
}

const onUpdate = async (id: number) => {
    if (!editProduct.value.productName?.trim() || !editProduct.value.category_Id || editProduct.value.price === undefined) return
    loading.value = true
    try {
        await productService.update(id, editProduct.value)
        await fetchProducts()
        editId.value = null
        notifySuccess('Updated successfully')
    } catch (error) {
        notifyError('Failed to update product!')
    } finally {
        loading.value = false
    }
}

const cancelEdit = () => {
    editId.value = null
}

const onDelete = async (id: number) => {
    const ok = await confirmAction('Delete this product?', 'This action cannot be undone')
    if (!ok) return
    loading.value = true
    try {
        await productService.remove(id)
        await fetchProducts()
        notifySuccess('Deleted successfully')
    } catch (error) {
        notifyError('Failed to delete product!')
    } finally {
        loading.value = false
    }
}

const closeModal = () => {
    showModal.value = false
    newProduct.value = { productName: '', stockQuantity: '', price: 0, category_Id: undefined, isActive: true }
}

const categoryName = (id: number) => {
    const cat = categories.find(c => c.id === id)
    return cat ? cat.categoryName : 'Unknown'
}
</script>

<style scoped>
.products-page {
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
    max-width: 50%;
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    text-align: justify;
}

.form-group input,
.form-group textarea,
.form-group select {
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

.product-table {
    width: 100%;
    border-collapse: collapse;
}

.product-table th,
.product-table td {
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