import Button from "../../../../../../components/Button/Button.tsx";
import styles from "../../../../../../components/Modal/Modal.module.scss";
import Modal from "../../../../../../components/Modal/Modal.tsx";
import Input from "../../../../../../components/Input/Input.tsx";
import { ChangeEvent, FormEvent, useContext, useRef } from "react";
import {
  formCreator,
  onlyNumberInputValues,
} from "../../../../../../libs/form.ts";
import { LoaderContext } from "../../../../../../contexts/LoaderContext.tsx";
import { toast } from "react-toastify";
import SelectOption from "../../../../../../components/SelectOption/SelectOption.tsx";
import TextArea from "../../../../../../components/TextArea/TextArea.tsx";
import FileInput from "../../../../../../components/FileInput/FileInput.tsx";
import { postChangeUserBalanceRequest } from "../../../../services/financial.service.ts";

const ChangeUserBalance = ({
  id,
  modalClose,
}: {
  id: number;
  modalClose: () => void;
}) => {
  const { setLoader } = useContext(LoaderContext);

  const inputsRef = {
    type: useRef<HTMLInputElement>(null),
    balance: useRef<HTMLInputElement>(null),
    note: useRef<HTMLInputElement>(null),
    file: useRef<HTMLInputElement>(null),
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoader(true);
    const formData = formCreator([
      {
        name: "file",
        data: inputsRef.file.current?.files?.[0],
      },
      {
        name: "balance",
        data: inputsRef.balance.current?.value,
      },
      {
        name: "not",
        data: inputsRef.note.current?.value,
      },
      {
        name: "type",
        data: inputsRef.type.current?.value,
      },
    ]);
    const { status } = await postChangeUserBalanceRequest(formData, id);
    if (status === 200) {
      modalClose();
      toast.success("Contract verified successfully.");
    }
    setLoader(false);
  };

  return (
    <Modal name={"Balas Basliq"} modalClose={modalClose}>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.form__inputs}>
          <SelectOption
            label={"Əməliyyat"}
            options={[
              {
                name: "Balansi Artir",
                value: "add",
              },
              {
                name: "Balansi Azalt",
                value: "reduce",
              },
            ]}
            required
            inputRef={inputsRef.type}
          />

          <Input
            label={"Price"}
            type={"input"}
            inputRef={inputsRef.balance}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onlyNumberInputValues(event);
            }}
            required
          />

          <TextArea label={"Not"} inputRef={inputsRef.note} />

          <FileInput inputRef={inputsRef.file} />
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

export default ChangeUserBalance;
