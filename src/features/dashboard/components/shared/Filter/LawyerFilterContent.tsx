import styles from "../../pages/Lawyers/Lawyers.module.scss";
import Input from "../../../../../components/Input/Input.tsx";
import { ChangeEvent } from "react";

const LawyerFilterContent = ({ inputsState, setInputsState }: any) => {
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
        name="full_name"
        value={inputsState.full_name}
        onChange={handleChange}
        label="Full name"
      />
      <Input
        name="email"
        value={inputsState.email}
        onChange={handleChange}
        label="Email"
      />
      <Input
        name="phone"
        value={inputsState.phone}
        onChange={handleChange}
        label="Phone"
      />
      <Input
        name="identity_number"
        value={inputsState.identity_number}
        onChange={handleChange}
        label="Identity number"
      />
      <Input
        name="company_name"
        value={inputsState.company_name}
        onChange={handleChange}
        label="Company number"
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

export default LawyerFilterContent;
