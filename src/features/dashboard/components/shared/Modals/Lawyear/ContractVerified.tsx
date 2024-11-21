import Button from "../../../../../../components/Button/Button.tsx";
import styles from "../../../../../../components/Modal/Modal.module.scss";
import Modal from "../../../../../../components/Modal/Modal.tsx";
import Input from "../../../../../../components/Input/Input.tsx";
import { FormEvent, useContext, useRef } from "react";
import {
  formCreator,
  onlyNumberInputValues,
} from "../../../../../../libs/form.ts";
import { LoaderContext } from "../../../../../../contexts/LoaderContext.tsx";
import { postContractVerifiedRequest } from "../../../../services/lawyers.services.ts";
import { toast } from "react-toastify";

const ContractVerified = ({
  id,
  modalClose,
}: {
  id: number;
  modalClose: () => void;
}) => {
  const { setLoader } = useContext(LoaderContext);
  const inputsRef = {
    contract_start_date: useRef<HTMLInputElement>(null),
    contract_end_date: useRef<HTMLInputElement>(null),
    max_credit_limit: useRef<HTMLInputElement>(null),
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoader(true);
    const formData = formCreator([
      {
        name: "max_credit_limit",
        data: inputsRef.max_credit_limit.current?.value,
      },
      {
        name: "contract_start_time",
        data: inputsRef.contract_start_date.current?.value,
      },
      {
        name: "contract_end_time",
        data: inputsRef.contract_end_date.current?.value,
      },
    ]);
    const { status } = await postContractVerifiedRequest(formData, id);
    if (status === 200) {
      modalClose();
      toast.success("Contract verified successfully.");
    }
    setLoader(false);
  };

  return (
    <Modal name={"Müqaviləyə düzəliş et"} modalClose={modalClose}>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.form__inputs}>
          <div className={styles.grid}>
            <Input
              label={"Contractin Bashlama Tarixi"}
              type={"date"}
              inputRef={inputsRef.contract_start_date}
              required
            />
            <Input
              label={"Contractin Bitme Tarixi"}
              type={"date"}
              inputRef={inputsRef.contract_end_date}
              required
            />
          </div>
          <Input
            maxLength={10}
            label={"Maximim Kredit Limiti"}
            inputRef={inputsRef.max_credit_limit}
            required
            onChange={(event) => {
              onlyNumberInputValues(event);
            }}
          />
        </div>

        <div className={styles.form__buttons}>
          <Button
            text={"Ləğv et"}
            viewType={"dark-blue"}
            style={{
              width: "fit-content",
              paddingInline: 20,
            }}
            type={"button"}
          />
          <Button
            text={"Yadda saxla"}
            style={{
              width: "fit-content",
              paddingInline: 32,
            }}
            type={"submit"}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ContractVerified;
