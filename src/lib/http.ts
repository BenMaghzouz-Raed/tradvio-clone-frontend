import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// Create an Axios instance
const api: AxiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
});

// Add a request interceptor (middleware)
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return only the data property
    if (response.data.error) {
      throw new Error(response.data.error.detail);
    } else {
      return response.data;
    }
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error);
  }
);

export default api;
