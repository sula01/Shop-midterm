import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://616bdfe216c3fa00171717fd.mockapi.io/'
});

export const httpClient = instance;