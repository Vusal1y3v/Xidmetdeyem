import styles from "../Lawyers/Lawyers.module.scss";
import Filter from "../../../../../components/Filter/Filter.tsx";
import Table from "../../../../../components/Table/Table.tsx";
import { UserModel } from "../../../models/dashboard.model.ts";
import { useContext, useEffect, useState } from "react";
import { getVerifiedUsersContractRequest } from "../../../services/lawyers.services.ts";
import { FinancialRenderRow } from "../../../constants/financial.constants.tsx";
import LawyerFilterContent from "../../shared/Filter/LawyerFilterContent.tsx";
import { LawyersFilterConstants } from "../../../constants/lawyers.constants.tsx";
import {
  ModalType,
  PageHelperModel,
  UsersFilterType,
} from "../../../models/shared.model.ts";
import { LoaderContext } from "../../../../../contexts/LoaderContext.tsx";
import { useLocation } from "react-router-dom";
import ChangeUserBalance from "../../shared/Modals/Financial/ChangeUserBalance.tsx";
import { UsersFilterConstants } from "../../../constants/shared.constant.tsx";

const Financial = () => {
  const { setLoader } = useContext(LoaderContext);
  const { search } = useLocation();
  // const navigate = useNavigate();

  const [pageHelper, setPageHelper] = useState<PageHelperModel>({
    page: Number(new URLSearchParams(search).get("page")) || 1,
    reFetch: false,
    response: null,
  });

  const [filterInputsData, setFilterInputsData] = useState<UsersFilterType>({
    ...UsersFilterConstants,
  });

  const [modals, setModals] = useState<ModalType>({
    balance: null,
  });

  const getUsers = async () => {
    setLoader(true);
    const { status, data } = await getVerifiedUsersContractRequest(
      pageHelper.page,
      filterInputsData.full_name,
      filterInputsData.phone,
      filterInputsData.email,
      filterInputsData.identity_number,
      filterInputsData.company_name,
      filterInputsData.contract_start_date,
      filterInputsData.contract_end_date,
    );
    if (status === 200) {
      setPageHelper((prevState) => ({
        ...prevState,
        response: data,
      }));
    }
    setLoader(false);
  };

  useEffect(() => {
    getUsers().catch(() => {});
  }, [pageHelper.page, pageHelper.reFetch]);

  useEffect(() => {
    setPageHelper((prevState) => ({
      ...prevState,
      page: Number(new URLSearchParams(search).get("page")) || 1,
    }));
  }, [search]);

  return (
    <>
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
                field.charAt(0).toUpperCase() +
                field.slice(1).replace(/_/g, " ")
              );
            })}
          >
            {pageHelper.response?.users?.map((user: UserModel, index: number) =>
              FinancialRenderRow(user, index, () =>
                setModals((prevState) => ({
                  ...prevState,
                  balance: Number(user.id),
                })),
              ),
            )}
          </Table>
        </div>
      </div>

      {modals.balance && (
        <ChangeUserBalance
          id={modals.balance}
          modalClose={() => {
            setModals((prevState) => ({
              ...prevState,
              balance: null,
            }));
            setPageHelper((prevState) => ({
              ...prevState,
              reFetch: !pageHelper.reFetch,
            }));
          }}
        />
      )}
    </>
  );
};

export default Financial;
