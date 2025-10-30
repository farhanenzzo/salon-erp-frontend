export const handleAxiosError = (error) => {
    if (error.response?.data?.code?.startsWith('auth/')) {
      return getFirebaseErrorMessage(error.response.data.code);
    }
  
    // Regular error message from backend
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
  
    // Handle different HTTP status codes
    switch (error.response?.status) {
      case 400:
        return error.response?.data?.error || "Invalid request. Please check your input.";
      case 401:
        return "Unauthorized. Please log in again.";
      case 403:
        return "You don't have permission to perform this action.";
      case 404:
        return "Resource not found.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return "Something went wrong. Please try again.";
    }
  };