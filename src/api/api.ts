import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getRecords = async (start: number = 0, limit: number = 10) => {
  const res = await api.get(`/records?_start=${start}&_limit=${limit}`);
  return res.data;
};

export const createRecord = async (item: any) => {
  const res = await api.post('/records', item);
  return res.data;
};