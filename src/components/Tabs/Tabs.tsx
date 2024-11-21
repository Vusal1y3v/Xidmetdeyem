import React from "react";
import styles from "./Tabs.module.scss";
import { useTranslation } from "react-i18next";

const Tabs = ({ tabs, active }: { tabs: Array<any>; active?: number }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tabs}>
      {tabs &&
        tabs.map((tab, index) => {
          return (
            <React.Fragment key={`tab_${index}`}>
              {tab?.link ? (
                <a
                  href={tab.link}
                  className={`${styles.tab} ${index === active && styles.active}`}
                  onClick={() => {
                    if (tab.onClick) tab.onClick();
                  }}
                >
                  <span>{t(tab.name)}</span>
                </a>
              ) : (
                <>
                  <button
                    className={`${styles.tab} ${index === active && styles.active}`}
                    onClick={() => {
                      if (tab.onClick) tab.onClick();
                    }}
                  >
                    <span>{t(tab.name)}</span>
                  </button>
                </>
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default Tabs;
