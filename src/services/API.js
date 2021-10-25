import axios from "axios";

const API_URL = "http://localhost:4000";

const createHeaders = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } };
}

const signUp = (body) => axios.post(`${API_URL}/sign-up`, body);
const logIn = (body) => axios.post(`${API_URL}/log-in`, body);
const getWallet = (token) => axios.get(`${API_URL}/wallet`, createHeaders(token));

export {
    signUp,
    logIn,
    getWallet
}