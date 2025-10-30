import React, { useEffect, useState } from "react";
import Image from "next/image";
import LOGO from "../../assets/svg/innerLOGO.svg";
import styles from "./Sidebar.module.css";
import CollapsedLogo from "../../assets/svg/collapsedLogo.svg";
import { usePathname } from "next/navigation";
import { tabsData } from "../../utils/data";
import { fetchRolePermissions } from "../../service/api";
import toast from "react-hot-toast";
import Link from "next/link";
import { Skeleton } from "primereact/skeleton";
import { TOAST_MESSAGES } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { setUserPermissions } from "../../redux/slices/permissionsSlice";
import { setCurrentModule } from "../../redux/slices/moduleSlice";

const Sidebar = ({ isCollapsed }) => {
  const pathname = usePathname();

  const [sidebarModules, setSidebarModules] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { roleId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!roleId) return;
    const getModulesAndPermissions = async () => {
      try {
        setLoading(true);
        const filter = { showCanViewModules: true, showCanEditModules: false };
        const response = await fetchRolePermissions(roleId, filter);
        dispatch(setUserPermissions(response));
        setSidebarModules(response);
      } catch (error) {
        console.log("Error fetching modules of given role", error);
        toast.error(TOAST_MESSAGES.ERROR_FETCHING_MODULES_OF_ROLE);
      } finally {
        setLoading(false);
      }
    };
    getModulesAndPermissions();
  }, [roleId]);

  const { userPermissions } = useSelector((state) => state.permissions);

  const handleModuleID = (moduleID) => {
    dispatch(setCurrentModule(moduleID));
  };

  return (
    <aside
      className={` ${styles.sidebar}
        fixed left-0 top-0 h-screen bg-white shadow-sm
        transition-all duration-300 ease-in-out  z-30
        ${isCollapsed ? "w-20" : "w-[280px]"}
      `}
    >
      {/* Logo */}
      <div
        className={`flex justify-center items-center mt-8
        transition-all duration-300 mb-8
        ${isCollapsed ? "px-2" : "px-4"}
      `}
      >
        {isCollapsed ? (
          <Image
            src={CollapsedLogo}
            alt="collapsedLogo"
            className={`transition-all duration-300`}
          />
        ) : (
          <Image
            src={LOGO}
            alt="mainLOGO"
            className={`transition-all duration-300`}
          />
        )}
      </div>

      {/* Navigation */}
      <ul className="pt-[10%]">
        {/* Loading Skeletons */}
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <li
                key={index}
                className="flex items-center gap-2 px-5 py-5 cursor-pointer"
              >
                <div className="flex-shrink-0">
                  <Skeleton width="30px" height="30px" shape="circle" />
                </div>
                <p className="ml-4">
                  <Skeleton width="120px" height="20px" />
                </p>
              </li>
            ))
          : sidebarModules.map((module) => {
              const isActive = pathname.includes(
                module.moduleName.toLowerCase().replace(/\s+/g, "-")
              );

              const matchedTab = tabsData.find(
                (tab) => tab.tabName === module.moduleName
              ); // Find matching tab data based on module name

              return matchedTab ? (
                <Link
                  key={module._id}
                  href={{
                    pathname: matchedTab.route,
                    // query: { moduleId: module.moduleId },
                  }}
                  prefetch
                  onClick={() => handleModuleID(module.moduleId)}
                >
                  <li
                    className={`flex items-center gap-2
                      px-5 py-5 cursor-pointer
                      transition-all duration-200
                      hover:bg-[rgba(155,14,83,0.5)]
                      ${isActive ? "bg-[#9b0e53]" : ""}
                      ${isCollapsed ? "justify-center" : ""}
                    `}
                  >
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0
                        transition-transform duration-200
                        ${isCollapsed ? "transform scale-110" : ""}
                      `}
                    >
                      {React.isValidElement(matchedTab.icon) ? (
                        React.cloneElement(matchedTab.icon, {
                          color: isActive ? "white" : "#9B0E53",
                        })
                      ) : (
                        <span>Error: Invalid Icon</span>
                      )}
                    </div>

                    {/* Module Text */}
                    <p
                      className={`transition-opacity duration-200 t
                        ${isCollapsed ? "hidden" : "block"}
                        ${isActive ? "text-white font-semibold" : "text-[#757575] font-medium"}
                      `}
                    >
                      {matchedTab.tabName}
                    </p>
                  </li>
                </Link>
              ) : null;
            })}
      </ul>
    </aside>
  );
};

export default Sidebar;
