import styles from "./Register.module.scss";
import Tabs from "../../../../../components/Tabs/Tabs.tsx";
import {
  registerCompanyInputs,
  registerIndividualInputs,
} from "../../../auth.constants.ts";
import Input from "../../../../../components/Input/Input.tsx";
import { FormEvent, useContext, useRef, useState } from "react";
import Button from "../../../../../components/Button/Button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "../../../../../assets/images/auth/auth.vector.tsx";
import { useTranslation } from "react-i18next";
import { LoaderContext } from "../../../../../contexts/LoaderContext.tsx";
import { formCreator } from "../../../../../libs/form.ts";
import { toast } from "react-toastify";
import { registerRequest } from "../../../auth.services.ts";

const Register = () => {
  // React
  const { setLoader } = useContext(LoaderContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // States
  const [activeTab, setActiveTab] = useState<number>(0);

  // Constants
  const tabs = [
    {
      name: "auth.register.tabs.company",
      onClick: () => {
        setActiveTab(0);
      },
    },
    {
      name: "auth.register.tabs.individual",
      onClick: () => {
        setActiveTab(1);
      },
    },
  ];

  // Refs
  const inputRefs = {
    name: useRef<HTMLInputElement>(null),
    company: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    code: useRef<HTMLInputElement>(null),
    confirm__password: useRef<HTMLInputElement>(null),
  };

  // Functions
  const register = async (event: FormEvent) => {
    event.preventDefault();
    setLoader(true);

    const formData = formCreator([
      {
        name: "full_name",
        data: inputRefs.name.current?.value || "",
      },
      {
        name: "email",
        data: inputRefs.email.current?.value || "",
      },
      {
        name: "company_name",
        data: inputRefs.company.current?.value || "",
      },
      {
        name: "phone",
        data: inputRefs.phone.current?.value || "",
      },
      {
        name: "password",
        data: inputRefs.password.current?.value || "",
      },
      {
        name: "confirm_password",
        data: inputRefs.confirm__password.current?.value || "",
      },
      {
        name: "password",
        data: inputRefs.password.current?.value || "",
      },
      {
        name: "identity_number",
        data: inputRefs.code.current?.value || "",
      },
    ]);
    const { status, data } = await registerRequest(formData);

    if (status == 200) {
      console.log(data);
      navigate(`/${i18n.language}/auth/success`);
    } else toast.error("Failed");

    setLoader(false);
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>{t("auth.register.title")}</h1>

      <div className={styles.register__tabs}>
        <Tabs tabs={tabs} active={activeTab} />
      </div>

      <form
        autoComplete="off"
        onSubmit={register}
        className={`${styles.register__form} ${activeTab === 0 ? styles.company : styles.individual}`}
      >
        {activeTab === 0 &&
          registerCompanyInputs.map((input, index) => (
            <Input
              key={index}
              label={t(input.label)}
              placeholder={t(input.placeholder)}
              icon={input.icon}
              type={input.type}
              onChange={input.onChange}
              autoComplete="off"
              required
              inputRef={inputRefs[input.inputRefName as keyof typeof inputRefs]}
            />
          ))}

        {activeTab === 1 &&
          registerIndividualInputs.map((input, index) => (
            <Input
              key={index}
              label={t(input.label)}
              placeholder={t(input.placeholder)}
              type={input.type}
              icon={input.icon}
              onChange={input.onChange}
              autoComplete="new-password"
              required
              inputRef={inputRefs[input.inputRefName as keyof typeof inputRefs]}
            />
          ))}

        <div className={styles.register__buttons}>
          <div className={styles.register__buttons__redirect}>
            <ArrowBackIcon />
            <Link to={`/${i18n.language}/auth/login`}>
              {t("auth.register.buttons.redirect")}
            </Link>
          </div>
          <Button text={t("auth.register.buttons.next")} />
        </div>
      </form>
    </div>
  );
};

export default Register;
