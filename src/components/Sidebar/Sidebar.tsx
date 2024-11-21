import {
  LogoutIcon,
  SettingsIcon,
} from "../../assets/images/layout/layout.vector.tsx";
import styles from "./Sidebar.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navigation } from "./Sidebar.constants.tsx";
import { FormEvent, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { LoaderContext } from "../../contexts/LoaderContext.tsx";
import { logoutRequest } from "../../features/auth/auth.services.ts";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { auth, setAuth } = useContext(AuthContext);
  const { setLoader } = useContext(LoaderContext);

  const logOut = async (event: FormEvent) => {
    event.preventDefault();
    setLoader(true);
    const { status } = await logoutRequest();
    if (status === 200) {
      setAuth({
        isAuth: false,
        role: "",
      });
      document.cookie = `ocrToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      navigate(`/${i18n.language}/auth/login`);
    }
    setLoader(false);
  };

  return (
    <div className={styles.sidebar}>
      <Link to={"/"}>
        <p className={styles.logo}>RM</p>
      </Link>

      <div className={styles.navigation}>
        <div className={styles.navigation__list}>
          {navigation
            .filter((nav) => nav.roles.includes(auth.role))
            .map((nav, index) => {
              const Icon = nav.icon;
              return (
                <Link
                  to={`/${i18n.language}/${nav.path}`}
                  key={`nav_list_${index}`}
                >
                  <div
                    className={`${styles.icon} ${location.pathname === `/${i18n.language}/${nav.path}` && styles.active}`}
                  >
                    <Icon />
                    <p>{nav.name}</p>
                  </div>
                </Link>
              );
            })}
        </div>
        <div className={`${styles.navigation__list} ${styles.second}`}>
          <Link to={`/en/settings`}>
            <div className={`${styles.icon}`}>
              <SettingsIcon />
              <p>Tənzimləmələr</p>
            </div>
          </Link>
          <button className={`${styles.icon}`} onClick={logOut}>
            <LogoutIcon />
            <p>Çıxış edin</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
