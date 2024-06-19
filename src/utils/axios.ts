// src/utils/axios.js
import axios from 'axios'
import type {InternalAxiosRequestConfig} from 'axios'
import { Toast } from 'antd-mobile'

const MODE = import.meta.env.MODE // 环境变量
axios.defaults.baseURL = MODE == 'development' ? 'http://127.0.0.1:7001/api' : 'http://api.chennick.wang'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use((res: InternalAxiosRequestConfig) => {
  res.headers['Authorization'] = `${localStorage.getItem('token') || null}`
  return res
})

axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    Toast.show('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.code != 200) {
    if (res.data.msg) Toast.show(res.data.msg)
    if (res.data.code == 401) {
      // window.location.href = '/login'
    }
    return Promise.reject(res.data.data)
  }

  return Promise.resolve(res.data.data)
})

export default axios
