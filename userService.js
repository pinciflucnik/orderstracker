import * as api from "./api.js";
import { userData } from "./userData.js";

const userEndPoints = {
    login: "/parse/login",
    logout: "/parse/logout",
    register: "/parse/users"
}

async function register(username, email, password) {
    const data = await api.post(userEndPoints.register, {username, email, password});
    return data;
}

async function login(username, password) {
    const data = await api.post(userEndPoints.login, {username, password});
    return data;
}

async function logout() {
    const data = await api.post(userEndPoints.logout);
    userData.clearData();
}

export const userService = {
    login,
    logout,
    register
}