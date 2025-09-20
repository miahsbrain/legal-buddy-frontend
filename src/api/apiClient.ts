import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

class APIClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedRequests: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
    config: AxiosRequestConfig;
  }> = [];

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // Request interceptor to attach token
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor to refresh token
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url?.includes("/auth/refresh") && // Added optional chaining
          !originalRequest.url?.includes("/auth/login") &&
          !originalRequest.url?.includes("/auth/signup")
        ) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedRequests.push({
                resolve,
                reject,
                config: originalRequest,
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const res = await this.client.post<{ access_token: string }>(
              "/auth/refresh",
            );
            localStorage.setItem("access_token", res.data.access_token);

            // Ensure headers exist before setting Authorization
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;

            // Process queued requests
            this.failedRequests.forEach((req) => {
              req.config.headers = req.config.headers || {};
              req.config.headers.Authorization = `Bearer ${res.data.access_token}`;
              this.client(req.config).then(req.resolve).catch(req.reject);
            });

            this.failedRequests = [];
            return this.client(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem("access_token");
            window.location.href = "/login";
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        if (error.config.url?.includes("/auth/refresh")) {
          localStorage.removeItem("access_token");
          window.location.href = "/login";
        }

        return Promise.reject(error);
      },
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  public async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(
      url,
      data,
      config,
    );
    return response.data;
  }

  public async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }
}

// Initialize with your backend URL (can come from env vars)
const apiBaseURL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
  "http://127.0.0.1:3000";

export const apiClient = new APIClient(apiBaseURL);
