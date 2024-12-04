import axiosInstance from './axios'
import { toast } from 'react-toastify'

export const GET = async (route: string, params = {}) => {
  const result = await axiosInstance
    .get(route, params)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
      return {
        error: true,
        ...err.response,
        status: err.response?.status,
      }
    })

  return result
}

export const POST = async (route: string, object: object, headers = {}) => {
  const result = await axiosInstance
    .post(route, object, { headers })
    .then((res) => {
      toast.success('Sucesso ao inserir item!')
      return res.data
    })
    .catch((err) => {
      console.log(err)

      return {
        error: true,
        ...err.response,
        // status: err.response.status,
      }
    })
  return result
}

export const PUT = async (route: string, object: object, headers = {}) => {
  console.log(object)
  const result = await axiosInstance
    .put(route, object, { headers })
    .then((res) => {
      toast.success('Sucesso ao atualizar item!')
      return res.data
    })
    .catch((err) => {
      return {
        error: true,
        ...err.response,
        status: err.response.status,
      }
    })
  return result
}

export const DELETE = async (route: string, body?: object) => {
  const result = await axiosInstance
    .delete(route, { data: body })
    .then((res) => {
      toast.success('Sucesso ao deletar item!')
      return res.data
    })
    .catch((err) => {
      return {
        error: true,
        ...err.response,
        status: err.response.status,
      }
    })
  return result
}
