import { baseURL } from './globals'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 419) {
        alert('Sessão expirada. Redirecionando para a página de login.')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
