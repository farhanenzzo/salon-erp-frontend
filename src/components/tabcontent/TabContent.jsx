import React from "react";
import styles from "./TabContent.module.css";
import DashboardTab from "../dashboardTab/DashboardTab";
import AppointmentsTab from "../appointmentsTab/AppointmentsTab";
import EmployeesTab from "../employeesTab/EmployeesTab";
// import AppointmentDetail from "../../app/screens/appointmentDetail/AppointmentDetail";
import ServicesTab from "../servicesTab/ServicesTab";
import ClientsTab from "../clientsTab/ClientsTab";
import StockTab from "../productsTab/ProductsTab";
import SettingsTab from "../settingsTab/SettingsTab";
import GalleryTab from "../galleryTab/GalleryTab";
import OffersTab from "../offersTab/OffersTab";
import ReviewsTab from "../reviewsTab/ReviewsTab";
import SuppliersTab from "../suppliersTab/SuppliersTab";
import BrandTab from "../brandTab/BrandTab";
import OrderTab from "../orderTab/OrderTab";

const TabContent = ({ currentTab }) => {
  const renderTabContent = () => {
    switch (currentTab) {
      case "Dashboard":
        return <DashboardTab />;
      case "Appointments":
        return <AppointmentsTab />;
      case "Employees":
        return <EmployeesTab />;
      case "Services":
        return <ServicesTab />;
      case "Reviews":
        return <ReviewsTab />;
      case "Suppliers":
        return <SuppliersTab />;
      case "Brand":
        return <BrandTab />;
      case "Clients":
        return <ClientsTab />;
      case "Offers":
        return <OffersTab />;
      case "Stock":
        return <StockTab />;
      case "Order":
        return <OrderTab />;
      case "Settings":
        return <SettingsTab />;
      case "Gallery":
        return <GalleryTab />;
      default:
        return <div>Content Not Found</div>;
    }
  };

  return (
    <div className={styles.tabContent}>
      {/* <h2>{`Tab ${currentTab}`}</h2> */}
      {renderTabContent()}
    </div>
  );
};

export default TabContent;
