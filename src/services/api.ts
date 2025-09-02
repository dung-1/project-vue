import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
  timeout: 10000,
})

// request: token nếu cần
api.interceptors.request.use(config => {
  // const token = localStorage.getItem('token')
  // if (token) config.headers!.Authorization = `Bearer ${token}`
  return config
})

// response: trả thẳng data hoặc throw error object
api.interceptors.response.use(
  res => res.data,
  err => {
    const payload = err.response?.data ?? { message: err.message }
    return Promise.reject(payload)
  }
)

export default api
