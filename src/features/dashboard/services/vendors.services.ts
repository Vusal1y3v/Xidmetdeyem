import axios from "axios";
import { getCookie } from "../../../libs/cookie.ts";
const apiUrl = import.meta.env.VITE_API_URL;

// Contract Crud
export const getVerifiedVendorsContractsRequest = async (
  page: number,
  name: string,
  start_date: string,
  end_date: string,
) => {
  return await axios
    .get(
      `${apiUrl}/buyers/get-all-verify-vendor/?page=${page}&pageSize=10&name=${name}&start_date=${start_date}&end_date=${end_date}`,
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

export const getPendingApprovalVendorsContractsRequest = async (
  page: number,
  name: string,
  start_date: string,
  end_date: string,
) => {
  return await axios
    .get(
      `${apiUrl}/buyers/get-all-unverify-vendor/?page=${page}&pageSize=10&name=${name}&start_date=${start_date}&end_date=${end_date}`,
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

export const getEmptyVendorsContractsRequest = async (
  page: number,
  name: string,
  start_date: string,
  end_date: string,
) => {
  return await axios
    .get(
      `${apiUrl}/buyers/get-all-empty-vendor/?page=${page}&pageSize=10&name=${name}&start_date=${start_date}&end_date=${end_date}`,
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

export const postVendorsVerifiedContractRequest = async (id: number) => {
  return await axios
    .get(`${apiUrl}/lawyer/verified-vendor/?id=${id}`, {
      headers: {
        Authorization: getCookie("allianceToken"),
      },
    })
    .catch((err) => {
      return err.response;
    });
};

export const postVendorsUnverifiedContractRequest = async (id: number) => {
  return await axios
    .get(`${apiUrl}/lawyer/unverified-vendor-contract/?id=${id}`, {
      headers: {
        Authorization: getCookie("allianceToken"),
      },
    })
    .catch((err) => {
      return err.response;
    });
};

export const postVendorsDeletedContractRequest = async (id: number) => {
  return await axios
    .get(`${apiUrl}/lawyer/delete-vendor-contract/?id=${id}`, {
      headers: {
        Authorization: getCookie("allianceToken"),
      },
    })
    .catch((err) => {
      return err.response;
    });
};

export const postVendorCreateRequest = async (formData: FormData) => {
  return await axios
    .post(`${apiUrl}/buyers/create-vendor/`, formData, {
      headers: {
        Authorization: getCookie("allianceToken"),
      },
    })
    .catch((err) => {
      return err.response;
    });
};
