import api from './api';

export const tenantsAPI = {
  upgrade: (slug) => 
    api.post(`/tenants/${slug}/upgrade`).then(res => res.data),
};