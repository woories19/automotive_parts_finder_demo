/**
 * Centralized API configuration utility.
 * Handles the logic for using a custom override URL (from localStorage)
 * or falling back to the build-time environment variable.
 */

const STORAGE_KEY = 'parts_finder_api_override';

export const getApiBaseUrl = () => {
    // Check for user-defined override in this browser session
    const override = localStorage.getItem(STORAGE_KEY);
    if (override && override.trim() !== '') {
        return override.trim().replace(/\/$/, ''); // Remove trailing slash
    }

    // Fallback to build-time environment variable or demo default
    return import.meta.env.VITE_API_BASE_URL || 'https://demo-api.ngrok-free.app';
};

export const setApiOverride = (url) => {
    if (!url || url.trim() === '') {
        localStorage.removeItem(STORAGE_KEY);
    } else {
        localStorage.setItem(STORAGE_KEY, url.trim());
    }
};

export const clearApiOverride = () => {
    localStorage.removeItem(STORAGE_KEY);
};

export const API_ENDPOINTS = {
    GET_OFFERS: (base) => `${base}/webhook/get-offers`,
    PART_REQUEST: (base) => `${base}/webhook/part-request`,
    VERIFY_OTP: (base) => `${base}/webhook/verify-otp`,
};
