import axios from "./axiosVercel";

export const getEvas = async () => {
  try {
    const response = await axios.get("/evas");
    return response.data;
  } catch (error) {
    console.error("Error fetching evas:", error);
    throw error;
  }
};

export const getEvasByProvince = async (province) => {
  try {
    const response = await axios.get(`/evas/by-province/${province}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Evas by province:", error);
    throw error;
  }
};
