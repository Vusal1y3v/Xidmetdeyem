import React from "react";
import { CloseIcon } from "../../assets/images/layout/dashboard.vector.tsx";
import styles from "./Modal.module.scss";

const Modal = ({
  name,
  modalClose,
  children,
}: {
  name?: string;
  modalClose: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <div className={styles.modal}>
      <div onClick={modalClose} className={styles.modal__outer}></div>
      <div className={styles.modal__inner}>
        <div className={styles.head}>
          {name && <p className={styles.title}>{name}</p>}
          <button onClick={modalClose}>
            <CloseIcon />
          </button>
        </div>
        <>{children}</>
      </div>
    </div>
  );
};

export default Modal;
