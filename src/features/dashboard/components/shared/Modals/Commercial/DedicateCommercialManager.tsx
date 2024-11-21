import styles from "../../../../../../components/Modal/Modal.module.scss";
import SelectOption from "../../../../../../components/SelectOption/SelectOption.tsx";
import { useRef } from "react";
import Button from "../../../../../../components/Button/Button.tsx";
import Modal from "../../../../../../components/Modal/Modal.tsx";

const DedicateCommercialManager = ({
  id,
  modalClose,
}: {
  id: number;
  modalClose: () => void;
}) => {
  const inputsRef = {
    commercial_manager: useRef<HTMLInputElement>(null),
  };

  const submit = async () => {
    console.log(inputsRef.commercial_manager.current?.value);
    console.log(id);
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
            inputRef={inputsRef.commercial_manager}
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

export default DedicateCommercialManager;
