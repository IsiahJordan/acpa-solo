import axios from 'axios'
import newLogger from '@/utils/log'

const log = newLogger("axios");

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config
});

api.interceptors.response.use(
  response => response,
  error => {
    log.error("API error", error);
    return Promise.reject(error);
  }
);

export default api;
