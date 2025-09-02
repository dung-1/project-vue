export interface Category {
  id: number
  categoryName: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: number
  productName: string
  stockQuantity?: string
  price: number
  category_Id: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}