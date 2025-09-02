export interface Category {
  id: number
  categoryName: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: number
  name: string
  description?: string
  price: number
  categoryId: number
  createdAt: string
  updatedAt: string
}