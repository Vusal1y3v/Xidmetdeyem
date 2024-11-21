import styles from "./Forget.module.scss";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  AuthPageIcon,
  MailIcon,
} from "../../../../../assets/images/auth/auth.vector.tsx";
import Input from "../../../../../components/Input/Input.tsx";
import Button from "../../../../../components/Button/Button.tsx";

const Forget = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className={styles.forget}>
      <div className={styles.forget__info}>
        <Link
          to={`/${i18n.language}/auth/login`}
          className={styles.forget__info__redirect}
        >
          <ArrowLeftIcon /> {t("auth.shared.back")}
        </Link>

        <h1 className={styles.forget__info__title}>
          <AuthPageIcon /> {t("auth.forget.title")}
        </h1>

        <p className={styles.forget__info__subtitle}>
          {t("auth.forget.subtitle")}
        </p>
      </div>

      <form className={styles.forget__form} action="">
        <Input
          label={t("auth.shared.inputs.email")}
          placeholder={"you@site.com"}
          icon={MailIcon}
        />
        <Button text={t("auth.forget.buttons.send")} type={"submit"} />
      </form>
    </div>
  );
};

export default Forget;
