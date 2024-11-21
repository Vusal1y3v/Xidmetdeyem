import axios from "axios";
import { getCookie } from "../../../libs/cookie.ts";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllUsersRequest = async (
  page: number,
  role: string,
  manager: string,
  name: string,
  phone: string,
  email: string,
  identity_number: string,
  company_name: string,
) => {
  return await axios
    .get(
      `${apiUrl}/accounts/get-all-user/?page=${page}&pageSize=10&full_name=${name}&phone=${phone}&email=${email}&identity_number=${identity_number}&company_name=${company_name}&manager=${manager}&role=${role}`,
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
