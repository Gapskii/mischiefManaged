import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333'
})

export const hpApi = axios.create({
  baseURL: 'https://hp-api.onrender.com/api'
})