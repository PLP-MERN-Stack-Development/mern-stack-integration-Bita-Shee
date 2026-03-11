import client from './client';

export const getAllCategories = async () => {
    const res = await client.get('/categories');
    return res.data;
};

export const createCategory = async (name) => {
    const res = await client.post('/categories', { name });
    return res.data;
};

export const getCategoryById = async (id) => {
    const res = await client.get(`/categories/${id}`);
    return res.data;
};

export const deleteCategory = async (id) => {
    await client.delete(`/categories/${id}`);
};
