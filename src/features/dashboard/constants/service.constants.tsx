import { ServiceModel } from "../models/dashboard.model.ts";
import { dateStringConverter } from "../../../libs/date.ts";
import MoreButton from "../../../components/MoreButton/MoreButton.tsx";

export const ServiceRenderRow = (
  value: ServiceModel,
  index: number,
  activeTabs: number,
  role: string,
  verified: () => void,
  unverified: () => void,
) => {
  return (
    <tr key={`row_data_${index}`}>
      <td>{value.name}</td>
      <td>{value.raw_cost}</td>
      <td>{value.selling_price}</td>
      <td>
        <a href={`${value.contract}`}>Contract</a>
      </td>
      <td>{dateStringConverter(value.contract_start_date)}</td>
      <td>{dateStringConverter(value.contract_end_date)}</td>
      <td>{value.contract_language}</td>
      <td>{value.city.Country.name}</td>
      <td>{value.contract_language}</td>
      {/*<td>{value.city.Country.name}</td>*/}
      {/*<td>{value.vendor.ID}</td>*/}
      {/*<td>{value.route_service_country.name}</td>*/}
      {/*<td>{value.route_service_country.ID}</td>*/}

      {role === "lawyer" && activeTabs !== 2 && (
        <MoreButton>
          {activeTabs === 1 && (
            <button onClick={verified}>Contracti Tesdiqle</button>
          )}
          {activeTabs !== 2 && (
            <button onClick={unverified}>Contracti Deaktiv Et</button>
          )}
        </MoreButton>
      )}
    </tr>
  );
};

export const ServiceTabsConstants = [
  {
    name: "Tesdiqlenmish",
    tab: 0,
  },
  {
    name: "Tesdiqlenmeyi gozleyen",
    tab: 1,
  },
  {
    name: "Hec Olmayan",
    tab: 2,
  },
];

export const ServiceFilterConstants = {
  name: "",
  contract_start_date: "",
  contract_end_date: "",
};

export const ServiceModalConfig = [
  {
    name: "verified",
    title: "Vendoru Tesdiqle ucun",
    doneTitle: "Active Etmek",
  },
  {
    name: "unverified",
    title: "Vendoru Tesdiqlememek ucun",
    doneTitle: "Deactive Etmek",
  },
  {
    name: "deleted",
    title: "Vendoru Silmek ucun",
    doneTitle: "Silmek",
  },
];

export const ServiceModalConstants = {
  verified: null,
  unverified: null,
  deleted: null,
  created: false,
};
