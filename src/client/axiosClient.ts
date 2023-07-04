import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { ENV } from "@/utils/constants";
type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
interface HttpClientConfig extends AxiosRequestConfig {
    requiresToken?: boolean;
}

interface HttpClient {
    get<T>(url: string, config?: HttpClientConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: HttpClientConfig): Promise<T>;
    put<T>(url: string, data?: any, config?: HttpClientConfig): Promise<T>;
    patch<T>(url: string, data?: any, config?: HttpClientConfig): Promise<T>;
    delete<T>(url: string, config?: HttpClientConfig): Promise<T>;
}

export const axiosClient = (baseURL?:string): HttpClient => {

    const httpClient: AxiosInstance = axios.create({
        baseURL: baseURL ?? ENV.API_URL,
    });

    initializeInterceptors(httpClient);

    const httpMethods: Partial<HttpClient> = {};

    const methods: HttpMethod[] = ['get', 'post', 'put', 'patch', 'delete'];

    methods.forEach((method: HttpMethod) => {
        httpMethods[method] = async <T>(url: string, data?: any, config?: HttpClientConfig): Promise<T> => {
            try {
                let requestConfig: HttpClientConfig = {};

                if (method === 'get' || method === 'delete') {
                    requestConfig = { ...(config ?? {}), params: data };
                   
                }
                requestConfig = { ...(config ?? {}), data };

                return await httpClient[method]<T>(url, data, requestConfig).then((response: AxiosResponse<T>) => response.data);
            } catch (e) {
                throw handleAxiosError(e);
            }
        };
    });

    return httpMethods as HttpClient;
}

function initializeInterceptors(httpClient: AxiosInstance): void {
    httpClient.interceptors.request.use(
        (config: any) => {

        

            if (config.requiresToken) {
                const token = localStorage.getItem('token');
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                };
            }

            return config;
        },
        (error: AxiosError) => {
            // Handle request errors
            return Promise.reject(error);
        }
    );

    httpClient.interceptors.response.use(
        (response: AxiosResponse) => {
            // Perform any post-response operations or modifications to the response
            return response;
        },
        (error: AxiosError) => {
            // Handle response errors
            return Promise.reject(error);
        }
    );
}

function handleAxiosError(error: any): Error {
    if (error.response) {
        // Error de respuesta del servidor (ejemplo: status code diferente de 2xx)
        const { status, data } = error.response;
        return new Error(`HTTP Error: ${status} - ${data}`);
    } else if (error.request) {
        // Error de solicitud sin respuesta del servidor
        return new Error('No response received from server');
    } else {
        // Otros errores
        return new Error('An error occurred');
    }
}