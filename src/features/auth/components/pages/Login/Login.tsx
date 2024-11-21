import styles from "./Login.module.scss";
import Tabs from "../../../../../components/Tabs/Tabs.tsx";

import { loginInputs, loginTabs } from "../../../auth.constants.ts";
import Input from "../../../../../components/Input/Input.tsx";
import { AuthPageIcon } from "../../../../../assets/images/auth/auth.vector.tsx";
import { FormEvent, useContext, useRef } from "react";
import Button from "../../../../../components/Button/Button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoaderContext } from "../../../../../contexts/LoaderContext.tsx";
import { formCreator } from "../../../../../libs/form.ts";
import { loginRequest } from "../../../auth.services.ts";
import { AuthContext } from "../../../../../contexts/AuthContext.tsx";
import { setCookie } from "../../../../../libs/cookie.ts";

const Login = () => {
  const { t, i18n } = useTranslation();
  const { setLoader } = useContext(LoaderContext);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const inputRefs = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setLoader(true);

    const formData = formCreator([
      {
        name: "email",
        data: inputRefs.email.current?.value || "",
      },
      {
        name: "password",
        data: inputRefs.password.current?.value || "",
      },
    ]);

    const { data, status } = await loginRequest(formData);
    if (status == 200) {
      setAuth({
        isAuth: true,
        role: data.role,
      });
      setCookie("allianceToken", data?.token, 15);
      navigate(`/${i18n.language}/home`);
    } else {
      console.log("error");
    }

    setLoader(false);
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__tabs}>
        <Tabs tabs={loginTabs} active={0} />
      </div>

      <form className={styles.login__form} onSubmit={login}>
        <div className={styles.login__form__title}>
          <AuthPageIcon />
          <h1>{t("auth.login.title")}</h1>
        </div>
        {loginInputs.map((input, index) => (
          <Input
            key={index}
            label={t(input.label)}
            placeholder={t(input.placeholder)}
            icon={input.icon}
            type={input.type}
            required
            inputRef={inputRefs[input.inputRefName as keyof typeof inputRefs]}
          />
        ))}

        <Link
          to={`/${i18n.language}/auth/forget`}
          className={styles.login__form__redirect}
        >
          {t("auth.login.buttons.forget")}
        </Link>

        <div className={styles.login__buttons}>
          <Button text={t("auth.login.buttons.sign__in")} type={"submit"} />
          <Button
            text={t("auth.login.buttons.quotation")}
            style={{
              background: "rgba(67, 107, 253, 0.16)",
            }}
            textStyle={{
              color: "#436BFD",
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
