import { UserModel } from "../models/dashboard.model.ts";
import { dateStringConverter } from "../../../libs/date.ts";
import MoreButton from "../../../components/MoreButton/MoreButton.tsx";

export const LawyersRenderRow = (
  value: UserModel,
  index: number,
  activeTabs: number,
  verified: () => void,
  unverified: () => void,
) => {
  return (
    <tr key={`row_data_${index}`}>
      <td>{value.id}</td>
      <td>{value.full_name}</td>
      <td>{value.email}</td>
      <td>{value.phone}</td>
      <td>{value.role}</td>
      <td>{value.balance}</td>
      {activeTabs !== 2 && (
        <td>
          <a href={`${value.contract}`}>Contract</a>
        </td>
      )}
      {activeTabs === 0 && (
        <td>{dateStringConverter(`${value.contract_start_date}`)}</td>
      )}
      {activeTabs === 0 && (
        <td>{dateStringConverter(`${value.contract_end_date}`)}</td>
      )}

      <td>{value.company_name || "Individual User"}</td>
      <td>{value.identity_number}</td>
      {activeTabs !== 2 && (
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

export const LawyersModalConstants = {
  verified: null,
  unverified: null,
};

export const LawyersFilterConstants = {
  full_name: "",
  email: "",
  phone: "",
  identity_number: "",
  company_name: "",
  contract_start_date: "",
  contract_end_date: "",
};

export const LawyersTabsConstants = [
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
