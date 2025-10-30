// Static data
import UsernameIcon from "../assets/svg/usernameIcon.svg";
import EmailIcon from "../assets/svg/modalEmailIcon.svg";
import PasswordIcon from "../assets/svg/lockIcon.svg";
import PasswordHideIcon from "../assets/svg/passwordHideIcon.svg";
import DollarIcon from "../assets/svg/dollarIcon.svg";

export const loginInputData = [
  {
    id: 1,
    icon: EmailIcon,
    title: "Email",
    inputType: "text",
    placeholder: "Enter your email",
  },
  {
    id: 2,
    icon: PasswordIcon,
    title: "Password",
    endIcon: PasswordHideIcon,
    inputType: "password",
    placeholder: "Enter your password",
  },
];

export const signUpCompany = [
  {
    id: 1,
    title: "Salon Name",
    inputType: "text",
    key: "name",
    placeholder: "Enter salon name",
  },
  {
    id: 2,
    title: "Country",
    inputType: "dropdown",
    key: "country",
    placeholder: "Select country",
  },
  {
    id: 3,
    title: "City",
    inputType: "dropdown",
    key: "city",
    placeholder: "Select city",
  },
  {
    id: 4,
    title: "Address",
    inputType: "text",
    key: "address",
    placeholder: "Enter your address",
  },
];

export const singUpInputData = [
  {
    id: 1,
    icon: UsernameIcon,
    title: "Username",
    inputType: "text",
    placeholder: "Enter username",
  },
  {
    id: 2,
    icon: EmailIcon,
    title: "Email",
    inputType: "email",
    placeholder: "Enter email",
  },
  {
    id: 3,
    icon: PasswordIcon,
    title: "Password",
    endIcon: PasswordHideIcon,
    inputType: "password",
    placeholder: "Enter password",
  },
  {
    id: 4,
    icon: PasswordIcon,
    title: "Confirm Password",
    endIcon: PasswordHideIcon,
    inputType: "password",
    placeholder: "Confirm password",
  },
];

// --------------------------------------------------------------------- //

// Reset password input data

export const resetPassInputData = [
  { id: 1, label: "Password", type: "password" },
  { id: 2, label: "Confirm Password", type: "password" },
];

// ----------------------------------------------------------------- //

// Tabs
import DashboardIcon from "../components/dashboardIcon/DashboardIcon";
import AppointmentsIcon from "../components/appointmentsIcon/AppointmentsIcon";
import EmployesIcon from "../components/employeeIcon/EmployesIcon";
import GalleryIcon from "../components/galleryIcon/GalleryIcon";
import ClientsIcon from "../components/clientsIcon/ClientsIcon";
import OffersIcon from "../components/offersIcon/OffersIcon";
import ServiceIcon from "../components/servicesIcon/ServicesIcon";
import ReviewsIcon from "../components/reviewsIcon/ReviewsIcon";
import StockIcon from "../components/stocksIcon/StocksIcon";
import SettingsIcon from "../components/settingsIcon/SettingsIcon";
import LowStockIcon from "../assets/svg/low_stock.svg";
import ExpiredStockIcon from "../assets/svg/expired_stock.svg";
import ProductsIcon from "../components/productsIcon/ProductsIcon";
import TransactionsIcon from "../components/transactionsIcon/TransactionsIcon";

export const tabsData = [
  {
    id: 1,
    icon: <DashboardIcon />,
    tabName: "Dashboard",
    route: "/dashboard",
  },
  {
    id: 2,
    icon: <AppointmentsIcon />,
    tabName: "Appointments",
    route: "/appointments",
  },
  {
    id: 3,
    icon: <EmployesIcon />,
    tabName: "Employees",
    route: "/employees",
  },
  {
    id: 4,
    icon: <ClientsIcon />,
    tabName: "Customers",
    route: "/customers",
  },
  {
    id: 5,
    icon: <OffersIcon />,
    tabName: "Offers",
    route: "/offers",
  },
  {
    id: 6,
    icon: <ServiceIcon />,
    tabName: "Services",
    route: "/services",
  },
  {
    id: 7,
    icon: <TransactionsIcon />,
    tabName: "Transactions",
    route: "/transactions",
  },
  {
    id: 8,
    icon: <ReviewsIcon />,
    tabName: "Reviews",
    route: "/reviews",
  },
  { id: 9, icon: <ProductsIcon />, tabName: "Products", route: "/products" },
  {
    id: 10,
    icon: <SettingsIcon />,
    tabName: "Settings",
    route: "/settings/general",
  },
];

export const stockWarningButtons = [
  {
    id: 1,
    label: "Low Stock",
    icon: LowStockIcon,
    color: "#FF8C2E",
    bgColor: "#FFF4EB",
  },
  {
    id: 2,
    label: "Expired",
    icon: ExpiredStockIcon,
    color: "#E71C1C",
    bgColor: "#FFF0F0",
  },
];

// -----------------------------------------------------------------  //

// Dashboard tab data
import TotalClientsIcon from "../assets/images/Clients.png";
import Appointments from "../assets/images/Appointments.png";
import Services from "../assets/images/Service.png";
import Treatments from "../assets/images/Treatments.png";

export const dashboardDetailsSection = [
  { id: 1, icon: TotalClientsIcon, title: "Customers", count: 40 },
  { id: 2, icon: Appointments, title: "Appointments", count: 40 },
  { id: 3, icon: Services, title: "Services", count: 40 },
  { id: 4, icon: Treatments, title: "Products", count: 40 },
];

// -------------------------------------------------------------------------- //

// Select options timeframe

export const selectOptions = [
  { id: 1, label: "Month", value: "monthly" },
  { id: 2, label: "Week", value: "weekly" },
  { id: 3, label: "Day", value: "daily" },
];

// --------------------------------------------------------------------------------- //

// Appointment tab
export const appointmentTabData = [
  { id: 1, title: "ID", key: "appointmentId" },
  { id: 2, title: "Date", key: "date" },
  { id: 3, title: "Time", key: "time" },
  { id: 4, title: "Name", key: "clientName" },
  { id: 5, title: "Gender", key: "gender" },
  { id: 6, title: "Phone", key: "phoneNumber" },
  { id: 7, title: "Service", key: "service" },
  { id: 8, title: "Stylist", key: "stylistName" },
  { id: 9, title: "Status", key: "appointmentStatus" },
];

// Add new appointment modal data

import NameIcon from "../assets/svg/clientNameICON.svg";
import PhoneIcon from "../assets/svg/phIcon.svg";
import CalenderIcon from "../assets/svg/calendar.svg";
import TimeIcon from "../assets/svg/timer.svg";
import InputEmailIcon from "../assets/svg/modalEmailIcon.svg";

export const addNewAppointmentData = [
  {
    id: 1,
    label: "Customer ID",
    type: "search",
    key: "clientId",
    placeholder: "Search by customer ID",
  },
  {
    id: 2,
    label: "Client Name",
    icon: NameIcon,
    type: "text",
    key: "clientName",
    placeholder: "Enter name",
  },
  {
    id: 3,
    label: "Phone Number",
    icon: PhoneIcon,
    type: "text",
    key: "phoneNumber",
    placeholder: "Enter phone number",
  },
  {
    id: 4,
    label: "Email",
    icon: InputEmailIcon,
    type: "text",
    key: "email",
    placeholder: "Enter email",
  },
  {
    id: 5,
    label: "Date",
    icon: CalenderIcon,
    type: "date",
    key: "date",
    placeholder: "Select a date",
  },
  {
    id: 6,
    label: "Time",
    icon: TimeIcon,
    type: "time",
    key: "time",
    placeholder: "Select a time",
  },

  {
    id: 7,
    label: "Service",
    type: "dropdown",
    key: "service",
    placeholder: "Select service",
  },
  {
    id: 8,
    label: "Employee",
    type: "dropdown",
    key: "stylistId",
    placeholder: "Select an employee",
  },
  {
    id: 9,
    label: "Gender",
    type: "dropdown",
    options: ["Male", "Female", "Other"],
    key: "gender",
    placeholder: "Select gender",
  },
  {
    id: 10,
    label: "Notes",
    type: "textarea",
    key: "note",
    placeholder: "Enter notes",
  },
];

export const footerButtons = [
  {
    id: 1,
    label: "Cancel",
    borderClr: "#FF8C2E",
    bgColor: "white",
    textColor: "#FF8C2E",
    borderWidth: 1,
  },
  { id: 2, label: "Save", operation: null },
];

// ----------------------------------------------------------------------- //

// Employee tab data
export const employeeTabData = [
  { id: 1, title: "ID", key: "employeeId" },
  { id: 2, title: "Name", key: "employeeName" },
  { id: 3, title: "Gender", key: "employeeGender" },
  { id: 4, title: "Role", key: "roleName" },
  { id: 5, title: "Phone", key: "employeePhone" },
  { id: 6, title: "Email", key: "employeeEmail" },
  { id: 7, title: "Joining Date", key: "employeeJoiningData" },
  { id: 8, title: "Status", key: "employeeStatus" },
];

export const addEmployeeModalData = [
  {
    id: 1,
    label: "Name",
    icon: NameIcon,
    key: "employeeName",
    type: "text",
    placeholder: "Enter name",
  },
  {
    id: 2,
    label: "Email",
    icon: InputEmailIcon,
    key: "employeeEmail",
    type: "text",
    placeholder: "Enter email",
  },
  {
    id: 3,
    label: "Role",
    icon: NameIcon,
    key: "employeeRole",
    type: "dropdown",
    placeholder: "Select role",
  },
  {
    id: 4,
    label: "Phone",
    icon: PhoneIcon,
    key: "employeePhone",
    type: "number",
    placeholder: "Enter phone number",
  },
  {
    id: 5,
    label: "Photo",
    icon: NameIcon,
    key: "employeePhoto",
    type: "file",
    placeholder: "Upload photo",
  },
  {
    id: 6,
    label: "Joining Date",
    icon: CalenderIcon,
    key: "employeeJoiningData",
    type: "date",
    placeholder: "Select joining date",
  },
  {
    id: 7,
    label: "Salary",
    icon: DollarIcon,
    key: "employeeSalary",
    type: "number",
    placeholder: "Enter salary in dollars",
  },
  {
    id: 8,
    label: "Address",
    icon: NameIcon,
    key: "employeeAddress",
    type: "text",
    placeholder: "Enter address",
  },

  {
    id: 9,
    label: "Gender",
    icon: NameIcon,
    key: "employeeGender",
    type: "dropdown",
    options: ["Male", "Female", "Other"],
    placeholder: "Select gender",
  },
];

// ----------------------------------------------------- //

// Action menu data
import EditIcon from "../assets/svg/edit.svg";
import DownloadIcon from "../assets/svg/import.svg";
import TrashIcon from "../assets/svg/trash.svg";

export const actionMenuData = [
  { id: 1, icon: EditIcon, label: "Edit", action: "edit" },
  { id: 2, icon: DownloadIcon, label: "Download", action: "download" },
  { id: 3, icon: TrashIcon, label: "Delete", action: "delete" },
];

// ----------------------------------------------------------------------- //

// Action delete buttons

export const actionDeleteButtons = [
  {
    id: 1,
    label: "Cancel",
    borderClr: "#FF8C2E",
    bgColor: "white",
    textColor: "#FF8C2E",
    borderWidth: 1,
  },
  { id: 2, label: "Confirm" },
];

export const actionConfirmButtons = [
  {
    id: 1,
    label: "Cancel",
    borderClr: "#FF8C2E",
    bgColor: "white",
    textColor: "#FF8C2E",
    borderWidth: 1,
  },
  { id: 2, label: "Confirm" },
];

// ------------------------------------------------------ //

// services tab data

export const servicesTableHeader = [
  { id: 1, title: "ID", key: "serviceID" },
  { id: 2, title: "Name", key: "serviceName" },
  { id: 3, title: "Category", key: "categoryName" },
  { id: 4, title: "Duration", key: "duration" },
  { id: 5, title: "Price($)", key: "price" },
  { id: 6, title: "Status", key: "serviceStatus" },
];

// Add new service modal data
export const addNewServiceModalData = [
  {
    id: 1,
    label: "Name",
    type: "text",
    key: "serviceName",
    placeholder: "Enter service name",
  },
  {
    id: 2,
    label: "Category",
    type: "dropdown",
    key: "category",
    placeholder: "Select category",
  },
  {
    id: 3,
    label: "Duration",
    type: "dropdown",
    key: "duration",
    options: [
      { label: "30 minutes", value: "30 minutes" },
      { label: "1 hour", value: "1 hour" },
      { label: "1.5 hours", value: "1.5 hours" },
      { label: "2 hours", value: "2 hours" },
    ],
    placeholder: "Select duration",
  },
  {
    id: 4,
    label: "Price",
    type: "text",
    key: "price",
    icon: DollarIcon,
    placeholder: "Enter price in dollars",
  },
  {
    id: 5,
    label: "Image",
    type: "file",
    key: "image",
    placeholder: "Upload image",
  },
  {
    id: 6,
    label: "Roles",
    type: "multiSelect",
    key: "roles",
    placeholder: "Select roles",
  },
  {
    id: 7,
    label: "Description",
    type: "text",
    key: "description",
    placeholder: "Enter description",
  },
];

// ------------------------------------------------------------- //

// Appointment detail screen header data
export const appointmentDetailScreenHeaderData = [
  { id: 1, title: "Service", key: "service" },
  { id: 2, title: "Date", key: "date" },
  { id: 3, title: "Time", key: "time" },
  { id: 4, title: "Stylist", key: "stylistName" },
  { id: 5, title: "Notes", key: "note" },
  { id: 6, title: "Price($)", key: "price" },
];

export const serviceDetails = [
  { label: "Name", key: "serviceName" },
  {
    label: "Category",
    key: "categoryName",
    className: "highlightContainer",
    showLabel: false,
  },
  { label: "Description", key: "description" },
  { label: "Duration", key: "duration" },
  { label: "Price($)", key: "price" },
  { label: "Status", key: "serviceStatus" },
];

// ---------------------------------------------------------------- //
export const employeeDetailScreenHeaderData = [
  { id: 1, title: "Appointment ID", key: "appointmentId" },
  { id: 2, title: "Date", key: "date" },
  { id: 3, title: "Time", key: "time" },
  { id: 4, title: "Client", key: "client" },
  { id: 5, title: "Service", key: "service" },
  { id: 6, title: "Notes", key: "note" },
];

// ----------------------------------------------------------------------- //

// Clients screen data
export const clientsTableHeaderData = [
  { id: 1, title: "ID", key: "clientId" },
  { id: 2, title: "Customer", key: "name" },
  { id: 3, title: "Email", key: "email" },
  { id: 4, title: "Phone", key: "phone" },
  { id: 5, title: "Last Visit", key: "lastVisitedDate", type: "date" },
];

export const addNewClientModalData = [
  {
    id: 1,
    label: "First Name",
    type: "text",
    key: "firstName",
    icon: NameIcon,
    placeholder: "Enter first name",
  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
    key: "lastName",
    icon: NameIcon,
    placeholder: "Enter last name",
  },
  {
    id: 3,
    label: "Email",
    type: "email",
    key: "email",
    icon: InputEmailIcon,
    placeholder: "Enter email",
  },
  {
    id: 4,
    label: "Phone Number",
    type: "number",
    key: "phone",
    icon: PhoneIcon,
    placeholder: "Enter phone number",
  },
  {
    id: 5,
    label: "Date of Birth",
    type: "date",
    key: "dob",
    icon: CalenderIcon,
    placeholder: "Select DOB",
  },

  {
    id: 6,
    label: "Gender",
    type: "dropdown",
    key: "gender",
    options: ["Male", "Female", "Other"],
    placeholder: "Select gender",
  },
  { id: 7, label: "Photo", type: "file", key: "photo" },
  {
    id: 8,
    label: "Notes",
    type: "text",
    key: "note",
    placeholder: "Enter notes",
  },
  {
    id: 9,
    label: "Address",
    type: "text",
    key: "address",
    placeholder: "Enter address",
  },
];

// ---------------------------------------------------------------- //

// service detail

export const serviceDetailModalButtons = [
  {
    id: 1,
    label: "Edit",
    borderClr: "#FF8C2E",
    bgColor: "white",
    textColor: "#FF8C2E",
    borderWidth: 1,
    width: "80%",
  },
  { id: 2, label: "Back to Service", onclick: "goBack" },
];

// ----------------------------------------------------------------------  //

// Stocks tab data

// Add new stock modal data

export const stocksTableHeaderData = [
  { id: 1, title: "ID", key: "stockId" },
  { id: 2, title: "Product", key: "stockName" },
  { id: 3, title: "Category", key: "stockCategory" },
  { id: 4, title: "Quantity", key: "stockQuantity" },
  { id: 5, title: "MFG date", key: "stockMFGDate", type: "date" },
  { id: 6, title: "Expiry Date", key: "stockEXPDate", type: "date" },
  { id: 7, title: "Status", key: "stockStatus" },
];

export const addNewStockModalData = [
  {
    id: 1,
    label: "Name",
    type: "text",
    key: "stockName",
    placeholder: "Enter product name",
  },
  {
    id: 2,
    label: "Category",
    type: "dropdown",
    key: "stockCategory",
    placeholder: "Select category",
  },
  {
    id: 3,
    label: "Price",
    type: "number",
    key: "price",
    icon: DollarIcon,
    placeholder: "Enter price in dollars",
  },

  {
    id: 4,
    label: "Quantity",
    type: "number",
    key: "stockQuantity",
    placeholder: "Enter quantity",
  },
  {
    id: 5,
    label: "Manufacture Date",
    type: "date",
    icon: CalenderIcon,
    key: "stockMFGDate",
    placeholder: "Select manufacture date",
  },
  {
    id: 6,
    label: "Expiry Date",
    type: "date",
    icon: CalenderIcon,
    key: "stockEXPDate",
    placeholder: "Select expiry date",
  },
  {
    id: 7,
    label: "Image",
    type: "file",
    key: "stockImage",
    placeholder: "Upload product image",
  },
  {
    id: 8,
    label: "Description",
    type: "text",
    key: "stockDescription",
    placeholder: "Enter description",
  },
  {
    id: 9,
    label: "Reorder Quantity",
    type: "number",
    key: "reorderQuantity",
    placeholder: "Enter reorder quantity",
  },
];

// --------------------------------------------------------------------------- //

// Settings tab data

export const miniTabs = [
  { id: 1, name: "General", route: "/settings/general" },
  { id: 2, name: "Users", route: "/settings/user-management" },
  { id: 3, name: "Roles", route: "/settings/role-management" },
  {
    id: 4,
    name: "Master",
    route: "/settings/masters/category",
    secondaryRoute: ["/settings/masters/role"],
  },
];

// General settings tab data
export const generalSettingsInputFields = [
  {
    id: 1,
    label: "Saloon Name",
    type: "text",
    key: "name",
    placeholder: "Enter company name",
  },
  {
    id: 2,
    label: "Country",
    type: "dropdown",
    key: "country",
    placeholder: "Select country",
  },
  {
    id: 3,
    label: "City",
    type: "dropdown",
    key: "city",
    placeholder: "Select city",
  },
  {
    id: 4,
    label: "Address",
    type: "textarea",
    key: "address",
    placeholder: "Enter address",
  },
];

export const generalSettingsButton = [
  // {
  //   id: 1,
  //   label: "Cancel",
  //   width: "max-width",
  //   bgColor: "white",
  //   borderClr: "#FF8C2E",
  //   textColor: "#FF8C2E",
  //   borderWidth: 1,
  // },
  { id: 2, label: "Save Changes", width: "max-width" },
];

//Notifications tab

export const notificationsTabData = [
  {
    id: 1,
    title: "Email Notifications",
    para: "Enable or disable email notifications.",
  },
  {
    id: 2,
    title: "SMS Notifications",
    para: "Enable or disable SMS notifications.",
  },
  {
    id: 3,
    title: "Push Notifications",
    para: "Enable or disable push notifications.",
  },
];

//Stock management tab

export const stockManagementTabData = [
  {
    id: 1,
    title: "Low Stock Alert",
    para: "Enable or disable alerts for low stock.",
    type: "switch",
  },
  {
    id: 2,
    title: "Stock Reorder Levels",
    para: "Set the minimum stock level for reordering.",
    orderQuantity: 10,
  },
  {
    id: 3,
    title: "Expiry Alerts",
    para: "Enable or disable alerts for expired items.",
    type: "switch",
  },
];

// ---------------------------------------------------------------------- //

// Offers tab

export const addOfferFormInput = [
  {
    id: 1,
    label: "Title",
    type: "text",
    key: "title",
    placeholder: "Enter offer title",
  },
  {
    id: 2,
    label: "Message",
    type: "text",
    key: "message",
    placeholder: "Enter offer message",
  },
  // {
  //   id: 3,
  //   label: "Type",
  //   type: "dropdown",
  //   key: "type",
  //   options: ["Offer", "Announcement"],
  //   placeholder: "Select offer type",
  // },
  // {
  //   id: 4,
  //   label: "Target Audience",
  //   type: "dropdown",
  //   key: "targetAudience",
  //   options: ["All users", "New users", "Returning users"],
  //   placeholder: "Select target audience",
  // },
  {
    id: 3,
    label: "Schedule Date",
    type: "dateRangePicker",
    icon: CalenderIcon,
    key: "dateRange",
    placeholder: "Select schedule date",
  },
  {
    id: 4,
    label: "Image",
    type: "file",
    key: "image",
    placeholder: "Upload offer image",
  },
  // {
  //   id: 7,
  //   label: "Notification Status",
  //   type: "dropdown",
  //   key: "notificationStatus",
  //   options: ["Scheduled", "Draft"],
  //   placeholder: "Select notification status",
  // },
];

export const offerDetails = [
  { id: 1, label: "name", key: "title" },
  { id: 2, label: "Description", key: "message" },
  { id: 3, label: "Limited time only", key: "dateRange" },
];

// --------------------------------------------------------------------- //

// Low  stock detail screen

export const lowStockTableHeader = [
  { id: 1, title: "Stock ID", key: "stockId" },
  { id: 2, title: "Stock Name", key: "stockName" },
  { id: 3, title: "Category", key: "stockCategory" },
  { id: 4, title: "Brand", key: "brandName" },
  { id: 5, title: "Current Quantity", key: "stockQuantity" },
  { id: 6, title: "Reorder Quantity", key: "reorderQuantity" },
];

export const expiredStockTableHeader = [
  { id: 1, title: "Stock ID", key: "stockId" },
  { id: 2, title: "Stock Name", key: "stockName" },
  { id: 3, title: "Category", key: "stockCategory" },
  { id: 4, title: "Brand", key: "brandName" },
  { id: 5, title: "Expriry Date", key: "stockEXPDate" },
  { id: 6, title: "Quantity", key: "stockQuantity" },
];

// Profile settings modal data
export const profileSettingsModalData = [
  { id: 1, label: "Profile Picture", type: "file", key: "userProfile" },
  { id: 2, label: "Name", type: "text", key: "name" },
];

export const brandTableHeader = [
  { id: 1, title: "Brand ID", key: "brandId" },
  { id: 2, title: "Brand Name", key: "name" },
  { id: 3, title: "Brand Suppliers", key: "suppliers" },
  { id: 4, title: "Brand Description", key: "description" },
];

export const addBrandModalData = [
  { id: 1, label: "Brand Name", key: "name", type: "text" },
  { id: 2, label: "Suppliers", key: "suppliers", type: "multiSelect" },
  { id: 3, label: "Description", key: "description", type: "text" },
];

// -------------------------------------------------------------------------- //
// Suppliers tab data

export const suppliersTableHeader = [
  { id: 1, title: "Supplier ID", key: "supplierId" },
  { id: 2, title: "Supplier Name", key: "name" },
  { id: 3, title: "Brands", key: "brands" },
  { id: 4, title: "Contact Number", key: "mobile" },
  { id: 5, title: "Address", key: "address" },
];

export const addNewSupplierData = [
  { id: 1, label: "Supplier Name", key: "name", type: "text" },
  { id: 2, label: "Brands", key: "brands", type: "multiSelect" },
  { id: 3, label: "Contact Number", key: "mobile", type: "number" },
  { id: 4, label: "Address", key: "address", type: "text" },
];

// ---------------------------------------------------------------------------- //

// Order details data
export const orderDetailsTableHeader = [
  { id: 1, title: "S.No", key: "sNo" },
  { id: 2, title: "Product Name", key: "productName" },
  { id: 3, title: "Category", key: "category" },
  { id: 4, title: "Quantity", key: "quantity" },
  { id: 5, title: "MFG Date", key: "stockMFGDate", type: "date" },
  { id: 6, title: "EXP Date", key: "stockEXPDate", type: "date" },
  { id: 7, title: "Total Price($)", key: "totalPrice" },
];

// Order data
export const orderTableHeader = [
  { id: 1, title: "Order ID", key: "orderId" },
  { id: 2, title: "Order Date", key: "orderDate", type: "date" },
  { id: 3, title: "Total Price($)", key: "totalPrice" },
  { id: 4, title: "Items", key: "items" },
  { id: 5, title: "Payment Status", key: "paymentStatus" },
];

export const addNewOrder = [
  { id: 1, label: "Product Brand", type: "dropdown", key: "productBrand" },

  { id: 2, label: "Product Name", type: "dropdown", key: "productName" },
  {
    id: 3,
    label: "Category",
    type: "text",
    key: "category",
  },
  { id: 4, label: "Quantity", type: "number", key: "quantity" },
  {
    id: 5,
    label: "Total Price($)",
    type: "text",
    key: "totalPrice",
    DollarIcon,
  },
];

export const addOrderFooterButtons = [
  {
    id: 1,
    label: "Cancel",
    bgColor: "white",
    fontColor: "#FF8C2E",
    borderColor: "#FF8C2E",
    borderWidth: 1,
    tab: "addOrder",
  },
  { id: 2, label: "Next", tab: "payment" },
];

export const paymentMethods = [{ id: 1, label: "Credit Card" }];
// Payment method inputs
export const creditCardInputData = [
  {
    id: 1,
    label: "Card Number",
    placeholder: "Credit Card Number",
    type: "number",
  },
  { id: 2, label: "Expire", placeholder: "MM/YY", type: "date" },
  { id: 3, label: "CVV", placeholder: "CVV", type: "number" },
];

// Billing address input data
export const billingAddressInputData = [
  { id: 1, label: "Name", type: "text", key: "name" },
  { id: 2, label: "Email", type: "text", key: "email" },
  { id: 3, label: "Phone Number", type: "number", key: "phone" },
  { id: 4, label: "Country", type: "dropdown", key: "country" },
  { id: 5, label: "State", type: "dropdown", key: "state" },
  { id: 6, label: "City", type: "dropdown", key: "city" },
  { id: 7, label: "Address", type: "text", key: "address" },
  { id: 8, label: "Postal Code", type: "number", key: "postalCode" },
];

// Appoinments tab search feilds
export const appointmentSearchFields = [
  "client.name",
  "appointmentId",
  "client.email",
  "client.phone",
  "date",
  "time",
  "service.serviceName",
  "stylistId.employeeName",
  "appointmentStatus",
];

// Employee tab search fields
export const employeeSearchFields = [
  "employeeId",
  "employeeName",
  "employeeEmail",
  "role.roleName",
  "employeePhone",
  "employeeGender",
  "employeeStatus",
];

// Gallery tab search fields
export const gallerySearchFields = ["serviceName"];

// User search fields
export const userSearchFields = ["userId", "role.roleName", "email", "name"];

// Category search fields
export const categorySearchFields = [
  "name",
  "createdBy.name",
  "status",
  "createdAt",
];

// Role search fields
export const roleSearchFields = ["roleName", "createdBy.name", "createdAt"];

// Clients tab search fields
export const clientsSearchFields = [
  "clientId",
  "name",
  "email",
  "phone",
  "gender",
  "address",
  "preferredStylist.name",
];

//Offers tab search fields
export const offersSearchFields = ["title", "message"];

//Services tab search fields
export const servicesSearchFields = [
  "serviceID",
  "serviceName",
  "categoryName",
  "duration",
  "price",
  "serviceStatus",
];

//Transactions tab search fields
export const transactionsSearchField = [
  "transactionId",
  "clientId.name",
  "serviceId.serviceName",
  "status",
  "amount",
  "dateAndTime",
];

// Suppliers tab search fields
export const suppliersSearchFields = ["supplierId", "name", "mobile", "brands"];

// Brand tab search fields
export const brandSearchFields = ["name", "brandId", "suppliers"];

// Stock tab search fields
export const stockSearchFields = [
  "stockId",
  "stockName",
  "stockCategory",
  "stockQuantity",
  "stockMFGDate",
  "stockEXPDate",
  "reorderQuantity",
  "stockStatus",
  "supplierName",
  "brandName",
];

// Order tab search fields
export const orderSearchFields = [
  "orderDate",
  "paymentStatus",
  "totalPrice",
  "status",
  "orderId",
];

// Order detail tab

export const orderDetailData = [
  {
    id: 1,
    orderId: "orderId",
    orderDate: "orderDate",
    trackingId: "trackingId",
    status: "status",
  },
];

export const orderDetailItemsHeader = [
  { id: 1, title: "S.No", key: "sNo" },
  { id: 2, title: "Product Name", key: "productName" },
  { id: 3, title: "Quantity", key: "quantity" },
  { id: 4, title: "MFG Date", key: "stockMFGDate", type: "date" },
  { id: 5, title: "EXP Date", key: "stockEXPDate", type: "date" },
  { id: 6, title: "Price($)", key: "price" },
  { id: 7, title: "Total Price", key: "totalPrice" },
];

// User management tab header data
export const userManagementHeaderData = [
  { id: 1, title: "U.ID", key: "userId" },
  { id: 2, title: "User", key: "name" },
  { id: 3, title: "Email", key: "email" },
  { id: 4, title: "Role", key: "role" },
];

// Add new user in user management
export const addNewUserModalData = [
  {
    id: 1,
    label: "Name",
    placeholder: "Enter user name",
    key: "name",
    type: "text",
  },
  {
    id: 2,
    label: "Email",
    placeholder: "Enter user email",
    key: "email",
    type: "text",
  },
  {
    id: 3,
    label: "Role",
    placeholder: "Select role",
    key: "roles",
    type: "dropdown",
  },
];

//Add new role data
export const addNewRoleModalData = [
  {
    id: 1,
    label: "Name",
    placeholder: "Enter role name",
    type: "text",
    key: "roleName",
  },
];

export const mastersTabs = [
  { id: 1, name: "Category", route: "/settings/masters/category" },
  { id: 2, name: "Role", route: "/settings/masters/role" },
];

export const categoryMastersTabHeaderData = [
  { id: 1, title: "Category", key: "name" },
  { id: 2, title: "Created By", key: "createdBy" },
  { id: 1, title: "Created On", key: "createdAt", type: "date" },
  { id: 1, title: "Status", key: "status" },
];

export const roleMastersTabHeaderData = [
  { id: 1, title: "Role", key: "roleName" },
  { id: 2, title: "Created By", key: "createdBy" },
  { id: 1, title: "Created On", key: "createdAt", type: "date" },
];

export const addNewCategory = [
  {
    id: 1,
    label: "Name",
    key: "name",
    type: "text",
    placeholder: "Enter category name",
  },
  { id: 2, label: "Image", key: "image", type: "file" },
];
export const addNewRole = [
  {
    id: 1,
    label: "Name",
    key: "roleName",
    type: "text",
    placeholder: "Enter role name",
  },
];

export const offerRequiredFields = [
  { field: "title", message: "Title is required", type: "string" },
  { field: "message", message: "Message is required", type: "string" },
  { field: "type", message: "Type is required", type: "string" },
  {
    field: "targetAudience",
    message: "Target Audience is required",
    type: "string",
  },
  { field: "dateRange", message: "Date Range is required", type: "array" },
  { field: "image", message: "Image is required", type: "file" },
];

export const appointmentRequiredFields = [
  { field: "clientId", message: "Client ID is required", type: "string" },
  { field: "clientName", message: "Client Name is required", type: "string" },
  {
    field: "phoneNumber",
    message: "Phone Number is required and must be numeric",
    type: "number",
  },
  {
    field: "email",
    message: "A valid Email address is required",
    type: "email",
  },
  { field: "date", message: "Date is required", type: "string" },
  { field: "time", message: "Time is required", type: "string" },
  { field: "service", message: "Service is required", type: "string" },
  { field: "stylistId", message: "Stylist ID is required", type: "string" },
  { field: "gender", message: "Gender is required", type: "string" },
];

export const customerRequiredFields = [
  { field: "firstName", message: "First Name is required", type: "string" },
  { field: "lastName", message: "Last Name is required", type: "string" },
  {
    field: "phone",
    message: "Phone Number is required and must be numeric",
    type: "number",
  },
  { field: "gender", message: "Gender is required", type: "string" },
  {
    field: "email",
    message: "Email must be a valid email address",
    type: "email", // This field is optional
  },
];

export const employeeRequiredFields = [
  {
    field: "employeeName",
    message: "Employee Name is required",
    type: "string",
  },
  {
    field: "employeeRole",
    message: "Employee Role is required",
    type: "string",
  },
  {
    field: "employeePhone",
    message: "Employee Phone Number is required and must be numeric",
    type: "number",
  },
  {
    field: "employeeJoiningData",
    message: "Joining Date is required",
    type: "string",
  },
  {
    field: "employeeSalary",
    message: "Employee Salary is required and must be numeric",
    type: "number",
  },
  {
    field: "employeeAddress",
    message: "Employee Address is required",
    type: "string",
  },
  {
    field: "employeeGender",
    message: "Employee Gender is required",
    type: "string",
  },
  {
    field: "employmentType",
    message: "Employment Type is required",
    type: "string",
  },
  {
    field: "employeeEmail",
    message: "Employee Email must be a valid email address",
    type: "email", // This field is optional
  },
];

export const serviceRequiredFields = [
  { field: "serviceName", message: "Service Name is required", type: "string" },
  { field: "category", message: "Category is required", type: "string" },
  { field: "duration", message: "Duration is required", type: "string" },
  { field: "price", message: "Price is required", type: "number" },
  { field: "image", message: "Image is required", type: "file" },
  { field: "roles", message: "Roles are required", type: "array" },
  { field: "description", message: "Description is required", type: "string" },
];

export const productRequiredFields = [
  { field: "stockName", message: "Stock Name is required", type: "string" },
  {
    field: "stockCategory",
    message: "Stock Category is required",
    type: "string",
  },
  { field: "price", message: "Price is required", type: "number" },
  {
    field: "stockQuantity",
    message: "Stock Quantity is required",
    type: "number",
  },
  {
    field: "stockEXPDate",
    message: "Expiration Date is required",
    type: "string",
  },
  {
    field: "stockMFGDate",
    message: "Manufacturing Date is required",
    type: "string",
  },
  { field: "stockImage", message: "Stock Image is required", type: "file" },
  {
    field: "reorderQuantity",
    message: "Reorder Quantity is required",
    type: "number",
  },
];

export const createSaloonRequiredFields = [
  { field: "name", message: "Saloon name is required", type: "string" },
  { field: "country", message: "Country is required", type: "string" },
  { field: "city", message: "City is required", type: "string" },
  { field: "address", message: "Address is required", type: "string" },
];

export const createUserRequiredFields = [
  { field: "name", message: "User name is required", type: "string" },
  { field: "email", message: "User email is required", type: "string" },
  { field: "role", message: "User role is required", type: "string" },
];

export const createCategoryRequiredFields = [
  { field: "name", message: "Category name is required", type: "string" },
  { field: "image", message: "Category image is required", type: "string" },
];

export const createRoleRequiredFields = [
  { field: "roleName", message: "Role name is required", type: "string" },
];

export const transactionsTableHeader = [
  { id: 1, title: "Txn.Id", key: "transactionId" },
  { id: 2, title: "Customer", key: "clientName" },
  { id: 3, title: "Date & Time", key: "dateAndTime" },
  { id: 4, title: "Service", key: "serviceName" },
  { id: 5, title: "Amount($)", key: "amount" },
  { id: 6, title: "Status", key: "status" },
];

export const editRoleModalData = [
  {
    id: 1,
    label: "Name",
    placeholder: "Enter role name",
    type: "text",
    key: "roleName",
  },
];

export const editCategoryModalData = [
  {
    id: 1,
    label: "Name",
    placeholder: "Enter category name",
    type: "text",
    key: "name",
  },
  {
    id: 2,
    label: "Image",
    placeholder: "Select your image",
    type: "file",
    key: "image",
  },
];
