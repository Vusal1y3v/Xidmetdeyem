import React from "react";
import Header from "../../../../components/Header/Header.tsx";
import Sidebar from "../../../../components/Sidebar/Sidebar.tsx";

import { SessionData } from "../../models/dashboard.model.ts";

import styles from "./DashboardLayout.module.scss";

const DashboardLayout = ({
  sessionData,
  children,
}: Readonly<{
  sessionData: SessionData;
  children: React.ReactNode;
}>) => {
  return (
    <div className={styles.dashboard__layout}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.inner}>
        <Header sessionData={sessionData} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
