import axios from "axios";
import { getCookie } from "../../../libs/cookie.ts";
const apiUrl = import.meta.env.VITE_API_URL;

export const getVerifiedServiceRequest = async (
  page: number,
  name: string,
  city: string,
  country: string,
  route_country: string,
  vendor: string,
  raw_cost_min: string,
  raw_cost_max: string,
  selling_price_min: string,
  selling_price_max: string,
  start_date: string,
  end_date: string,
) => {
  return await axios
    .get(
      `${apiUrl}/buyers/get-all-verify-vendor-services/?page=${page}&pageSize=10&name=${name}&city=${city}&country=${country}&route_country=${route_country}&vendor=${vendor}&raw_cost_min=${raw_cost_min}&raw_cost_max=${raw_cost_max}&selling_price_min=${selling_price_min}&selling_price_max=${selling_price_max}&contract_start_date=${start_date}&contract_end_date=${end_date}&start_date=${start_date}&end_date=${end_date}`,
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

export const getAllCountries = async () => {
  return await axios
    .get(`${apiUrl}/country/get-all-countries/`, {
      headers: {
        Authorization: getCookie("allianceToken"),
      },
    })
    .catch((err) => {
      return err.response;
    });
};

export const getAllCountryCites = async (countryId: number) => {
  return await axios
    .get(`${apiUrl}/country/get-all-country-cities/?id=${countryId}`, {
      headers: {
        Authorization: getCookie("allianceToken"),
      },
    })
    .catch((err) => {
      return err.response;
    });
};
