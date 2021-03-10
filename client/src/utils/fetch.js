import axios from 'axios'

const url = 'http://localhost:8000/list/'

const axiosInstance = axios.create({
  baseURL: url
})
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json'

export default axiosInstance
