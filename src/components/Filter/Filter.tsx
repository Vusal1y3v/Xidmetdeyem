import styles from "./Filter.module.scss";
import Tabs from "../Tabs/Tabs.tsx";
import Button from "../Button/Button.tsx";
import { FilterIcon } from "../../assets/images/shared/shared.vectore.tsx";
import { FormEvent, ReactNode, useState } from "react";
import { CloseIcon } from "../../assets/images/layout/dashboard.vector.tsx";

const Filter = ({
  tabs,
  activeTabs,
  buttons,
  children,
  onFilter,
  onClear,
}: {
  tabs?: any[];
  activeTabs?: number;
  buttons?: any[];
  children: ReactNode;
  onFilter: () => void;
  onClear: () => void;
}) => {
  const [filter, setFilter] = useState<boolean>(false);

  return (
    <>
      <div className={styles.filter}>
        <div className={styles.filter__button}>
          <Button
            text={"Filter"}
            icon={FilterIcon}
            onClick={() => {
              setFilter(!filter);
            }}
          />
          {buttons?.map((button, index) => (
            <Button key={index} text={button.title} onClick={button.onClick} />
          ))}
        </div>

        {tabs && (
          <div className={styles.filter__tabs}>
            <Tabs tabs={tabs} active={activeTabs} />
          </div>
        )}
      </div>

      <div className={`${styles.filter__box} ${filter && styles.active}`}>
        <div className={styles.filter__box__content}>
          <div className={styles.filter__box__content__info}>
            <p>Filters</p>
            <button
              onClick={() => {
                setFilter(!filter);
              }}
            >
              <CloseIcon />
            </button>
          </div>

          <form
            onSubmit={(event: FormEvent) => {
              event.preventDefault();
              onFilter();
              setFilter(!filter);
            }}
          >
            {children}

            <div className={styles.filter__box__content__buttons}>
              <Button text={"Filterle"} type={"submit"} />
              <Button
                text={"Sifirla"}
                viewType={"dark-blue"}
                onClick={() => {
                  onClear();
                  setFilter(!filter);
                }}
                type={"button"}
              />
            </div>
          </form>
        </div>
        <div
          onClick={() => {
            setFilter(!filter);
          }}
          className={styles.filter__box__overlay}
        ></div>
      </div>
    </>
  );
};

export default Filter;
