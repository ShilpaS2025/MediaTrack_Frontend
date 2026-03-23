import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Adjust as needed for backend integration
  headers: {
    'Content-Type': 'application/json',
  },
});

export const operatorApi = {
  getIngestData: () => api.get('/ingest'),
  getPackagingData: () => api.get('/packaging'),
  getCDNData: () => api.get('/cdn'),
  getDRMData: () => api.get('/drm'),
};

export default operatorApi;
