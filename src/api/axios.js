import axios from "axios";

// Configurar la instancia por defecto
axios.defaults.baseURL = "https://evas-del-eden-backend.vercel.app/api"; // https://evas-del-eden-backend.vercel.app/api
axios.defaults.withCredentials = true;
axios.defaults.maxContentLength = 120 * 1024 * 1024;
axios.defaults.maxBodyLength = 120 * 1024 * 1024;
axios.defaults.timeout = 300000;

// Añadir interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'La solicitud tardó demasiado. Intenta con un archivo más pequeño.';
    }
    return Promise.reject(error);
  }
);

export default axios;