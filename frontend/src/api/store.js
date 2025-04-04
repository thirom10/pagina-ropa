import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});


export const getGenres = () => api.get('/genres/');
export const createGenre = (data) => api.post('/genres/', data);
export const getSizes = () => api.get('/sizes/');
export const createSize = (data) => api.post('/sizes/', data);
export const getBands = () => api.get('/bands/');
export const createBand = (data) => api.post('/bands/', data);
export const getBandMembers = () => api.get('/band-members/');
export const createBandMember = (data) => api.post('/band-members/', data);
export const getProducts = () => api.get('/products/');
export const createProduct = (data) => api.post('/products/', data);
export const getProductSizeStocks = () => api.get('/product-size-stocks/');