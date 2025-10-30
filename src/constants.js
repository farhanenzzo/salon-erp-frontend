export const BASE_URL = "/api";

export const TABHEADER = {
  ALL_APPOINTMENTS: "All Appointments",
  ALL_EMPLOYEES: "All employees",
  All_OFFERS: "All Offers",
  CUSTOMER_REVIEWS: "Customer Reviews",
  CATEGORIES: "Categories",
  SERVICE_LIST: "Service list",
  GALLERY: "Gallery",
  ALL_CUSTOMERS: "All customers",
  ALL_PRODUCTS: "All Products",
  ALL_BRANDS: "All Brands",
  ALL_SUPPLIERS: "All Suppliers",
  ALL_ORDERS: "All Orders",
  USERS: "Users",
  ROLES: "Roles",
  TRANSACTIONS: "Transactions",
  MASTERS: "masters",
  PRODUCTS: "Products",
  PRODUCT_DETAILS: "Product Details",
};

export const DATE_FORMAT = "yyyy-MM-dd";
export const TIME_FORMAT = "HH:mm";
export const DATE_AND_TIME_FORMAT = "yyyy-MM-dd HH:mm a";
export const NO_REVIEWS_YET = "No reviews yet";

export const DEFAULT_PROFILE_IMAGE_URL =
  "https://i.ibb.co/LPxR7gw/blank-profile-picture-973460-1280.png";

export const SIGNUP_SCREEN = {
  CREATE_COMPANY_LABEL: "Create Company",
  CREATE_ADMIN_LABEL: "Create Admin",
  LOGIN_ROUTE: "/auth/Login",
};

export const NEW_USER = "This user hasn't visited yet";
export const NO_REVIEWS = "No reviews yet";
export const REVENUE = "Revenue";
export const NO_DATA_TO_DISPLAY = "No data to display";
export const APPOINTMENT_STATUS = "Appointment Status";
export const EMPLOYEES = "Employees";
export const GENDER = "Gender";

export const DASH_HEADER = {
  USER_ADMIN: "Admin",
};

export const HEADER_KEYMAP = {
  PROFILE_PICTURE: "userProfile",
  NAME: "name",
  EMAIL: "email",
  PHONE: "phoneNumber",
};

export const BRAND_KEYMAP = {
  NAME: "name",
  SUPPLIERS: "suppliers",
  DESCRIPTION: "description",
};

export const ROLE_KEYMAP = { ROLE_NAME: "roleName" };

export const ADD_STOCK_KEYMAP = {
  PRODUCT_BRAND: "productBrand",
  PRODUCT_NAME: "prodcutName",
  CATEGORY: "category",
  QUANTITY: "quantity",
  PRICE: "price",
};

export const SUPPLIER_KEYMAP = {
  NAME: "name",
  BRANDS: "brands",
  MOBILE: "mobile",
  ADDRESS: "address",
};

export const HEADER_TOAST = {
  SUCCESS_SIGNOUT: "Successfully signed out",
  ERROR_SIGNOUT: "Error signing out",
  ERROR_CLEARING_COOKIE: "Error clearing session cookies",
};

export const DASHBOARD_HEADING = {
  UPCOMING_APPOINTMENTS: "Upcoming Appointments",
};

export const TAB_VIEW = {
  LIST_VIEW: "List",
};

export const PAGE_HEADING = {
  DELETE_ACCOUNT: "Delete Account",
};

export const COMPANY_ID = "companyId";

export const ROUTES = {
  LOGIN: "/auth/login",
  OTPVERIFY: "/auth/otpVerification",
  FORGOT_PASSWORD: "/auth/forgotPassword",
  RESET_PASSWORD: "/auth/resetPassword",
  EMAIL_VERIFY_ROUTE: "/auth/verifyEmail",
  SUCCESS_PASS_RESET: "/auth/resetSuccess",
  SIGNUP_SUPER_ADMIN: "/auth/signUpSuperAdmin",
  SIGNUP: "/auth/signUp",
  DASHBOARD: "/dashboard",
  APPOINTMENTS: "/appointments",
  EMPLOYEES: "/employees",
  GALLERY: "/gallery",
  CLIENTS: "/clients",
  OFFERS: "/offers",
  SERVICES: "/services",
  REVIEWS: "/reviews",
  SUPPLIERS: "/suppliers",
  BRANDS: "/brands",
  STOCK: "/stock",
  ORDER: "/order",
  SETTINGS: "/settings",
  ADD_ORDER: "/order/add",
  CATEGORY: "/settings/masters/category",
  ROLE: "/settings/masters/role",
  PRODUCTS: "products",
};

export const PAGE_PARA = {
  DELETE_ACCOUNT: "Are you sure you want to delete your account?",
  ONCE_YOU_DELETE:
    "Once you delete your account, there is no going back. Please be certain.",
  CONFIRM_DEACTIVATION: "I confirm my account deactivation",
};

export const USER_ROLES = {
  SUPER_ADMIN: "superAdmin",
  ADMIN: "Admin",
};
export const LOGIN_SCREEN = {
  LOGIN_TO_ACCOUNT: "Login to your account",
  FORGOT_PASSWORD: "Forgot Password?",
  SUCCESS_SIGNIN_TOAST: "Successfully Signed In",
  VERIFY_EMAIL_TOAST: "Please verify your email before logging in.",
  ROUTE_TO_DASHBOARD: "/dashboard",
  SIGNIN_FAILED_TOAST: "Sign In Failed",
  LOGIN_LABEL: "Login",
  LOGIN_SCREEN_ROUTE: "/auth/login",
};

export const TOAST_MESSAGES = {
  SIGNUP_SUCCESS:
    "Sign Up successful! Please check your email to verify your account.",
  SUPPLIER_ADDED: "Supplier added successfully",
  SESSION_EXPIRED: "Your session expired. Please log in again.",
  ERROR_ADDING_SUPPLIER: "Error adding new supplier",
  SUPPLIER_DELETED: "Supplier deleted successfully",
  ERROR_DELETING_SUPPLIER: "Error deleting supplier",
  NO_SUPPLIER_FOUND: "No supplier found",
  PRODUCT_ADDED_SUCCESSFULLY: "Product added successfully",
  ERROR_ADDING_PRODUCT: "Error adding product",
  STOCK_DELETED_SUCCESSFULLY: "Stock deleted successfully",
  ERROR_DELETING_STOCK: "Error deleting stock",
  INVALID_OTP: "Invalid OTP",

  ERROR_LISTING_STOCKS: "Error listing stocks",
  ERROR_FETCHING_SUPPLIERS: "Error fetching suppliers",
  ORDER_ADDED_SUCCESSFULLY: "Order added successfully",
  ERROR_ADDING_ORDER: "Error adding order",
  APPOINTMENT_CANCELLED: "Appointment Cancelled",
  APPOINTMENT_UPDATED_SUCCESSFULLY: "Appointment updated successfully",
  ERROR_UPDATING_APPOINTMENT: "Error updating appointment",
  APPOINTMENT_NOT_FOUND: "Appointment not found",
  CLIENT_NOT_FOUND: "Client not found",
  ERROR_FETCHING_BRANDS: "Error fetching brands",
  PRODUCT_ADDED_TO_ORDER: "Product added to order",
  ERROR_ADDING_PRODUCTS: "Error adding products",
  ERROR_NO_ITEMS: "No items found",
  OTP_VERIFIED: "OTP verified successfully",
  INVALID_OTP: "Invalid OTP",
  PASSWORD_RESET_SUCCESSFULL: "Password reset successfull.",
  FAILED_RESET_PASSWORD: "Failed to reset password.",
  COMPANY_CREATED_SUCCESSFULLY: "Company created successfully",
  ERROR_ADDING_COMPANY: "Error adding company",
  NO_MODULES_FOUND:
    "No modules found for this role, get permissions from admin",
  ERROR_FETCHING_MODULES: "Error fetching modules",
  ERROR_FETCHING_MODULES_OF_ROLE: "Error fetching modules of given role",
  ERROR_FETCHING_CATEGORIES: "Error fetching categories",
  ERROR_FETCHING_ROLES: "Error fetching roles",
  ERROR_ADDING_NEW_ROLE: "Error adding role",
  ROLE_ADDED_SUCCESSFULLY: "Role added successfully",
  ADD_ROLE_NAME: "Type in role name",
  PROFILE_UPDATES_SUCCESS: "Profile udpated successfully",
  PROFILE_UPDATES_FAILED: "Profile udpates failed",
  SUCCESS_DELETING_CATEGORY: "Category deleted successfully",
  ERROR_DELETING_CATEGORY: "Error deleting category",
  SELECT_CATEGORY: "Select a category first",
  SUCCESS_TOGGLE_CATEGORY_STATUS: "Category status updated successfully",
  ERROR_TOGGLE_CATEGORY_STATUS: "Error updating category status",
  FILL_ALL_FIELDS: "Please fill required fields",
  PRODUCT_UPDATED_SUCCESSFULLY: "Product updated successfully",
  ERROR_UPDATING_PRODUCTS: "error updating products",
  ERROR_FETCHING_REVIEWS: "Error fetching reviews",
  REPLY_SUBMITTED: "Reply submitted successfully!",
  ERROR_SUBMITTING_REVIEWS: "Failed to submit the reply. Please try again.",
  REPLY_CANNOT_BE_EMPTY: "Reply cannot be empty!",
  REPLY_UPDATED: "Reply updated successfully!",
  ERROR_UPDATING_REPLY: "Reply updation failed",
  ERROR_FETCHING_TRANSACTIONS: "Error fetching transactions",
  ERROR_UPDATING_ROLE: "Error updating role",
  ROLE_UPDATED: "Role updated successfully",
  UPDATED_CATEGORY: "Category udpated successfully",
  ERROR_UPDATING_CATEGORY: "Error updating category: ",
  USER_DELETED_SUCCESSFULLY: "User deleted successufully",
  ERROR_DELETING_USER: "Error deleting user",
  ERROR_CREATING_USER: "Error creating user",
  USER_CREATED_SUCCESSFULLY: "User created successfully",
  CLIENT_ADDED_SUCCESSFULLY: "Client added successfully",
  ERROR_ADDING_CLIENT: "Error adding client",
  CATEGORY_DATA_CANNOT_BE_NULL: "Category data cannot be null",
  ROLE_DELETED: "Role deleted successfully",
  ERROR_DELETING_ROLE: "Error deleting role",
  CATEGORY_DATA_CANNOT_NE_NULL: "Category data cannot be null",
};

export const CURRENCY = "$";

export const LOCAL_STORAGE = {
  VERIFICATION_EMAIL: "verificationEmail",
};

export const ORDER_SCREEN = {
  ORDER_TAB_HEADING: "Orders",
  ADD_PRODUCT: "Add Product",
  ORDER_LIST: "Order List",
};

export const DETAIL_SIDEBAR_HEADING = {
  LOW_STOCK: "Low Stock ",
  EXPIRED_ITEMS: "Expired Items",
};

export const FIELD_NAMES = {
  CLIENT: "Client",
  DATE: "Date",
  READ_STATUS: "readStatus",
  PRODUCT_BRAND: "productBrand",
  PRODUCT_NAME: "productName",
  QUANTITY: "quantity",
};

export const NOTIFICATIONS_POPUP = {
  NOTIFICATIONS: "Notifications",
};

export const IMG_ALT = {
  GO_BACK_BUTTON: "go back button",
  CLOSE_BUTTON: "Close Button",
  UPCOMING_APPOINTMENT_ICON: "Upcoming  Appointment icon",
  CANCELLED_APPOINTMENT_ICON: "Cancelled  Appointment icon",
  STAFF_ICON: " staff icon",
  SERVICE_ICON: " service icon",
  CLOSE: "Close",
  HERO_IMG: "heroIMG",
  LOGO: "Logo",
  HEADER_DROPDOWN_ARROW: "header arrow",
  FILE_UPLOAD: "file upload",
  PROFILE_IMG: "profile image",
  DETAIL_IMG: "details image",
  NOTIFICATIONS: "notification",
  PRODUCT_IMAGE: "product image",
  REVIEW_IMAGE: "review image",
};

export const DETAIL_SIDEBAR_BUTTON_LABEL = {
  REMOVE: "Remove",
  RE_ORDER: "Reorder",
};

export const HEADER_DROPDOWN_OPTIONS = {
  PROFILE_SETTINGS: "Profile Settings",
  PROFILE_SETTINGS_ICON: "pi pi-cog",
  LOGOUT: "Logout",
  LOGOUT_ICON: "pi pi-sign-out",
};

export const NOTIFICATION_HEADS = {
  NEW_APPOINTMENTS: "New Appointments",
  CANCELLED_APPOINTMENTS: "Cancelled Appointments",
  NEW_STAFFS: "New Staffs",
  NEW_SERVICE_ADDED: "New Service Added",
};

export const PAYMENT_METHODS = {
  CREDIT_OR_DEBIT_CARD: "Pay with Credit or Debit Card",
  CREDIT_CARD: "Credit Card",
  PAYPAL: "PayPal",
  BANK_TRANSFER: "Bank Transfer",
};

export const MODAL_TITLES = {
  ADD_OFFER: "Add Offer",
  EDIT_SERVICE: "Edit Service",
  EDIT_APPOINTMENT: "Edit Appointment",
  ADD_NEW_APPOINTMENT: "Add New Appointment",
  ADD_NEW_SERVICE: "Add New Service",
  EDIT_OFFER: "Edit Offer",
  ADD_NEW_CUSTOMER: "Add new customer",
  EDIT_CUSTOMER_DETAILS: "Edit customer details",
  ADD_NEW_PRODUCT: "Add New product",
  PROFILE_SETTINGS: "Profile Settings",
  ADD_BRAND: "Add New Brand",
  ADD_NEW_SUPPLIER: "Add New Supplier",
  ADD_NEW_EMPLOYEE: "Add New Employee",
  EDIT_EMPLOYEE: "Edit Employee",
  BOOK_APPOINTMENT: "Book Appointment",
  ADD_ORDER: "Add New Order",
  CONFIRM_PAYMENT: "Confirm Payment",
  ADD_USER: "Add new user",
  ADD_NEW_ROLE: " Add new role",
  ADD_NEW_CATEGORY: "Add New Category",
  ADD_NEW_ROLE: "Add New Role",
  EDIT_PRODUCT: "edit product",
  CONFIRM_LOGOUT: "Confirm Logout",
  EDIT_ROLE: "Edit role",
  EDIT_CATEGORY: "Edit category",
};

export const LOGOUT = "logout";

export const IMAGE_UPLOAD_FIELDS = {
  CATEGORY_IMAGE: "image",
  OFFER_IMAGE: "image",
  PROFILE_PICTURE: "userProfile",
  SERVICE_IMAGE: "image",
};

export const DASHBOARD_COUNT_TITLES = {
  APPOINTMENTS: "Appointments",
  CUSTOMERS: "Customers",
  SERVICES: "Services",
  PRODUCTS: "Products",
};

export const DETAIL_PAGE_TITLES = {
  APPOINTMENT_DETAILS: "Appointments Details",
  SERVICE_DETAILS: "Service Details",
  OFFER_DETAILS: "Offer Details",
};

export const PRODUCT_DETAILS_TITLES = {
  CUSTOMER_REVIEWS: "Customer Reviews",
  DESCRIPTION: "Description",
  STOCK_STATUS: "Stock status",
  QUANTITY: "Quantity",
  PRICE: "Price",
  EXP_DATE: "EXP Date",
  MFG_DATE: "MFG Date",
  CATEGORY: "Category",
  PRODUCT_NAME: "Product Name",
  NO_DESRIPTION: "No description available",
  NO_REVIEWS_YET: "No reviews yet",
};

export const DELETE_MODAL_TITLE = {
  CONFIRM_DELETE: "Confirm Delete",
  DELETE_OFFER: "Delete Offer",
  DELETE_SERVICE: "Delete Service",
  DELETE_PRODUCT: "Delete product",
  DELETE_SUPPLIER: "Delete Supplier",
  DELETE_USER: "Delete user",
};

export const CONFIRM_TEXT = {
  USER: "User",
};

export const ACTION_MENU_ALT = {
  ACTION_MENU: "Action Menu",
};

export const BUTTON_LABELS = {
  ADD_NEW: "Add New",
  ADD_TO_ORDER: "Add To Order",
  NEXT: "Next",
  CANCEL: "Cancel",
  PAY_NOW: "Pay Now",
  GOTO_LOGIN: "Go to Login",
  SAVE: "Save",
  BOOK_APPOINTMENT: "Book Appointment",
  LOADING: "Loading..",
  CONTINUE: "Continue",
  NEW_PASSWORD: "New Password",
  CONFIRM_PASSWORD: "Confirm Password",
  RESET: "Reset",
};

export const BUTTON_TYPE = {
  SUBMIT: "Submit",
  BUTTON: "button",
};

export const CARD_INPUT_IDS = {
  NUMBER: "cardNumber",
  EXPIRY: "cardExpiry",
  CVC: "cardCvc",
};

export const NOTIFICATION_FIELD_NAMES = {
  NEW_SERVICE_ADDED: "New Service Added",
  NEW_STAFF_ADDED: "New Staff Added",
};

export const PLACEHOLDERS = {
  LOADING: "Loading...",
  SELECT_COUNTRY: "Select Country",
  SELECT_CITY: "Select City",
  CVV: "CVV",
  ENTER_EMAIL: "Enter your email",
  ENTER_PASSWORD: "Enter passord",
  RE_ENTER_PASSWORD: "Re-enter passord",
};

export const ORDER_STATUS = {
  DRAFT: "draft",
  COMPLETED: "completed",
};

export const SETTINGS_TAB = {
  SETTINGS: "Settings",
  GENERAL_SETTINGS_KEYMAP_PHOTO: "photoURL",
  DELETE_ACCOUNT_LABEL: "Delete Account",
  FIELD_BUSINESS_HOURS: "businessHours",
};

export const INPUT_LABELS = {
  EMAIL: "Email",
};

export const INPUT_TYPE = {
  TEXT: "text",
  PASSWORD: "password",
};

export const COMPANY_KEYMAP = {
  NAME: "name",
  COUNTRY: "country",
  CITY: "city",
  ADDRESS: "address",
};

export const APPOINTMENT_STATUSES = {
  UPCOMING: "Upcoming",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const API = {
  ADD_COMPANY: "/company",
  COMPANY_DETAILS: "/company",
  UPDATE_COMPANY: "/company",
  SIGN_UP: "/auth/signup",
  LOGIN_USER: "/auth/login",
  GET_USER_DETAILS: "/auth/user/",
  LOGOUT_USER: "/auth/logout",
  SET_TOKEN: "/auth/set-token",
  CREATE_USER: "/auth/users",
  GET_USERS: "/auth/users",
  DELETE_USER: "/auth/user/trash/",
  SEND_OTP: "/otp",
  VERIFY_OTP: "/otp/verify",
  UPDATE_PASSWORD: "/auth/update-password",
  ADD_APPOINTMENT: "/appointments",
  FETCH_APPOINTMENT_COUNT: "/appointments/count",
  APPOINTMENT_STATS: "/appointments/stats",
  FETCH_APPOINTMENT_COUNT_BY_GENDER: "/appointments/count/gender",
  LIST_APPOINTMENTS: "/appointments",
  DELETE_APPOINTMENT: "/appointments/soft-delete/",
  LIST_UPCOMING_APPOINTMENTS: "/appointments/upcoming",
  ADD_SERVICE: "/services",
  LIST_SERVICES: "/services",
  GET_SERVICES_COUNT: "/services/count",
  REMOVE_SERVICE: "/services/soft-delete/",
  UPDATE_SERVICE: "/services/",
  ADD_EMPLOYEE: "/employees",
  LIST_EMPLOYEES: "/employees",
  LIST_SERVICE_BASED_EMPLOYEES: "/employees/service",
  DELETE_EMPLOYEE: "/employees/soft-delete/",
  UPDATE_EMPLOYEE: "/employees/",
  UPDATE_APPOINTMENT: "/appointments/",
  LIST_EMPLOYEE_APPOINTMENTS: "/appointments/employee/",
  LIST_CLIENT_APPOINTMENT: "/appointments/client/",
  ADD_CLIENT: "/clients",
  LIST_ALL_CLIENTS: "/clients",
  LIST_CLIENT_DETAIL_BY_NAME: "/clients/",
  DELETE_CLIENT_BY_ID: "/clients/soft-delete/",
  GET_CLIENT_COUNT: "/clients/count",
  UPDATE_CLIENT: "/clients/",
  ADD_STOCK: "/stocks",
  LIST_STOCKS: "/stocks",
  LIST_LOW_STOCK: "/stocks/low",
  STOCK_COUNT: "/stocks/count",
  GET_STOCK_BY_ID: "/stocks/",
  LIST_EXPIRED_STOCK: "/stocks/expired",
  DELETE_STOCK_BY_ID: "/stocks/soft-delete/",
  UPDATE_PRODUCT: "/stocks/",
  ADD_SUPPLIER: "/suppliers",
  LIST_SUPPLIERS: "/suppliers",
  DELETE_SUPPLIER: "/suppliers/soft-delete/",
  ADD_BRAND: "/brands",
  LIST_BRANDS: "/brands",
  DELETE_BRAND: "/brands/soft-delete/",
  LIST_BRAND_BASED_SUPPLIERS: "/suppliers/brand/",
  ADD_OFFER: "/offers",
  LIST_OFFERS: "/offers",
  DELETE_OFFER_BY_ID: "/offers/soft-delete/",
  UPDATE_OFFER: "/offers/",
  ADD_ORDER: "/order",
  ADD_TO_DRAFT: "/order/draft",
  LIST_ORDERS: "/order",
  GET_ORDER: "/order/",
  LIST_NOTIFICATIONS: "/notifications",
  UPDATE_READ_STATUS: "/notifications/read",
  PAYMENT_INTENT: "/payment/create-payment-intent",
  FINALIZE_ORDER: "/order/:id/paid",
  IMAGE_UPLOAD: "/image",
  LIST_MODULES: "/modules",
  CREATE_ROLE: "/roles",
  GET_ROLES: "/roles",
  UPDATE_ROLE: "/roles/:roleId",
  TRASH_ROLE: "/roles/:roleId/trash",
  GET_ROLES_FOR_DROPDOWN: "/roles/dropdown",
  CHECK_SUPER_ADMIN: "/auth/check-super-admin",
  ROLE_PERMISSIONS: "/roles/{roleId}/permissions",
  ADD_CATEGORY: "/categories",
  GET_CATEGORIES: "/categories",
  UPDATE_CATEGORY: "/categories/",
  ADD_CATEGORY_ONLY: "/categories/category-only",
  LIST_CATEGORY_DROPDOWN: "/categories/options",
  UPDATE_USER: "/auth/user/",
  SOFT_DELETE_CATEGORY: "/categories/soft-delete/",
  TOGGLE_CATEGORY_STATUS: "/categories/status/",
  LIST_REVIEWS: "/review",
  ADD_REPLY: "/review/:reviewId/reply",
  UPDATE_REPLY: "/review/:reviewId/replies/:replyId",
  CREATE_PAYMENT: "/create-payment",
  LIST_PAYMENTS: "/payment/list-payments",
  REVENUE: "/revenue",
};
