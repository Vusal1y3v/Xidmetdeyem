import axios from "axios";
import { getCookie } from "../../../libs/cookie.ts";
const apiUrl = import.meta.env.VITE_API_URL;

export const getVerifiedUsersContractRequest = async (
  page: number,
  name: string,
  phone: string,
  email: string,
  identity_number: string,
  company_name: string,
  start_date: string,
  end_date: string,
) => {
  return await axios
    .get(
      `${apiUrl}/accounts/get-verified/?page=${page}&pageSize=10&full_name=${name}&phone=${phone}&email=${email}&identity_number=${identity_number}&company_name=${company_name}&start_date=${start_date}&end_date=${end_date}`,
      {
        headers: {
          Authorization: getCookie("allianceToken"),
        },
      },
    )
    .catch((err) => {
      return err.response;
    });
};

export const getEmptyUsersContractRequest = async (
  page: number,
  name: string,
  phone: string,
  email: string,
  identity_number: string,
  company_name: string,
  start_date: string,
  end_date: string,
) => {
  return await axios
    .get(
      `${apiUrl}/accounts/get-empty/?page=${page}&pageSize=10&full_name=${name}&phone=${phone}&email=${email}&identity_number=${identity_number}&company_name=${company_name}&start_date=${start_date}&end_date=${end_date}`,
      {
        headers: {
          Authorization: getCookie("allianceToken"),
        },
      },
    )
    .catch((err) => {
      return err.response;
    });
};

export const getContractUsersPendingApprovalRequest = async (
  page: number,
  name: string,
  phone: string,
  email: string,
  identity_number: string,
  company_name: string,
  start_date: string,
  end_date: string,
) => {
  return await axios
    .get(
      `${apiUrl}/accounts/get-no-verified/?page=${page}&pageSize=10&full_name=${name}&phone=${phone}&email=${email}&identity_number=${identity_number}&company_name=${company_name}&start_date=${start_date}&end_date=${end_date}`,
      {
        headers: {
          Authorization: getCookie("allianceToken"),
        },
      },
    )
    .catch((err) => {
      return err.response;
    });
};

export const postContractVerifiedRequest = async (
  formData: FormData,
  id: number,
) => {
  return await axios
    .post(`${apiUrl}/lawyer/verified/?id=${id}`, formData, {
      headers: {
        Authorization: getCookie("allianceToken"),
      },
    })
    .catch((err) => {
      return err.response;
    });
};

export const postContractUnverifiedRequest = async (id: number) => {
  return await axios
    .get(`${apiUrl}/lawyer/unverified/?id=${id}`, {
      headers: {
        Authorization: getCookie("allianceToken"),
      },
    })
    .catch((err) => {
      return err.response;
    });
};
