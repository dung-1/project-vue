import api from './api'
import type { Category } from '../types'

export const categoryService = {
  getAll: (): Promise<Category[]> => api.get('/categories'),
  getById: (id: number) => api.get<Category>(`/categories/${id}`),
  create: (payload: Partial<Category>) => api.post('/categories/create', payload),
  update: (id: number, payload: Partial<Category>) => api.put(`/categories/update/${id}`, payload),
  remove: (id: number): Promise<void> => api.delete(`/categories/delete/${id}`),
}
