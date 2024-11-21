import React from "react";
// Dynamic Modal state updater function
export const updateModalState = (
  _setModal: React.Dispatch<React.SetStateAction<any>>,
  type: string,
  value: number | boolean | null,
) => {
  _setModal((prevState: any) => ({
    ...prevState,
    [type]: value,
  }));
};

// Dynamic state updater function
export const updateState = (
  _setModal: React.Dispatch<React.SetStateAction<any>>,
  key: string,
  value: any,
) => {
  _setModal((prevState: any) => ({
    ...prevState,
    [key]: value,
  }));
};
