import axios from "axios";

const instance = axios.create({
  baseURL: "https://evas-del-eden-backend.vercel.app/api",
  withCredentials: true,
  maxContentLength: 120 * 1024 * 1024, // Coincide con tu backend (120MB)
  maxBodyLength: 120 * 1024 * 1024,
  timeout: 300000 // 5 minutos (verifica límite de Vercel)
});

// Interceptor para manejar errores globalmente
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'La solicitud tardó demasiado. Intenta con un archivo más pequeño.';
    }
    return Promise.reject(error);
  }
);

export default instance;