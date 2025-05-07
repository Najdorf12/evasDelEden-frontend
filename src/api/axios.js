import axios from "axios";

// 1. Crear instancia configurada
const instance = axios.create({
  baseURL: "https://evas-del-eden-backend.vercel.app/api",
  withCredentials: true,
  maxContentLength: 120 * 1024 * 1024, // 120MB
  maxBodyLength: 120 * 1024 * 1024,
  timeout: 300000, // 5 minutos
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  }
});

// 2. Configurar interceptores para manejo de errores
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'La solicitud tardó demasiado. Intenta con un archivo más pequeño.';
    }
    
    // Manejo específico para errores CORS
    if (error.response?.status === 0 && !error.response.data) {
      error.message = 'Error de conexión/CORS. Verifica la configuración del servidor.';
    }
    
    return Promise.reject(error);
  }
);

// 3. Exportar como axios manteniendo métodos estáticos
const axiosExport = Object.assign(
  (url, config) => instance(url, config),
  axios,
  { 
    ...instance,
    create: (config) => axios.create({ ...instance.defaults, ...config })
  }
);

export default axiosExport;