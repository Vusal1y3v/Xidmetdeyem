import styles from "../../pages/Lawyers/Lawyers.module.scss";
import Input from "../../../../../components/Input/Input.tsx";
import { ChangeEvent } from "react";

const VendorFilterContent = ({ inputsState, setInputsState }: any) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputsState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles.lawyers__filter}>
      <Input
        name="name"
        value={inputsState.email}
        onChange={handleChange}
        label="Email"
      />
      <Input
        name="contract_start_date"
        value={inputsState.contract_start_date}
        onChange={handleChange}
        label="Contract Start Date"
        type={"date"}
      />
      <Input
        name="contract_end_date"
        value={inputsState.contract_end_date}
        onChange={handleChange}
        label="Contract End Date"
        type={"date"}
      />
    </div>
  );
};

export default VendorFilterContent;
