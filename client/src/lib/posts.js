import client from "./client";

export const createPost = async (formData) => {
  const res = await client.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

export const getPosts = async ({ page = 1, search = "", category = "" }) => {
    const res = await client.get("/posts", {
        params: { page, search, category }
    });
    return res.data;
};

export const getPostById = async (postId) => {
    const res = await client.get(`/posts/${postId}`);
    return res.data;
};

export const updatePost = async (postId, formData) => {
    const res = await client.put(`/posts/${postId}`, formData);
    return res.data;
};

export const deletePost = async (postId) => {
    await client.delete(`/posts/${postId}`);
};

export const createComment = async (postId, text) => {
    const res = await client.post(`/posts/${postId}/comments`, { text });
    return res.data;
};

export const getCommentsByPost = async (postId) => {
    const res = await client.get(`/posts/${postId}/comments`);
    return res.data;
};

export const deleteComment = async (postId, commentId) => {
    await client.delete(`/posts/${postId}/comments/${commentId}`);
};