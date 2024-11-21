import styles from "./Lawyers.module.scss";
import Filter from "../../../../../components/Filter/Filter.tsx";
import Table from "../../../../../components/Table/Table.tsx";
import { useContext, useEffect, useState } from "react";
import {
  getContractUsersPendingApprovalRequest,
  getEmptyUsersContractRequest,
  getVerifiedUsersContractRequest,
  postContractUnverifiedRequest,
} from "../../../services/lawyers.services.ts";
import { UserModel } from "../../../models/dashboard.model.ts";
import { LoaderContext } from "../../../../../contexts/LoaderContext.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import ContractVerified from "../../shared/Modals/Lawyear/ContractVerified.tsx";
import LawyerFilterContent from "../../shared/Filter/LawyerFilterContent.tsx";
import {
  LawyersFilterType,
  LawyersModalType,
} from "../../../models/lawyers.model.ts";
import {
  LawyersFilterConstants,
  LawyersModalConstants,
  LawyersRenderRow,
  LawyersTabsConstants,
} from "../../../constants/lawyers.constants.tsx";
import BasicModal from "../../shared/Modals/BasicModal.tsx";
import { toast } from "react-toastify";
import { updateState } from "../../../../../libs/state.ts";
import { PageHelperModel } from "../../../models/shared.model.ts";

const Lawyers = () => {
  const { setLoader } = useContext(LoaderContext);
  const { search } = useLocation();
  const navigate = useNavigate();

  const [pageHelper, setPageHelper] = useState<PageHelperModel>({
    page: Number(new URLSearchParams(search).get("page")) || 1,
    activeTabs: 0,
    reFetch: false,
    response: null,
  });

  const [filterInputsData, setFilterInputsData] = useState<LawyersFilterType>({
    ...LawyersFilterConstants,
  });

  const [modals, setModals] = useState<LawyersModalType>({
    ...LawyersModalConstants,
  });

  const tabs = LawyersTabsConstants.map((tab) => ({
    ...tab,
    onClick: () => {
      navigate(`${location.pathname}?page=${1}`);
      setPageHelper((prevState) => ({
        ...prevState,
        activeTabs: tab.tab,
      }));
    },
  }));

  const fetchUsersContracts = async (type: any) => {
    setLoader(true);

    const requestMap = {
      verified: getVerifiedUsersContractRequest,
      unverified: getEmptyUsersContractRequest,
      empty: getContractUsersPendingApprovalRequest,
    };

    // @ts-ignore
    const response = await requestMap[type](
      pageHelper.page,
      filterInputsData.full_name,
      filterInputsData.phone,
      filterInputsData.email,
      filterInputsData.identity_number,
      filterInputsData.company_name,
      filterInputsData.contract_start_date,
      filterInputsData.contract_end_date,
    );

    if (response?.status === 200)
      setPageHelper((prevState) => ({
        ...prevState,
        response: response.data,
      }));
    else toast.error(response?.statusText);

    setLoader(false);
  };

  const postContractUnverified = async () => {
    setLoader(true);
    const { status } = await postContractUnverifiedRequest(
      Number(modals.unverified),
    );
    if (status === 200) {
      updateState(setModals, "unverified", null);
      setPageHelper((prevState) => ({
        ...prevState,
        reFetch: !prevState.reFetch,
      }));
      toast.success("Contract unverified");
    } else toast.error("error:Contract unverified");
    setLoader(false);
  };

  useEffect(() => {
    const tabsMap = ["verified", "unverified", "empty"];

    // @ts-ignore
    fetchUsersContracts(`${tabsMap[pageHelper.activeTabs]}`).catch(() => {});
  }, [pageHelper.activeTabs, pageHelper.page, pageHelper.reFetch]);

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
          tabs={tabs}
          activeTabs={pageHelper.activeTabs}
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
              LawyersRenderRow(
                user,
                index,
                pageHelper?.activeTabs || 0,
                () => updateState(setModals, "verified", user.id),
                () => updateState(setModals, "unverified", user.id),
              ),
            )}
          </Table>
        </div>
      </div>

      {modals.verified !== null && (
        <ContractVerified
          id={modals.verified}
          modalClose={() => {
            updateState(setModals, "verified", null);
            setPageHelper((prevState) => ({
              ...prevState,
              reFetch: !prevState.reFetch,
            }));
          }}
        />
      )}

      {modals.unverified !== null && (
        <BasicModal
          title={"Salam Contractdi Deaktiv Etmeye Eminsiniz?"}
          doneTitle={"Unverifed"}
          doneClick={() => postContractUnverified()}
          closeTitle={"cix"}
          modalClose={() => {
            updateState(setModals, "unverified", null);
            setPageHelper((prevState) => ({
              ...prevState,
              reFetch: !prevState.reFetch,
            }));
          }}
        />
      )}
    </>
  );
};

export default Lawyers;
