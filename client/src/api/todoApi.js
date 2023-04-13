import { apiAxios } from './apiconfig';

export const TodoApi = {
  gets: async () => {
    return apiAxios
      .get('/todos')
      .then((res) => {
        return { data: res.data, error: null };
      })
      .catch((err) => {
        return { data: [], error: err.message };
      });
  },
  create: async (payload) => {
    return apiAxios
      .post('/todos', payload)
      .then((res) => {
        return { data: res.data, error: null };
      })
      .catch((err) => {
        return { data: {}, error: err.message };
      });
  },
  update: async (id, payload) => {
    return apiAxios
      .put(`/todos/${id}`, payload)
      .then((res) => {
        return { data: res.data, error: null };
      })
      .catch((err) => {
        return { data: {}, error: err.message };
      });
  },
  delete: async (id) => {
    return apiAxios
      .delete(`/todos/${id}`)
      .then((res) => {
        return { data: res.data, error: null };
      })
      .catch((err) => {
        return { data: {}, error: err.message };
      });
  },
};
