import axios from "axios";
import { getCookie } from "../../libs/cookie";
const apiUrl = import.meta.env.VITE_API_URL;

export const loginRequest = async (data: FormData) => {
  return await axios.post(`${apiUrl}/accounts/login/`, data).catch((err) => {
    return err.response;
  });
};

export const registerRequest = async (data: FormData) => {
  return await axios.post(`${apiUrl}/accounts/register/`, data).catch((err) => {
    return err.response;
  });
};

export const registerVerifyResponse = async (token: string) => {
  return await axios
    .get(`${apiUrl}/accounts/verify/?token=${token}`)
    .catch((err) => {
      return err.response;
    });
};

export const checkRequest = async () => {
  return await axios
    .get(`${apiUrl}/accounts/check-user/`, {
      headers: {
        Authorization: getCookie("allianceToken"),
      },
    })
    .catch((error) => {
      return error;
    });
};

export const logoutRequest = async () => {
  return await axios
    .get(`${apiUrl}/accounts/logout/`, {
      headers: {
        Authorization: getCookie("allianceToken"),
      },
    })
    .catch((err) => {
      return err.response;
    });
};
