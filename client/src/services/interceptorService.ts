import axios from 'axios';
import { deleteTokenCookie, deleteUserInfo, getTokenCookie } from './cookieService';
import { setMessage } from '../redux/slices/toastSlice';
import store from '../redux/store';
import { setIsLoggedIn } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

// Create a map to store cancellation token sources for each request
const cancelTokenSources = new Map();

const axiosInstance = axios.create();

function handleRedirect(path: string) {
    const navigate = useNavigate();
    navigate(path)
}

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getTokenCookie();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Create a new cancellation token source for each request
        const cancelTokenSource = axios.CancelToken.source();

        // Cancel the previous request, if any, for this URL
        if (cancelTokenSources.has(config.url)) {
            cancelTokenSources.get(config.url).cancel('Request canceled');
            // Remove the canceled token source from the map
            cancelTokenSources.delete(config.url);
        }

        // Store the cancellation token source in the map
        cancelTokenSources.set(config.url, cancelTokenSource);

        // Assign the cancellation token to the request's cancelToken property
        config.cancelToken = cancelTokenSource.token;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        const { data } = response || {};
        const dispatch = store.dispatch;
        dispatch(setMessage(data?.message || ''));

        // Check if response data is a blob
        if (response.headers['content-type'] === 'application/octet-stream') {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => {
                    response.data = reader.result;
                    resolve(response);
                };
                reader.readAsDataURL(response.data);
            });
        }

        return response;
    },
    (error) => {
        const { status, data } = error.response || {};
        const dispatch = store.dispatch;

        if (status === 400) {
            dispatch(setMessage(data.message));
            console.error('Bad Request:', data.message);
        } else if (status === 401) {
            dispatch(setMessage(data.message));
            console.error('Unauthorized:', data.message);
        } else if (status === 404) {
            dispatch(setMessage(data.message));
            console.error('Not Found:', data.message);
        } else if (status === 403) {
            dispatch(setMessage('Session expired! please log in again to continue.'));
            dispatch(setIsLoggedIn(false));
            deleteTokenCookie();
            deleteUserInfo();
            handleRedirect('/sign-in')
            console.error('Authentication token expired:', data.message);
        } else {
            dispatch(setMessage(data?.message || ''));
            // console.error('Error:', data?.message || '');
        }

        // if (error.request) {
        //     console.error('Request Error:', error.request);
        // }

        return Promise.reject(error);
    }
);

export default axiosInstance;
