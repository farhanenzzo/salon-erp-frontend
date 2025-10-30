import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../constants";
import showDebouncedError from "../helpers/debouncedError";

export const createApiInstance = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  // Request Interceptor
  api.interceptors.request.use(
    (config) => {
      console.log("Axios Request Config:", {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL,
        headers: config.headers,
        data: config.data,
      });

      const companyId = Cookies.get("companyToken");
      if (companyId) {
        config.headers["Company-ID"] = companyId;
      }

      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Global error tracking to prevent duplicate errors
  let lastErrorTimestamp = 0;
  const ERROR_THRESHOLD = 300; // milliseconds

  // Response Interceptor
  api.interceptors.response.use(
    (response) => {
      console.log("Axios Response:", {
        status: response.status,
        data: response.data,
      });
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const isHandledError = originalRequest?.handleError === false;
      const currentTime = new Date().getTime();

      // Only show error if:
      // 1. Error handling is not explicitly disabled for this request
      // 2. Enough time has passed since the last error to avoid duplicates
      if (
        !isHandledError &&
        currentTime - lastErrorTimestamp > ERROR_THRESHOLD
      ) {
        lastErrorTimestamp = currentTime;

        if (error.response) {
          let errorMessage =
            error.response.data?.message || "An error occurred";
          const errorStatus = error.response.status || 500; // Default to 500 if undefined

          showDebouncedError(errorMessage, errorStatus);
        } else if (error.request) {
          showDebouncedError("No response received from server");
        } else {
          showDebouncedError("Error setting up request");
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export const api = createApiInstance();
