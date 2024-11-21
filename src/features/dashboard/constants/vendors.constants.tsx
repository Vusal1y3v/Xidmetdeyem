import { VendorModel } from "../models/dashboard.model.ts";
import { dateStringConverter } from "../../../libs/date.ts";
import MoreButton from "../../../components/MoreButton/MoreButton.tsx";

export const VendorsRenderRow = (
  value: VendorModel,
  index: number,
  activeTabs: number,
  role: string,
  verified: () => void,
  unverified: () => void,
  deleted: () => void,
) => {
  return (
    <tr key={`row_data_${index}`}>
      <td>{value.id}</td>
      <td>{value.name}</td>
      <td>
        <a href={`${value.contract}`}>Contract</a>
      </td>
      <td>{dateStringConverter(value.contract_start_date)}</td>
      <td>{dateStringConverter(value.contract_end_date)}</td>
      <td>{value.contract_language}</td>
      {role === "lawyer" && activeTabs !== 2 && (
        <MoreButton>
          {activeTabs === 1 && (
            <>
              <button onClick={verified}>Contracti Tesdiqle</button>
              <button onClick={deleted}>Contracti Sil</button>
            </>
          )}
          {activeTabs === 0 && (
            <button onClick={unverified}>Contracti deaktiv et</button>
          )}
        </MoreButton>
      )}
    </tr>
  );
};

export const VendorsTabsConstants = [
  { name: "Tesdiqlenmish", tab: 0 },
  { name: "Tesdiqlenmeyi gozleyen", tab: 1 },
  { name: "Hec Olmayan", tab: 2 },
];

export const VendorsModalConstants = {
  verified: null,
  unverified: null,
  deleted: null,
  created: false,
};

export const VendorsFilterConstants = {
  name: "",
  contract_start_date: "",
  contract_end_date: "",
};

export const VendorsModalConfig = [
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
