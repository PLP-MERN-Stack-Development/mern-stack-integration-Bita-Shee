import client from "./client";

export const registerUser = async (email, password) => {
    const res = await client.post("/auth/register", { email, password });
    return res.data;
};

export const loginUser = async (email, password) => {
    const res = await client.post("/auth/login", { email, password });
    return res.data;
};

export const logoutUser = async () => {
    await client.post("/auth/logout");
};

export const getMe = async () => {
    const res = await client.get("/auth/me");
    return res.data;
};