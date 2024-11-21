import React, { useContext, useEffect } from "react";
import styles from "./AuthLayout.module.scss";

// Images
import AuthLayoutBg from "../../../../assets/images/auth/auth_layout_bg.png";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../../contexts/AuthContext.tsx";

const AuthLayout = ({
  children,
  changeSide,
}: {
  children: React.ReactNode;
  changeSide?: boolean;
}) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.isAuth) navigate(`/${i18n.language}/home`);
  }, []);

  return (
    <main className={`${styles.auth} ${changeSide && styles.active}`}>
      <section className={styles.auth__content}>
        <div className={styles.auth__content__title}>
          <Link to={"/"}>Logistics name</Link>
        </div>
        {children}
      </section>
      <section className={styles.auth__placeholder}>
        <img
          className={styles.auth__placeholder__background}
          src={AuthLayoutBg}
          alt=""
        />
      </section>
    </main>
  );
};

export default AuthLayout;
