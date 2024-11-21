import { UserModel } from "../models/dashboard.model.ts";
import { dateStringConverter } from "../../../libs/date.ts";
import MoreButton from "../../../components/MoreButton/MoreButton.tsx";

export const FinancialRenderRow = (
  value: UserModel,
  index: number,
  changeBalance: () => void,
) => {
  return (
    <tr key={`row_data_${index}`}>
      <td>{value.id}</td>
      <td>{value.full_name}</td>
      <td>{value.email}</td>
      <td>{value.phone}</td>
      <td>{value.role}</td>
      <td>{value.balance}</td>
      <td>
        <a href={`${value.contract}`}>Contract</a>
      </td>
      <td>{dateStringConverter(`${value.contract_start_date}`)}</td>
      <td>{dateStringConverter(`${value.contract_end_date}`)}</td>

      <td>{value.company_name || "Individual User"}</td>
      <td>{value.identity_number}</td>
      <MoreButton>
        <button onClick={changeBalance}>Userin Balansin Deyish</button>
      </MoreButton>
    </tr>
  );
};

export const FinancialModalConstants = {
  balance: null,
};
