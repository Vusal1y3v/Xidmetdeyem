import axios from "axios";
import { getCookie } from "../../../libs/cookie.ts";
const apiUrl = import.meta.env.VITE_API_URL;

export const getUserBalanceActivitiesRequest = async (
  page: number,
  name: string,
  not: string,
  process_type: string,
  amount_min: number,
  amount_max: number,
) => {
  return await axios
    .get(
      `${apiUrl}/invoice/get-all-invoice/?page=${page}&pageSize=10&user=${name}&not=${not}&process_type=${process_type}&amount_min=${amount_min}&amount_max=${amount_max}`,
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

export const postChangeUserBalanceRequest = async (
  formData: FormData,
  id: number,
) => {
  return await axios
    .post(`${apiUrl}/invoice/change-balance/?id=${id}`, formData, {
      headers: {
        Authorization: getCookie("allianceToken"),
      },
    })
    .catch((err) => {
      return err.response;
    });
};
