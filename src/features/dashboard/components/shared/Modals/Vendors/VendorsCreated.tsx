import styles from "../../../../../../components/Modal/Modal.module.scss";
import Input from "../../../../../../components/Input/Input.tsx";
import Button from "../../../../../../components/Button/Button.tsx";
import Modal from "../../../../../../components/Modal/Modal.tsx";
import { FormEvent, useContext, useRef } from "react";
import { LoaderContext } from "../../../../../../contexts/LoaderContext.tsx";
import FileInput from "../../../../../../components/FileInput/FileInput.tsx";
import SelectOption from "../../../../../../components/SelectOption/SelectOption.tsx";
import { postVendorCreateRequest } from "../../../../services/vendors.services.ts";
import { formCreator } from "../../../../../../libs/form.ts";
import { toast } from "react-toastify";

const VendorsCreated = ({ modalClose }: { modalClose: () => void }) => {
  const { setLoader } = useContext(LoaderContext);
  const inputsRef = {
    name: useRef<HTMLInputElement>(null),
    file: useRef<HTMLInputElement>(null),
    language: useRef<HTMLInputElement>(null),
    contract_start_date: useRef<HTMLInputElement>(null),
    contract_end_date: useRef<HTMLInputElement>(null),
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoader(true);
    console.log(inputsRef.name.current?.value);
    console.log(inputsRef.contract_start_date.current?.value);
    console.log(inputsRef.contract_end_date.current?.value);
    console.log(inputsRef.language.current?.value);
    console.log(inputsRef.file.current?.value);

    const formData = formCreator([
      {
        name: "name",
        data: inputsRef.name.current?.value,
      },
      {
        name: "file",
        data: inputsRef.file.current?.files?.[0],
      },
      {
        name: "contract_start_time",
        data: inputsRef.contract_start_date.current?.value,
      },
      {
        name: "contract_end_time",
        data: inputsRef.contract_end_date.current?.value,
      },
      {
        name: "contract_language",
        data: inputsRef.language.current?.value,
      },
    ]);
    const { status } = await postVendorCreateRequest(formData);
    if (status === 200) {
      modalClose();
      toast.success("Contract verified successfully.");
    }
    setLoader(false);
    modalClose();
  };

  return (
    <Modal name={"Vendor Elave Edin"} modalClose={modalClose}>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.form__inputs}>
          <Input label={"Vendorun Adi"} inputRef={inputsRef.name} required />
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
          <SelectOption
            inputRef={inputsRef.language}
            required
            options={[
              { name: "AZE", value: "aze" },
              { name: "ENG", value: "eng" },
              { name: "RUS", value: "rus" },
            ]}
          />
          <FileInput inputRef={inputsRef.file} />
        </div>

        <div className={styles.form__buttons}>
          <Button text={"Ləğv et"} viewType={"dark-blue"} type={"button"} />
          <Button text={"Yadda saxla"} type={"submit"} />
        </div>
      </form>
    </Modal>
  );
};

export default VendorsCreated;
