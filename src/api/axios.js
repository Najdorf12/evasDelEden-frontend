import axios from "axios";

// Crear instancia configurada
const configuredAxios = axios.create({
  baseURL: "https://evas-del-eden-backend.vercel.app/api",
  withCredentials: true,
  maxContentLength: 120 * 1024 * 1024, // 120MB
  maxBodyLength: 120 * 1024 * 1024,
  timeout: 300000 // 5 minutos
});

// Configurar interceptores
configuredAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'La solicitud tardó demasiado. Intenta con un archivo más pequeño.';
    }
    return Promise.reject(error);
  }
);

// Exportar como "axios" manteniendo todas las funcionalidades originales
const customAxios = Object.assign(
  (url, config) => configuredAxios(url, config),
  axios, // Mantener métodos estáticos (axios.get, axios.post, etc.)
  configuredAxios // Mantener la instancia configurada
);

export default customAxios;