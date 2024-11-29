import axiosInstance from './axios'

export const GET = async (route: string, params = {}) => {
  const result = await axiosInstance
    .get(route, params)
    .then((res) => {
      return { ...res.data, status: res.status }
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
      return { ...res.data, status: res.status }
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

export const PUT = async (route: string, object: object, headers = {}) => {
  console.log(object)
  const result = await axiosInstance
    .put(route, object, { headers })
    .then((res) => {
      return { ...res.data, status: res.status }
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

export const DELETE = async (route: string, body: object) => {
  const result = await axiosInstance
    .delete(route, { data: body })
    .then((res) => {
      return { ...res.data, status: res.status }
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
