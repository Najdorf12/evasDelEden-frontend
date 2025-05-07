import axios from "axios";

const instance = axios.create({
  baseURL: "https://evas-del-eden-backend.vercel.app/api",
  withCredentials: "true",
  credentials: false,
});
export default instance;

/*  
http://localhost:1212/api
https://evas-del-eden-backend.vercel.app/api
*/

