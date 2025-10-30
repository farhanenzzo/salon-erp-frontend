"use client";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import { redirect } from "next/navigation";
import { auth } from "../../../firebase.config";
import { ROUTES } from "../../constants";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const authenticated = auth.currentUser;

  if (!authenticated) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <div className="dashboard">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className={`mainContainer ${isCollapsed ? "sidebarCollapsed" : ""}`}
      >
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className="tabContent">{children}</div>
      </main>
    </div>
  );
}
