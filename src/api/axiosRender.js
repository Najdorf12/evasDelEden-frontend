import axios from "axios";

const axiosRender = axios.create({
  baseURL: "https://evasdeleden-backendrender.onrender.com/api",
  withCredentials: true,
  timeout: 300000,
  maxContentLength: 120 * 1024 * 1024,
  maxBodyLength: 120 * 1024 * 1024
});

axiosRender.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'La solicitud tardó demasiado. Intenta con un archivo más pequeño.';
    }
    return Promise.reject(error);
  }
);

export default axiosRender;