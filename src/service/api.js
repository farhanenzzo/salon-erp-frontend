import { API, BASE_URL, FIELD_NAMES } from "../constants";
import { api } from "../utils/interceptors";

export const updateUserProfile = async (userId, formData) => {
  try {
    const response = await api.patch(`${API.UPDATE_USER}${userId}`, formData);
    return response.data;
  } catch (error) {
    // Log and throw any error from the API call
    console.error("Error updating user profile:", error);
    throw new Error(error.response?.data?.error || "Error updating profile");
  }
};

export const handleSignOut = async () => {
  try {
    const response = await api.post(API.LOGOUT_USER);
    return response.data;
  } catch (error) {
    console.error("Error signing out: ", error);
    throw new Error("Failed to sign out");
  }
};

// ------------------------------------------------------------------------------ //

// Add company api
export const addCompany = async (companyData) => {
  try {
    const response = await api.post(API.ADD_COMPANY, companyData);
    console.log("API Response: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding company: ", error);
    return { success: false, message: error.message };
  }
};

export const showCompanyDetails = async () => {
  try {
    const response = await api.get(API.COMPANY_DETAILS);
    return response.data;
  } catch (error) {
    console.error("Error fetching company details: ", error);
    return { success: false, message: error.message };
  }
};

export const updateCompany = async (formData) => {
  try {
    const response = await api.patch(API.UPDATE_COMPANY, {
      updateData: formData,
    });
    return response.data;
  } catch (error) {
    console.log("Error updating company details", error);
    return { success: false, message: error.message };
  }
};

// Signup user

export const signUpUser = async (userData) => {
  try {
    const response = await api.post(API.SIGN_UP, userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up user: ", error);
    return { success: false, message: error.message };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post(API.LOGIN_USER, userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in user: ", error);
    return { success: false, message: error.message };
  }
};

export const storeUser = async (user) => {
  try {
    const response = await api.post(API.SET_USER, user);
  } catch (error) {}
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`${API.GET_USER_DETAILS}${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting user details: ", error);
    return { success: false, message: error.message };
  }
};

// Super admin function for creating new users
export const createUser = async (userData) => {
  try {
    const response = await api.post(API.CREATE_USER, userData); // Use your CREATE_USER endpoint
    return response.data;
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
};

export const getUsersByCompany = async () => {
  try {
    const response = await api.get(API.GET_USERS); // Use your GET_USERS endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching users: ", error);
    return { success: false, message: error.message };
  }
};

export const storeToken = async (token) => {
  try {
    const response = await api.post(API.SET_TOKEN, { token });
    return response.data;
  } catch (error) {
    console.error(
      "Error storing token:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const sendOTP = async (email) => {
  try {
    const response = await api.post(
      API.SEND_OTP,
      { email },
      { handleError: false }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const verifyOTP = async (email, otp) => {
  try {
    const response = await api.post(
      API.VERIFY_OTP,
      { email, otp },
      { handleError: false }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (email, newPassword) => {
  try {
    const response = await api.patch(API.UPDATE_PASSWORD, {
      email,
      newPassword,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw { error: "No response received from server" };
    } else {
      throw { error: "Error setting up the request" };
    }
  }
};

export const addAppointment = async (appointmentData) => {
  try {
    const response = await api.post(API.ADD_APPOINTMENT, appointmentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAppointmentCount = async () => {
  try {
    // Make the API request using the imported api instance
    const response = await api.get(API.FETCH_APPOINTMENT_COUNT);
    return response.data.count; // Assuming the response contains a field 'count'
  } catch (error) {
    return 0; // Return a default value in case of error
  }
};

export const fetchAppointmentCountByGender = async (filter) => {
  try {
    const response = await api.get(API.FETCH_APPOINTMENT_COUNT_BY_GENDER, {
      params: { filter },
    });
    return response.data; // Returns an array of counts by gender
  } catch (error) {
    return []; // Return a default value in case of error
  }
};

export const deleteAppointment = async (appointmentId) => {
  try {
    const response = await api.patch(
      `${API.DELETE_APPOINTMENT}${appointmentId}`
    );

    if (!response.ok) {
      throw new Error("Failed to delete appointment");
    }

    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    return [];
  }
};

export const listAppointments = async (params) => {
  try {
    const response = await api.get(API.LIST_APPOINTMENTS, { params });
    // Return both the data and pagination info as received from backend
    return {
      data: response.data.data,
      pagination: response.data.pagination,
      success: true,
    };
  } catch (error) {
    return {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
      success: false,
      error: error.message,
    };
  }
};

export const addServices = async (servicesData) => {
  try {
    const response = await api.post(API.ADD_SERVICE, servicesData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getServices = async (params = {}) => {
  try {
    const response = await api.get(API.LIST_SERVICES, {
      params: {
        page: 1,
        limit: 10,
        ...params, // Spread operator allows overriding defaults
      },
    });

    return {
      data: response.data.data || response.data, // Handle both paginated and non-paginated responses
      pagination: response.data.pagination,
      success: true,
    };
  } catch (error) {
    return {
      data: [],
      success: false,
      error: error.message,
    };
  }
};

export const getServicesCount = async () => {
  try {
    const response = await api.get(API.GET_SERVICES_COUNT);
    return response.data.count;
  } catch (error) {
    return 0;
  }
};

export const listCategoryDropdown = async () => {
  try {
    const response = await api.get(API.LIST_CATEGORY_DROPDOWN);
    return response.data;
  } catch (error) {
    return 0;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.patch(`${API.SOFT_DELETE_CATEGORY}${id}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const updateCategory = async (id, data) => {
  try {
    const response = await api.patch(`${API.UPDATE_CATEGORY}${id}`, data);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const deleteService = async (serviceID) => {
  try {
    const response = await api.patch(`${API.REMOVE_SERVICE}${serviceID}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting service", error.message);
    return error;
  }
};

export const updateService = async (id, updatedData) => {
  try {
    const response = await api.patch(`${API.UPDATE_SERVICE}${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating service", error.message);
    return error;
  }
};

export const addEmployee = async (employeesData) => {
  try {
    const response = await api.post(API.ADD_EMPLOYEE, employeesData);
    return response.data;
  } catch (error) {
    console.error("Error adding employees", error.message);
    return 0;
  }
};

export const listEmployees = async (params) => {
  try {
    const response = await api.get(API.LIST_EMPLOYEES, { params });
    return {
      data: response.data.data,
      pagination: response.data.pagination,
      success: true,
    };
  } catch (error) {
    console.error("Error fetching employees", error.message);
    return {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
      success: false,
      error: error.message,
    };
  }
};

export const listServiceBasedEmployee = async (serviceID) => {
  try {
    const response = await api.get(API.LIST_SERVICE_BASED_EMPLOYEES, {
      params: { serviceID },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching employee based on service");
    return [];
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await api.patch(`${API.DELETE_EMPLOYEE}${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting employee", error);
    return [];
  }
};

export const updateEmployee = async (id, updatedData) => {
  try {
    const response = await api.patch(
      `${API.UPDATE_EMPLOYEE}${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating employee", error.message);
    return 0;
  }
};

export const updateAppointment = async (id, updatedData) => {
  try {
    const response = await api.patch(
      `${API.UPDATE_APPOINTMENT}${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating appointment", error.message);
    return 0;
  }
};

export const listEmployeeAppointments = async (id) => {
  try {
    const response = await api.get(`${API.LIST_EMPLOYEE_APPOINTMENTS}${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employee specific appointments", error);
    return [];
  }
};

export const listClientAppointments = async (id) => {
  try {
    const response = await api.get(`${API.LIST_CLIENT_APPOINTMENT}${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client specific appointments", error);
    return [];
  }
};
export const addNewClient = async (clientData) => {
  try {
    const response = await api.post(API.ADD_CLIENT, clientData);
    return response.data;
  } catch (error) {
    console.error("Error adding new client", error.message);
    return 0;
  }
};

// export const listAllClients = async () => {
//   try {
//     const response = await api.get(API.LIST_ALL_CLIENTS);
//     return response.data;
//   } catch (error) {
//     console.log("Error fetching clients", error.message);
//     return [];
//   }
// };

export const listAllClients = async (params = {}) => {
  try {
    const response = await api.get(API.LIST_ALL_CLIENTS, {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
    return {
      data: response.data.data || response.data, // Handle both paginated and non-paginated responses
      pagination: response.data.pagination,
      success: true,
    };
  } catch (error) {
    console.log("Error fetching clients", error.message);
    return {
      data: [],
      success: false,
      error: error.message,
    };
  }
};

export const fetchClientDetailsByClientId = async (id) => {
  try {
    const response = await api.get(`${API.LIST_CLIENT_DETAIL_BY_NAME}${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client details", error.message);
    return null;
  }
};

export const deleteClientById = async (clientId) => {
  try {
    const response = await api.patch(`${API.DELETE_CLIENT_BY_ID}${clientId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting client", error.message);
    return 0;
  }
};

export const getClientCount = async () => {
  try {
    const response = await api.get(API.GET_CLIENT_COUNT);
    return response.data.count;
  } catch (error) {
    console.error("Error fetching client count", error.message);
    return null;
  }
};

export const updateClient = async (clientId, updateData) => {
  try {
    const response = await api.patch(
      `${API.UPDATE_CLIENT}${clientId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating client", error.message);
    return 0;
  }
};

// Stocks api

export const addStock = async (stockDetails) => {
  try {
    const response = await api.post(API.ADD_STOCK, stockDetails);
    return response.data;
  } catch (error) {
    console.error("Error adding stock", error.message);
    return null;
  }
};

export const listStocks = async ({ page, limit, brandId } = {}) => {
  try {
    // If no pagination is needed, don't send pagination params
    const params = {
      ...(page && limit && { page, limit }),
      ...(brandId && { brandId }), // Add brandId if provided
    };
    const response = await api.get(API.LIST_STOCKS, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching stocks", error.message);
    return {
      data: [],
      ...(page &&
        limit && {
          pagination: {
            total: 0,
            page,
            limit,
            totalPages: 0,
          },
        }),
    };
  }
};

export const getProductCount = async () => {
  try {
    const response = await api.get(API.STOCK_COUNT);
    console.log("respomse in stock count api", response);
    return response.data;
  } catch (error) {
    console.log("Error fetching stock count", error);
    return 0;
  }
};

export const getAppointmentStats = async () => {
  try {
    const response = await api.get(API.APPOINTMENT_STATS);
    return response.data;
  } catch (error) {
    console.log("Error fetching appointment stats", error);
    return 0;
  }
};

export const listProductById = async (id) => {
  try {
    const response = await api.get(`${API.GET_STOCK_BY_ID}/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching particular stock");
    return [];
  }
};

export const deleteStockById = async (stockId) => {
  try {
    const response = await api.patch(`${API.DELETE_STOCK_BY_ID}${stockId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting stock", error.message);
    return [];
  }
};

export const updateProduct = async (id, updateData) => {
  try {
    const response = await api.patch(`${API.UPDATE_PRODUCT}${id}`, updateData);
    return response.data;
  } catch (error) {
    console.log("Error updating product", error);
    return [];
  }
};

// ------------------------------------------------------------------------ //

//Brands api

export const addNewBrand = async (brandData) => {
  try {
    const response = await api.post(API.ADD_BRAND, brandData);
    return response.data;
  } catch (error) {
    console.error("Error adding brand", error.message);
    return null;
  }
};

export const listBrands = async ({ page, limit } = {}) => {
  try {
    const params = page && limit ? { page, limit } : {};

    const response = await api.get(API.LIST_BRANDS, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching brands", error.message);
    return {
      data: [],
      ...(page &&
        limit && {
          pagination: {
            total: 0,
            page,
            limit,
            totalPages: 0,
          },
        }),
    };
  }
};

export const softDeleteBrand = async (brandId) => {
  try {
    const response = await api.patch(`${API.DELETE_BRAND}${brandId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting brand", error.message);
    return null;
  }
};

// List suppliers api

export const addSupplier = async (supplierData) => {
  try {
    const response = await api.post(API.ADD_SUPPLIER, supplierData);
    return response.data;
  } catch (error) {
    console.error("Error adding supplier", error.message);
    return null;
  }
};

// export const listSuppliers = async () => {
//   try {
//     const response = await api.get(API.LIST_SUPPLIERS);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching suppliers", error.message);
//     return null;
//   }
// };

export const listSuppliers = async ({ page, limit } = {}) => {
  try {
    // If no pagination is needed, don't send pagination params
    const params = page && limit ? { page, limit } : {};

    const response = await api.get(API.LIST_SUPPLIERS, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching suppliers", error.message);
    return {
      data: [],
      pagination: {
        total: 0,
        page: page || 1,
        limit: limit || 10,
        totalPages: 0,
      },
    };
  }
};

export const listBrandBasedSuppliers = async (brandId) => {
  try {
    const response = await api.get(
      `${API.LIST_BRAND_BASED_SUPPLIERS}${brandId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching suppliers", error.message);
    return null;
  }
};

export const softDeleteSupplier = async (supplierId) => {
  try {
    const response = await api.patch(`${API.DELETE_SUPPLIER}${supplierId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting supplier", error.message);
    return null;
  }
};

// ------------------------------------------------------------------ //

export const addOffers = async (offerData) => {
  try {
    const response = await api.post(API.ADD_OFFER, offerData);
    return response.data;
  } catch (error) {
    console.error("Error adding offer", error);
    return null;
  }
};

export const listOffers = async () => {
  try {
    const response = await api.get(API.LIST_OFFERS);
    return response.data;
  } catch (error) {
    console.error("Error fetching offers");
    return null;
  }
};

export const deleteOffer = async (id) => {
  try {
    const response = await api.patch(`${API.DELETE_OFFER_BY_ID}${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting offer", error.message);
    return null;
  }
};

export const updateOffer = async (id, updateData) => {
  try {
    const response = await api.patch(`${API.UPDATE_OFFER}${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating offer", error.message);
    return null;
  }
};

export const addOrder = async (orderData) => {
  try {
    const response = await api.post(API.ADD_ORDER, orderData);
    return response.data;
  } catch (error) {
    console.error("Error adding order", error);
    return null;
  }
};

// export const listOrders = async (status) => {
//   try {
//     const response = await api.get(API.LIST_ORDERS, { params: { status } });
//     return response.data;
//   } catch (error) {
//     console.error("Error listing orders", error);
//     return null;
//   }
// };

export const listOrders = async (params = {}) => {
  try {
    const response = await api.get(API.LIST_ORDERS, { params });

    return {
      data: response.data.data || response.data,
      pagination: response.data.pagination,
      success: true,
    };
  } catch (error) {
    console.error("Error listing orders", error.message);
    return {
      data: [],
      success: false,
      error: error.message,
    };
  }
};

export const fetchOrderDetails = async (id) => {
  try {
    const response = await api.get(`${API.GET_ORDER}${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching order details", error);
    return null;
  }
};

export const cancelOrder = async (id) => {
  try {
    const response = await api.put(`${API.CANCEL_ORDER}${id}`);
    return response.data;
  } catch (error) {
    console.error("Error cancelling order", error);
    return null;
  }
};
/**
 * Creates or updates a draft order.
 * @param {Object} orderData - The order data to be added or updated as a draft.
 * @returns {Promise<Object>} - The created or updated draft order response.
 */
export const createOrUpdateDraftOrder = async (orderData) => {
  try {
    const response = await api.post(API.ADD_TO_DRAFT, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating/updating draft order:", error);
    throw error; // Re-throwing to allow further handling by calling functions
  }
};

export const listNotifications = async (readStatus) => {
  try {
    const url =
      API.LIST_NOTIFICATIONS +
      (readStatus !== undefined
        ? `?${FIELD_NAMES.READ_STATUS}=${readStatus}`
        : "");

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.log("Error listing notifications", error);
    return null;
  }
};

export const updateReadStatus = async (ids) => {
  try {
    const response = await api.patch(API.UPDATE_READ_STATUS, {
      notificationIds: ids,
    });
    return response.data;
  } catch (error) {
    console.log("Error updating read status", error);
    return null;
  }
};

//  Stripe
export const createPaymentIntent = async (paymentMethod, items) => {
  try {
    // Ensure items is an array
    const itemsArray = Array.isArray(items) ? items : [items];

    // Call the backend to create a payment intent
    const response = await api.post(API.PAYMENT_INTENT, {
      items: itemsArray,
    });

    // Return the client_secret from the backend
    return response.data.clientSecret;
  } catch (error) {
    console.error("Error creating payment intent", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Finalize order by payment
export const finalizeOrder = async (orderId) => {
  console.log("orderid in api", orderId);
  try {
    // Replace :id in the API constant with the actual orderId
    const endpoint = API.FINALIZE_ORDER.replace(":id", orderId);
    const response = await api.patch(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error finalizing order:", error);
    throw error;
  }
};

/**
 * Uploads an image to the server
 * @param {File} imageFile - The image file to upload
 * @returns {Promise} - A promise that resolves to the server response
 */
export const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile, imageFile.name); // Add the file name

    console.log("Uploading file:", imageFile);

    const response = await api.post(API.IMAGE_UPLOAD, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure this header is set
      },
    });

    console.log("Upload Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Detailed Error uploading image:", error);
    throw error;
  }
};

export const listModules = async (roleId = null) => {
  try {
    // Build the URL with the optional roleId
    const url = roleId
      ? `${API.LIST_MODULES}?roleId=${roleId}`
      : API.LIST_MODULES;

    // Make the GET request to the backend
    const response = await api.get(url);

    // Return the modules data from the response
    return response.data;
  } catch (error) {
    console.error("Error fetching modules:", error.message);
    return [];
  }
};

export const createRole = async (roleData) => {
  try {
    const response = await api.post(API.CREATE_ROLE, roleData);
    return response.data;
  } catch (error) {
    console.log("Error adding role", error);
    return [];
  }
};

export const trashRole = async (roleId) => {
  try {
    const response = await api.patch(API.TRASH_ROLE.replace(":roleId", roleId));
    return response.data;
  } catch (error) {
    console.log("Error deleting role", error);
    return [];
  }
};

export const fetchRoles = async () => {
  try {
    const response = await api.get(API.GET_ROLES);
    return response.data;
  } catch (error) {
    console.log("Error fetching roles");
    return [];
  }
};

export const fetchRolesForDropdown = async () => {
  try {
    const response = await api.get(API.GET_ROLES_FOR_DROPDOWN);
    return response.data;
  } catch (error) {
    console.log("Error fetching roles for dropdown");
    return [];
  }
};

export const checkIfSuperAdmin = async (email) => {
  try {
    const response = await api.get(API.CHECK_SUPER_ADMIN, {
      params: { email },
    });

    // Return the result from the backend (true/false)
    return response.data.isSuperAdmin;
  } catch (error) {
    console.error("Error checking super admin status:", error);
    throw new Error("Failed to check super admin status");
  }
};

export const fetchRolePermissions = async (roleId, filter) => {
  try {
    // Construct query params dynamically
    let queryParams = "";

    // Apply filters if passed
    if (filter) {
      queryParams = `?showCanViewModules=true`; // Assuming you want to show modules with "canView" permission only
      if (filter.showCanEditModules) {
        queryParams += "&showCanEditModules=true"; // Add other filters if needed
      }
    }

    const response = await api.get(
      `${API.ROLE_PERMISSIONS.replace("{roleId}", roleId)}${queryParams}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching role permissions:", error);
    throw error;
  }
};

// Update role permissions
export const updateRolePermissions = async (roleId, permissions) => {
  try {
    const response = await api.patch(
      API.ROLE_PERMISSIONS.replace("{roleId}", roleId),
      permissions
    );
    return response.data;
  } catch (error) {
    console.error("Error updating role permissions:", error);
    throw error;
  }
};

export const trashUser = async (id) => {
  try {
    const response = await api.patch(`${API.DELETE_USER}${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting user", error);
    return 0;
  }
};

export const addCategory = async (categoryData) => {
  try {
    const response = await api.post(API.ADD_CATEGORY, categoryData);
    return response.data;
  } catch (error) {
    console.log("Error adding category", error);
    return 0;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get(API.GET_CATEGORIES);
    console.log("response in categ", response);
    return response.data;
  } catch (error) {
    console.log("Error getting categories", error);
    return 0;
  }
};

export const toggleCategoryStatus = async (id) => {
  try {
    const response = await api.patch(`${API.TOGGLE_CATEGORY_STATUS}${id}`);
    return response.data;
  } catch (error) {
    console.log("Error toggling category status", error);
    return 0;
  }
};

export const listReviews = async (params = {}) => {
  try {
    const response = await api.get(API.LIST_REVIEWS, { params });
    return {
      success: response.data.success,
      reviews: response.data.reviews || [], // Match the backend's 'reviews' key
      count: response.data.count,
      pagination: response.data.pagination || {
        total: response.data.count || 0,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    };
  } catch (error) {
    console.error("Error fetching reviews", error.message);
    return {
      success: false,
      reviews: [],
      count: 0,
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
      error: error.message,
    };
  }
};

export const handleReplySubmit = async (reviewId, replyMessage) => {
  try {
    const response = await api.patch(
      `${API.ADD_REPLY.replace(":reviewId", reviewId)}`,
      {
        replyMessage,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to add reply:", error.message);
  }
};

export const handleReplyUpdate = async (
  reviewId,
  replyId,
  updatedReplyMessage
) => {
  try {
    const response = await api.patch(
      `${API.UPDATE_REPLY.replace(":reviewId", reviewId).replace(":replyId", replyId)}`,
      {
        replyMessage: updatedReplyMessage,
      }
    );

    return response.data;
    // Optionally update UI or state after successful reply update
  } catch (error) {
    console.error("Failed to update reply:", error.message);
  }
};

export const listPayments = async (page = 1, limit = 10) => {
  try {
    // Make the GET request with pagination parameters
    const response = await api.get(API.LIST_PAYMENTS, {
      params: { page, limit },
    });
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error listing payments", error);
    return error; // Return the error if the request fails
  }
};

export const fetchRevenueStats = async (duration) => {
  try {
    const response = await api.get(API.REVENUE, {
      params: { duration },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching revenue stats:", error);
    return { duration, totalRevenue: 0 };
  }
};

export const updateRole = async (roleId, roleName) => {
  try {
    const response = await api.patch(
      API.UPDATE_ROLE.replace(":roleId", roleId),
      {
        roleName,
      }
    );

    console.log("respone in update role", response);
    return response.data;
  } catch (error) {
    console.error("Error updating role:", error.message);
    return { success: false, message: error.message };
  }
};
