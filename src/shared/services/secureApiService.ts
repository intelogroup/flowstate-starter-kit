
import { secureAuthService } from './secureAuthService';

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface ApiError {
  message: string;
  status: number;
  code?: string;
}

interface RequestConfig extends RequestInit {
  requireAuth?: boolean;
  timeout?: number;
}

class SecureApiService {
  private baseUrl: string;
  private readonly DEFAULT_TIMEOUT = 30000; // 30 seconds

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  private sanitizeUrl(url: string): string {
    // Remove any potentially malicious characters from URLs
    return url.replace(/[<>'"]/g, '');
  }

  private async request<T>(
    endpoint: string,
    options: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { requireAuth = true, timeout = this.DEFAULT_TIMEOUT, ...requestOptions } = options;
    
    const sanitizedEndpoint = this.sanitizeUrl(endpoint);
    const url = `${this.baseUrl}${sanitizedEndpoint}`;
    
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      // Prepare headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest', // CSRF protection
      };

      // Add custom headers from options
      if (requestOptions.headers) {
        Object.entries(requestOptions.headers).forEach(([key, value]) => {
          if (typeof value === 'string') {
            headers[key] = value;
          }
        });
      }

      // Add authentication headers if required
      if (requireAuth) {
        const authHeaders = secureAuthService.getAuthHeaders();
        if (!authHeaders.Authorization) {
          throw new Error('Authentication required but no valid token found');
        }
        Object.assign(headers, authHeaders);
      }

      // Add CSRF token if available (would be set by server)
      const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.getAttribute('content');
      if (csrfToken) {
        headers['X-CSRF-Token'] = csrfToken;
      }

      const config: RequestInit = {
        ...requestOptions,
        headers,
        signal: controller.signal,
        credentials: 'same-origin', // Include cookies for same-origin requests
        referrerPolicy: 'strict-origin-when-cross-origin'
      };

      console.log(`Making ${config.method || 'GET'} request to: ${url}`);
      
      const response = await fetch(url, config);
      
      clearTimeout(timeoutId);

      // Check for authentication errors
      if (response.status === 401) {
        await secureAuthService.logout();
        throw new Error('Authentication expired. Please log in again.');
      }

      // Parse response
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        // Sanitize error messages to prevent XSS
        const errorMessage = typeof data === 'object' && data.message 
          ? String(data.message).replace(/<[^>]*>/g, '') // Strip HTML tags
          : 'API request failed';
        
        throw {
          message: errorMessage,
          status: response.status,
          code: data?.code
        } as ApiError;
      }

      return {
        data,
        status: response.status,
        message: data?.message,
      };

    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw {
          message: 'Request timeout - please try again',
          status: 408,
        } as ApiError;
      }

      if (error && typeof error === 'object' && 'status' in error) {
        throw error;
      }

      throw {
        message: error instanceof Error ? error.message : 'Network error occurred',
        status: 500,
      } as ApiError;
    }
  }

  async get<T>(endpoint: string, options: RequestConfig = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(
    endpoint: string, 
    data?: any, 
    options: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    endpoint: string, 
    data?: any, 
    options: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(
    endpoint: string, 
    data?: any, 
    options: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options: RequestConfig = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // Upload files securely
  async uploadFile<T>(
    endpoint: string,
    file: File,
    options: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { requireAuth = true, ...requestOptions } = options;
    
    // Validate file type and size
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'text/plain', 'text/csv'
    ];

    if (file.size > maxSize) {
      throw new Error('File size exceeds 10MB limit');
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error('File type not allowed');
    }

    const formData = new FormData();
    formData.append('file', file);

    const headers: Record<string, string> = {};

    if (requireAuth) {
      const authHeaders = secureAuthService.getAuthHeaders();
      if (!authHeaders.Authorization) {
        throw new Error('Authentication required but no valid token found');
      }
      headers.Authorization = authHeaders.Authorization;
    }

    const sanitizedEndpoint = this.sanitizeUrl(endpoint);
    const url = `${this.baseUrl}${sanitizedEndpoint}`;

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
      credentials: 'same-origin',
      ...requestOptions
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'File upload failed');
    }

    const data = await response.json();
    return {
      data,
      status: response.status
    };
  }
}

export const secureApiService = new SecureApiService();
