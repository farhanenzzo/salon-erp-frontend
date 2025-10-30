"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

export default function DashboardWrapper({ children }) {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState(getTabFromPathname(pathname));

  function getTabFromPathname(path) {
    const segment = path.split("/")[2] || "dashboard";
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header currentTab={currentTab} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
