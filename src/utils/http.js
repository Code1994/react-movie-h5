// 配置axios
import axios from 'axios'

// dev环境
// const baseURL = 'http://127.0.0.1:8081'
// 生产环境3218686872170500
const baseURL = 'http://39.106.217.109:8080'
// 新建一个axios实例
const instance = axios.create({
  baseURL,
  timeout: 5000,
})

// 定义错误处理函数
const errHandler = (err) => {
  return Promise.reject(err)
}

// 请求拦截器
instance.interceptors.request.use((config) => {
  return config
}, errHandler)

// 响应拦截器
instance.interceptors.response.use((response) => {
  return response.data
}, errHandler)

export default instance

