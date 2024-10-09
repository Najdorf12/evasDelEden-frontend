import axios from "./axios";

export const getEvas = async () => {
  try {
    const response = await axios.get("/evas");
    return response.data;
  } catch (error) {
    console.error("Error fetching evas:", error);
    throw error;
  }
};export const getEvasFilterByCategory = async () => {
  try {
    const response = await axios.get("/evas/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching evas:", error);
    throw error;
  }
};