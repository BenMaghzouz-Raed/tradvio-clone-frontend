import { getOrThrow } from "@/config";
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// Create an Axios instance
const api: AxiosInstance = axios.create({
  baseURL: getOrThrow<string>("BACKEND_BASE_URL"),
});

// Add a request interceptor (middleware)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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
