import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
        error.response?.status === 401 &&
        !originalRequest._retry 
    ) {
      originalRequest._retry = true;

      try {
        await client.post('/auth/refresh');
        return client(originalRequest);
      } catch (err) {
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
    }
);

export default client;