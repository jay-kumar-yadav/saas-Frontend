import api from './api';

export const notesAPI = {
  getAll: () => 
    api.get('/notes').then(res => res.data),
  
  get: (id) => 
    api.get(`/notes/${id}`).then(res => res.data),
  
  create: (note) => 
    api.post('/notes', note).then(res => res.data),
  
  update: (id, note) => 
    api.put(`/notes/${id}`, note).then(res => res.data),
  
  delete: (id) => 
    api.delete(`/notes/${id}`).then(res => res.data),
};