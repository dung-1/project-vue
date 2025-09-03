import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productService } from '../services/product.service'
import type { Product } from '../types'


export const useProductStore = defineStore('product', () => {
    const products = ref<Product[]>([])
    const loading = ref(false)

    async function fetchProducts() {
        loading.value = true
        try {
            const response = await productService.getAll()
            products.value = response || []
        } catch (error) {
            console.error('Failed to fetch products:', error)
            products.value = []
        } finally {
            loading.value = false
        }
    }

    async function createProduct(payload: Partial<Product>) {
        try {
            const response = await productService.create(payload)
            return response
        } catch (error) {
            console.error('Failed to create product:', error)
            throw error
        }
    }

    async function updateProduct(id: number, payload: Partial<Product>) {
        try {
            const response = await productService.update(id, payload)
            return response
        } catch (error) {
            console.error('Failed to update product:', error)
            throw error
        }
    }

    async function removeProduct(id: number) {
        try {
            await productService.remove(id)
        } catch (error) {
            console.error('Failed to remove product:', error)
            throw error
        }
    }

    return {
        products,
        loading,
        fetchProducts,
        createProduct,
        updateProduct,
        removeProduct
    }
})