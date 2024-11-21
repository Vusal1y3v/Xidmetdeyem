import { useContext, useEffect, useState } from "react";
import styles from "../Lawyers/Lawyers.module.scss";
import Filter from "../../../../../components/Filter/Filter.tsx";
import {
  VendorsRenderRow,
  VendorsFilterConstants,
  VendorsModalConstants,
  VendorsTabsConstants,
  VendorsModalConfig,
} from "../../../constants/vendors.constants.tsx";

import {
  TableResponseType,
  VendorModel,
} from "../../../models/dashboard.model.ts";
import Table from "../../../../../components/Table/Table.tsx";
import { LoaderContext } from "../../../../../contexts/LoaderContext.tsx";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getEmptyVendorsContractsRequest,
  getPendingApprovalVendorsContractsRequest,
  getVerifiedVendorsContractsRequest,
  postVendorsDeletedContractRequest,
  postVendorsUnverifiedContractRequest,
  postVendorsVerifiedContractRequest,
} from "../../../services/vendors.services.ts";

import { AuthContext } from "../../../../../contexts/AuthContext.tsx";
import {
  VendorsFilterType,
  VendorsModalType,
} from "../../../models/vendors.model.ts";
import BasicModal from "../../shared/Modals/BasicModal.tsx";
import VendorsCreated from "../../shared/Modals/Vendors/VendorsCreated.tsx";
import VendorFilterContent from "../../shared/Filter/VendorFilterContent.tsx";
import { toast } from "react-toastify";
import { updateState } from "../../../../../libs/state.ts";

const Vendors = () => {
  //  Tekrarlanan Hisse
  const { auth } = useContext(AuthContext);
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const page = Number(params.get("page")) || 1;

  // Tablar
  const tabs = VendorsTabsConstants.map((tab) => ({
    ...tab,
    onClick: () => {
      setActiveTabs(tab.tab);
      navigate(`${location.pathname}?page=${1}`);
    },
  }));

  // Modalar
  const modalConfig = VendorsModalConfig.map((modalConfig) => ({
    ...modalConfig,
    doneClick: () =>
      //@ts-ignore
      handleVendorAction(modalConfig.name, modals[modalConfig.name]),
  }));

  const { setLoader } = useContext(LoaderContext);
  const [response, setResponse] = useState<TableResponseType | null>(null);
  const [modals, setModals] = useState<VendorsModalType>({
    ...VendorsModalConstants,
  });
  const [filter, setFilter] = useState<boolean>(false);
  const [activeTabs, setActiveTabs] = useState<number>(0);

  const [inputsState, setInputsState] = useState<VendorsFilterType>({
    ...VendorsFilterConstants,
  });

  const [buttons] = useState([
    {
      title: "Add Vendor",
      onClick: () => updateState(setModals, "created", true),
    },
  ]);

  const fetchVendorsContracts = async (
    type: "verified" | "unverified" | "empty",
  ) => {
    setLoader(true);
    const requestMap = {
      verified: getVerifiedVendorsContractsRequest,
      unverified: getPendingApprovalVendorsContractsRequest,
      empty: getEmptyVendorsContractsRequest,
    };

    const response = await requestMap[type](
      page,
      inputsState.name,
      inputsState.contract_start_date,
      inputsState.contract_end_date,
    );

    if (response?.status === 200) setResponse(response.data);
    else toast.error(response?.statusText);

    setLoader(false);
  };

  const handleVendorAction = async (
    action: "verified" | "unverified" | "deleted",
    id: number | null,
  ) => {
    if (id === null) return;
    setLoader(true);
    let requestFunction;
    let successMessage;
    let errorMessage;

    switch (action) {
      case "verified":
        // Vendorlarin Contractin tesdiqleme
        requestFunction = postVendorsVerifiedContractRequest;
        successMessage = "Vendors verified successfully.";
        errorMessage = "Vendors verified error.";
        break;
      case "unverified":
        // Vendorlarin Contractin tesdiqlememe
        requestFunction = postVendorsUnverifiedContractRequest;
        successMessage = "Vendors unverified successfully.";
        errorMessage = "Vendors unverified error.";
        break;
      case "deleted":
        // Vendorlarin Contractini Silmek
        requestFunction = postVendorsDeletedContractRequest;
        successMessage = "Vendors deleted successfully.";
        errorMessage = "Vendors deleted error.";
        break;
    }

    try {
      const { status } = await requestFunction(Number(id));
      if (status === 200) {
        toast.success(successMessage);
        setFilter(!filter);
      } else {
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error(`Error performing ${action} action:`, error);
      toast.error(errorMessage);
    } finally {
      updateState(setModals, action, null);
      setLoader(false);
    }
  };

  useEffect(() => {
    const tabsMap = ["verified", "unverified", "empty"];
    //@ts-ignore
    fetchVendorsContracts(`${tabsMap[activeTabs]}`).catch(() => {});
  }, [activeTabs, page, filter]);

  return (
    <>
      <div className={styles.lawyers}>
        <Filter
          buttons={auth.role === "buyer_manager" ? buttons : []}
          tabs={tabs}
          activeTabs={activeTabs}
          onFilter={() => setFilter(!filter)}
          onClear={() => {
            setFilter(!filter);
            setInputsState(VendorsFilterConstants);
          }}
        >
          <VendorFilterContent
            inputsState={inputsState}
            setInputsState={setInputsState}
          />
        </Filter>

        <div className={styles.lawyers__table}>
          <Table
            dataCount={response?.page_count}
            tableRow={response?.fields.map((field: string) => {
              return (
                field.charAt(0).toUpperCase() +
                field.slice(1).replace(/_/g, " ")
              );
            })}
          >
            {response?.vendors?.map((vendor: VendorModel, index: number) =>
              VendorsRenderRow(
                vendor,
                index,
                activeTabs,
                auth.role,
                () => updateState(setModals, "verified", vendor.id),
                () => updateState(setModals, "unverified", vendor.id),
                () => updateState(setModals, "deleted", vendor.id),
              ),
            )}
          </Table>
        </div>
      </div>

      {modalConfig.map(
        (modal) =>
          //@ts-ignore
          modals[modal.name] && (
            <BasicModal
              key={modal.name}
              title={modal.title}
              closeTitle="Close"
              doneTitle={modal.doneTitle}
              doneClick={modal.doneClick}
              //@ts-ignore
              modalClose={() => {
                updateState(setModals, modal.name, null);
              }}
            />
          ),
      )}

      {modals.created && (
        <VendorsCreated
          modalClose={() => {
            updateState(setModals, "created", false);
          }}
        />
      )}
    </>
  );
};

export default Vendors;
