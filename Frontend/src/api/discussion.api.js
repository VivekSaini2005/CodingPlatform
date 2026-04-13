import axiosInstance from "./axiosInstance";

export const getPostsAPI = async () => {
  return await axiosInstance.get(`/discussion`);
};

export const createPostAPI = async (postData) => {
  return await axiosInstance.post(`/discussion/create`, postData);
};

export const deletePostAPI = async (postId) => {
  return await axiosInstance.delete(`/discussion/${postId}`);
};

export const getCommentsAPI = async (postId) => {
  return await axiosInstance.get(`/discussion/${postId}/comments`);
};

export const addCommentAPI = async (postId, commentData) => {
  return await axiosInstance.post(`/discussion/${postId}/comment`, commentData);
};