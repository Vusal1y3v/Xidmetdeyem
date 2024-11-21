import styles from "./Settings.module.scss";
import Input from "../../../../../components/Input/Input.tsx";
import Button from "../../../../../components/Button/Button.tsx";
import { FormEvent } from "react";

const Settings = () => {
  const changePassword = (event: FormEvent) => {
    event.preventDefault();
    console.log("salam");
  };

  return (
    <div className={styles.settings}>
      <h1 className={styles.settings__title}>Profile Settings</h1>
      <form
        onSubmit={changePassword}
        className={styles.settings__form}
        action=""
      >
        <Input label={"Old Password"} />
        <Input label={"New Password"} />
        <Input label={"Rewrite New Password"} />
        <Button text={"Save"} type={"submit"} />
      </form>
    </div>
  );
};

export default Settings;
