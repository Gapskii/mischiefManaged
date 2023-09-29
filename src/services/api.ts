import axios from 'axios';

export const hpApi = axios.create({
  baseURL: 'https://hp-api.onrender.com/api'
})