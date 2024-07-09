import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ?
    '' : 'http://localhost:4000'
})

axiosInstance.interceptors.request.use(function (config) {
  // 요청이 보내지기 전에 처리할 것
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
  return config;
}, function (error) {
  return Promise.reject(error);
})

export default axiosInstance;