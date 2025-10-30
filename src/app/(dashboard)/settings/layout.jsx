"use client";
import React from "react";
import styles from "./settings.module.css";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SETTINGS_TAB } from "../../../constants";
import { miniTabs } from "../../../utils/data";

export default function SettingsLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const moduleId = searchParams.get("moduleId");

  return (
    <div className={styles.settingsTabContainer}>
      <div className={styles.tabsContainer}>
        <h2>{SETTINGS_TAB.SETTINGS}</h2>
        <div className="mt-5">
          {miniTabs.map((tab) => {
            const isActive =
              pathname === tab.route ||
              (tab.secondaryRoute &&
                tab.secondaryRoute.some((route) => pathname.startsWith(route)));
            return (
              <Link
                className={`${styles.tabs} ${isActive ? styles.activeTab : ""}`}
                key={tab.id}
                href={{
                  pathname: tab.route,
                  query: moduleId ? { moduleId } : {},
                }}
              >
                <p>{tab.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={styles.tabsScrollable}>{children}</div>
    </div>
  );
}
