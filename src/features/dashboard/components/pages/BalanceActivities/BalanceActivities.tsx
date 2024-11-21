import styles from "../Lawyers/Lawyers.module.scss";
import Filter from "../../../../../components/Filter/Filter.tsx";
import Table from "../../../../../components/Table/Table.tsx";
import { InvoicesModel } from "../../../models/dashboard.model.ts";
import { useContext, useEffect, useState } from "react";
import LawyerFilterContent from "../../shared/Filter/LawyerFilterContent.tsx";
import { LawyersFilterConstants } from "../../../constants/lawyers.constants.tsx";
import { PageHelperModel } from "../../../models/shared.model.ts";
import { LoaderContext } from "../../../../../contexts/LoaderContext.tsx";
import { useLocation } from "react-router-dom";
import { LawyersFilterType } from "../../../models/lawyers.model.ts";
import { getUserBalanceActivitiesRequest } from "../../../services/financial.service.ts";

const BalanceActivities = () => {
  const { setLoader } = useContext(LoaderContext);
  const { search } = useLocation();

  const [pageHelper, setPageHelper] = useState<PageHelperModel>({
    page: Number(new URLSearchParams(search).get("page")) || 1,
    reFetch: false,
    response: null,
  });

  // dasdas
  const getBalanceActivities = async () => {
    setLoader(true);
    const { status, data } = await getUserBalanceActivitiesRequest(
      pageHelper.page,
      "",
      "",
      "",
      0,
      0,
    );
    if (status === 200) {
      setPageHelper((prevState) => ({
        ...prevState,
        response: data,
      }));
    }
    setLoader(false);
  };

  const [filterInputsData, setFilterInputsData] = useState<LawyersFilterType>({
    ...LawyersFilterConstants,
  });

  useEffect(() => {
    getBalanceActivities().catch(() => {});
  }, [pageHelper.page, pageHelper.reFetch]);

  useEffect(() => {
    setPageHelper((prevState) => ({
      ...prevState,
      page: Number(new URLSearchParams(search).get("page")) || 1,
    }));
  }, [search]);

  return (
    <div className={styles.lawyers}>
      <Filter
        onFilter={() => {
          setPageHelper((prevState) => ({
            ...prevState,
            reFetch: !prevState.reFetch,
          }));
        }}
        onClear={() => {
          setPageHelper((prevState) => ({
            ...prevState,
            reFetch: !prevState.reFetch,
          }));
          setFilterInputsData(LawyersFilterConstants);
        }}
      >
        <LawyerFilterContent
          inputsState={filterInputsData}
          setInputsState={setFilterInputsData}
        />
      </Filter>

      <div className={styles.lawyers__table}>
        <Table
          dataCount={pageHelper.response?.page_count}
          tableRow={pageHelper.response?.fields.map((field: string) => {
            return (
              field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, " ")
            );
          })}
        >
          {pageHelper.response?.invoices?.map(
            (invoice: InvoicesModel, index: number) => (
              <tr key={`row_data_${index}`}>
                <td>{invoice.id}</td>
                <td>{invoice.user}</td>
                <td>{invoice.accountant}</td>
                <td>{invoice.created}</td>
                <td>{invoice.type}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.not}</td>
                <td>
                  <a href={`${invoice.document}`}>Contract</a>
                </td>
              </tr>
            ),
          )}
        </Table>
      </div>
    </div>
  );
};

export default BalanceActivities;
