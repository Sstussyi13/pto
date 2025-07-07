import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', // если надо, задашь позже
  withCredentials: true,
});

export default API;
