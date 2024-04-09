import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from './interceptorService';

export const getService = async <T>(
    url: string,
    params: Record<string, any> = {},
    options: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => {
    try {
        const { responseType, ...otherOptions } = options;

        const response = await axios.get<T>(`${import.meta.env.VITE_API_SERVER}/${url}`, {
            params,
            responseType,
            ...otherOptions
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const postService = async <T>(
    url: string,
    payload: any,
    options: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => {
    try {
        const response = await axios.post<T>(`${import.meta.env.VITE_API_SERVER}/${url}`, payload, options);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const putService = async <T>(
    url: string,
    payload: any,
    options: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => {
    try {
        const response = await axios.put<T>(`${import.meta.env.VITE_API_SERVER}/${url}`, payload, options);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteService = async <T>(
    url: string,
    payload: any,
    options: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => {
    try {
        const response = await axios.delete<T>(`${import.meta.env.VITE_API_SERVER}/${url}`, { data: payload, ...options });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
