import styles from "./Success.module.scss";
import {
  ArrowBackIcon,
  SuccessIcon,
} from "../../../../../assets/images/auth/auth.vector.tsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../../../../contexts/LoaderContext.tsx";
import { registerVerifyResponse } from "../../../auth.services.ts";
import { toast } from "react-toastify";

const Success = () => {
  const { setLoader } = useContext(LoaderContext);
  const { t } = useTranslation();
  const queryParams = new URLSearchParams(location.search);
  const registerVerificationToken = queryParams.get("token");
  const [success, setSuccess] = useState<boolean>(false);

  const registerVerification = async () => {
    const { status, data } = await registerVerifyResponse(
      `${registerVerificationToken}`,
    );

    if (status === 200) {
      setLoader(false);
      setSuccess(true);
      console.log(data);
    } else toast.error("Error");
  };

  useEffect(() => {
    if (registerVerificationToken === null) setLoader(false);
    else {
      setLoader(true);
      registerVerification().catch(() => {});
    }
  }, []);

  return (
    <div className={styles.success}>
      <div className={styles.success__info}>
        <SuccessIcon />
        <h1 className={styles.success__info__title}>
          {success
            ? "User Tesdiqlendi"
            : "Your registeration request has been taken"}
        </h1>
        <p className={styles.success__info__subtitle}>
          {success
            ? "User Tesdiqlendi"
            : `Your account details will be sent to your

            ${(
              <Link className={styles.success__info__subtitle__link} to={"/"}>
                name.surname@gmail.com
              </Link>
            )} email address`}
        </p>
      </div>

      <div className={styles.success__redirect}>
        <ArrowBackIcon />
        <Link to={"/en/auth/login"}>{t("auth.register.buttons.redirect")}</Link>
      </div>
    </div>
  );
};

export default Success;
