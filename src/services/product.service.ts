import api from './api'
import type { Product } from '../types'


export const productService = {
    getAll: (): Promise<Product[]> => api.get('/products'),
    getById: (id: number) => api.get<Product>(`/products/${id}`),
    create: (payload: Partial<Product>) => api.post('/products/create', payload),
    update: (id: number, payload: Partial<Product>) => api.put(`/products/update/${id}`, payload),
    remove: (id: number): Promise<void> => api.delete(`/products/delete/${id}`),
}