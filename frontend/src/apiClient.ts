import axios from 'axios'

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : '/',
  headers: {
    'Content-type': 'application/json',
  },
})

export default apiClient
