import {
  ArrowDownIcon,
  CompanyIcon,
  LanguageIcon,
  NotificationIcon,
} from "../../assets/images/layout/layout.vector.tsx";

import { SessionData } from "../../features/dashboard/models/dashboard.model.ts";

import styles from "./Header.module.scss";

const Header = ({ sessionData }: { sessionData: SessionData }) => {
  return (
    <div className={styles.dashboard__header}>
      <div className={styles.buttons}>
        <div className={styles.button}>
          <NotificationIcon />
        </div>
        <div className={styles.button}>
          <LanguageIcon />
        </div>
        <div className={styles.special__button}>
          <CompanyIcon />
          <span>
            {sessionData.detail.first_name} {sessionData.detail.last_name}
          </span>
          <ArrowDownIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
