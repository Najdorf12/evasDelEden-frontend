import axios from "axios";

const instance = axios.create({
  baseURL: "https://evas-del-eden-backend.vercel.app/api",
  withCredentials: "true",
  maxContentLength: 100 * 1024 * 1024, // 100MB
  maxBodyLength: 100 * 1024 * 1024, // 100MB
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export default instance;

/*  
http://localhost:1212/api
https://evas-del-eden-backend.vercel.app/api
*/
