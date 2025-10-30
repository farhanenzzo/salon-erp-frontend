// "use client";
// import React, { useState } from "react";
// import styles from "./SettingsTab.module.css";
// import { miniTabs } from "../../utils/data";
// import GeneralSettings from "./generalSettingsTab/GeneralSettings";
// import NotificationSettings from "./notificationSettings/NotificationSettings";
// import StockManagement from "./stockManagement/StockManagement";
// import UserManagement from "./userManagement/UserManagement";
// import { SETTINGS_TAB } from "../../constants";
// import RoleManagement from "./roleManagement/RoleManagement";
// import Link from "next/link";

// const SettingsTab = () => {
//   const [activeTab, setActiveTab] = useState("General Settings");

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const renderTabs = () => {
//     switch (activeTab) {
//       case "General Settings":
//         return <GeneralSettings />;
//       // case "Notification":
//       //   return <NotificationSettings />;
//       // case "Stock Management":
//       //   return <StockManagement />;
//       case "User Management":
//         return <UserManagement />;
//       case "Role Management":
//         return <RoleManagement />;

//       default:
//         return <h2>nothing</h2>;
//     }
//   };

//   return (
//     <div className={styles.settingsTabContainer}>
//       <div className={styles.tabsContainer}>
//         <h2>{SETTINGS_TAB.SETTINGS}</h2>
//         <div className="mt-5">
//           {miniTabs.map((tab) => (
//             <Link
//               className={`${styles.tabs} ${
//                 activeTab === tab.name && styles.activeTab
//               }`}
//               key={tab.id}
//               href={tab.route}
//               onClick={() => handleTabChange(tab.name)}
//             >
//               <p>{tab.name}</p>
//             </Link>
//           ))}
//         </div>
//       </div>
//       {/* <div className={styles.tabsScrollable}>{renderTabs(activeTab)}</div> */}
//     </div>
//   );
// };
// export default SettingsTab;
