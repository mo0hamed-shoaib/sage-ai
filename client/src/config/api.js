// API configuration for development and production
const API_BASE_URL = import.meta.env.PROD 
  ? '/api'  // In production, use relative path for Vercel
  : 'http://localhost:5001/api'; // In development, use localhost

export const API_ENDPOINTS = {
  CHAT: `${API_BASE_URL}/chat`,
  GENERATE_IMAGE: `${API_BASE_URL}/generate-image`,
  UPLOAD: `${API_BASE_URL}/upload`,
  IMAGE_MODELS: `${API_BASE_URL}/image-models`,
};

export default API_BASE_URL; 