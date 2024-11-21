import styles from "../../../../../../components/Modal/Modal.module.scss";
import Input from "../../../../../../components/Input/Input.tsx";
import SelectOption from "../../../../../../components/SelectOption/SelectOption.tsx";
import FileInput from "../../../../../../components/FileInput/FileInput.tsx";
import Button from "../../../../../../components/Button/Button.tsx";
import Modal from "../../../../../../components/Modal/Modal.tsx";
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { LoaderContext } from "../../../../../../contexts/LoaderContext.tsx";
import { formCreator } from "../../../../../../libs/form.ts";
import { postVendorCreateRequest } from "../../../../services/vendors.services.ts";
import { toast } from "react-toastify";
import {
  getAllCountries,
  getAllCountryCites,
} from "../../../../services/service.services.ts";
import Tabs from "../../../../../../components/Tabs/Tabs.tsx";

const ServicesCreated = ({ modalClose }: { modalClose: () => void }) => {
  const { setLoader } = useContext(LoaderContext);
  const [isRouteService, setIsRouteService] = useState<boolean>(false);

  const [countriesInfo, setCountriesInfo] = useState<{
    countries: { name: string; id: number }[];
    city: { name: string; id: number }[];
    selectedCity: number | null;
  }>({
    countries: [],
    city: [],
    selectedCity: null,
  });

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

  const getCountry = async () => {
    const { status, data } = await getAllCountries();
    if (status === 200) {
      setCountriesInfo((prevState) => ({
        ...prevState,
        countries: data,
      }));
    }
  };

  const getCity = async () => {
    const { status, data } = await getAllCountryCites(
      Number(countriesInfo.selectedCity),
    );
    if (status === 200) {
      setCountriesInfo((prevState) => ({
        ...prevState,
        city: data,
      }));
    }
  };

  useEffect(() => {
    getCountry().catch(() => {});
    getCity().catch(() => {});
  }, []);

  useEffect(() => {
    getCity().catch(() => {});
  }, [countriesInfo.selectedCity]);

  return (
    <Modal name={"Service Elave Edin"} modalClose={modalClose}>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.form__inputs}>
          <div className={styles.grid}>
            <Input
              label={"Servicenin Adi"}
              inputRef={inputsRef.name}
              required
            />
            <Input label={"Row Cast"} inputRef={inputsRef.name} required />
          </div>

          <Tabs
            active={isRouteService ? 1 : 0}
            tabs={[
              {
                name: "None Route Country",
                tab: 0,
                onClick: () => setIsRouteService(false),
              },
              {
                name: "Route Country",
                tab: 1,
                onClick: () => setIsRouteService(true),
              },
            ]}
          />

          {isRouteService && (
            <div className={styles.grid}>
              <SelectOption
                inputRef={inputsRef.language}
                label={"Select Country"}
                required
                options={countriesInfo.countries?.map((item) => ({
                  name: item.name,
                  value: item.id,
                }))}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  setCountriesInfo((prevState) => ({
                    ...prevState,
                    selectedCity: Number(event.target.value),
                  }));
                }}
              />
              <SelectOption
                inputRef={inputsRef.language}
                label={"Select Cite"}
                required
                disabled={!countriesInfo.selectedCity}
                options={countriesInfo.city?.map((item) => ({
                  name: item.name,
                  value: item.id,
                }))}
              />
            </div>
          )}

          <Input
            label={"Selling Price"}
            inputRef={inputsRef.name}
            type={"number"}
            required
          />
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
            label={"Select contract language"}
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

export default ServicesCreated;
