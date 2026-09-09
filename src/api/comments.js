import axios from "./axiosRender";

export const getCommentsByEva = async (evaId) => {
  const res = await axios.get(`/comments/eva/${evaId}`);
  return res.data;
};

export const postComment = async (evaId, { name, text }) => {
  const res = await axios.post(`/comments/eva/${evaId}`, { name, text });
  return res.data;
};