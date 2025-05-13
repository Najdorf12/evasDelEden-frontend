import axios from "axios";

const axiosVercel = axios.create({
  baseURL: "https://evas-del-eden-backend.vercel.app/api",
  withCredentials: true,
  timeout: 300000,
  maxContentLength: 120 * 1024 * 1024,
  maxBodyLength: 120 * 1024 * 1024
});

axiosVercel.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'La solicitud tardó demasiado. Intenta con un archivo más pequeño.';
    }
    return Promise.reject(error);
  }
);

export default axiosVercel;