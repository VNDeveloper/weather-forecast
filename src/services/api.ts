import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
const VITE_BASE_API_URL = import.meta.env.VITE_BASE_API_URL as string;

export class ApiService {
  private client: AxiosInstance;
  
  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Add request interceptor for auth
    this.client.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );
    
    // Add response interceptor for errors
    this.client.interceptors.response.use(
      response => response,
      error => {
        // Handle global errors like 401 unauthorized
        if (error.response?.status === 401) {
          // Redirect to login or handle token refresh
        }
        return Promise.reject(error);
      }
    );
  }
  
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }
  
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
    return response.data;
  }
  
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }
  
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }
}

// Create default instance
export const apiService = new ApiService(VITE_BASE_API_URL);

export default apiService;

