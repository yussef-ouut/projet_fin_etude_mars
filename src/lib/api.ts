// src/lib/api.ts

// Assuming the backend is running on XAMPP
// Update this if you deploy elsewhere
const API_BASE_URL = 'http://localhost/php/pfe-projet-main/backend/public/api';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiRequestOptions {
    method?: RequestMethod;
    body?: any;
    headers?: Record<string, string>;
}

export const api = {
    fetch: async <T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> => {
        const { method = 'GET', body, headers = {} } = options;

        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        if (body) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'An error occurred');
        }

        return data;
    }
};
