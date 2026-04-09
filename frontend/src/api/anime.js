import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const listarAnime = (page = 1, limit = 10) =>
  api.get(`/anime?page=${page}&limit=${limit}`);

export const buscarAnimePorId = (id) => api.get(`/anime/${id}`);

export const criarAnime = (dados) => api.post("/anime", dados);

export const atualizarAnime = (id, dados) => api.put(`/anime/${id}`, dados);

export const deletarAnime = (id) => api.delete(`/anime/${id}`);
