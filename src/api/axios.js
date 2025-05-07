import axios from "axios";

const instance = axios.create({
  baseURL: "https://evas-del-eden-backend.vercel.app/api",
  withCredentials: true, // Cambiado a booleano true
  maxContentLength: 50 * 1024 * 1024, // 50MB
  maxBodyLength: 50 * 1024 * 1024 // 50MB
});

export default instance;