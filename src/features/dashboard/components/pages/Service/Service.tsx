// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../../../contexts/AuthContext.tsx";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   ServiceFilterConstants,
//   ServiceModalConfig,
//   ServiceModalConstants,
//   ServiceRenderRow,
//   ServiceTabsConstants,
// } from "../../../constants/service.constants.tsx";
// import { LoaderContext } from "../../../../../contexts/LoaderContext.tsx";
// import {
//   ServiceFilterType,
//   ServiceModalType,
// } from "../../../models/service.model.ts";
// import { getVerifiedServiceRequest } from "../../../services/service.services.ts";
// import { toast } from "react-toastify";
// import styles from "./Service.module.scss";
// import { updateState } from "../../../../../libs/state.ts";
// import Filter from "../../../../../components/Filter/Filter.tsx";
// import VendorFilterContent from "../../shared/Filter/VendorFilterContent.tsx";
// import Table from "../../../../../components/Table/Table.tsx";
// import { ServiceModel } from "../../../models/dashboard.model.ts";
// import BasicModal from "../../shared/Modals/BasicModal.tsx";
// import VendorsCreated from "../../shared/Modals/Vendors/VendorsCreated.tsx";
//
// const Service = () => {
//   //  Tekrarlanan Hisse
//   const { auth } = useContext(AuthContext);
//   const { search } = useLocation();
//   const navigate = useNavigate();
//   const params = new URLSearchParams(search);
//   const page = Number(params.get("page")) || 1;
//   const { setLoader } = useContext(LoaderContext);
//
//   // Tab
//   const tabs = ServiceTabsConstants.map((tab) => ({
//     ...tab,
//     onClick: () => {
//       setActiveTabs(tab.tab);
//       navigate(`${location.pathname}?page=${1}`);
//     },
//   }));
//   const [activeTabs, setActiveTabs] = useState<number>(0);
//
//   // Modal
//   const modalConfig = ServiceModalConfig.map((modalConfig) => ({
//     ...modalConfig,
//     doneClick: () =>
//       //@ts-ignore
//       handleVendorAction(modalConfig.name, modals[modalConfig.name]),
//   }));
//   const [modals, setModals] = useState<ServiceModalType>({
//     ...ServiceModalConstants,
//   });
//
//   // Response
//   const [response, setResponse] = useState<any | null>(null);
//
//   // Filter
//   const [filter, setFilter] = useState<boolean>(false);
//   const [inputsState, setInputsState] = useState<ServiceFilterType>({
//     ...ServiceFilterConstants,
//   });
//
//   // Buttons
//   const [buttons] = useState([
//     {
//       title: "Add Vendor",
//       onClick: () => updateState(setModals, "created", true),
//     },
//   ]);
//
//   // Fetch Vendors Service
//   const fetchVendorsContracts = async (
//     type: "verified" | "unverified" | "empty",
//   ) => {
//     setLoader(true);
//     const requestMap = {
//       verified: getVerifiedServiceRequest,
//       unverified: getVerifiedServiceRequest,
//       empty: getVerifiedServiceRequest,
//     };
//
//     const response = await requestMap[type](
//       page,
//       inputsState.name,
//       inputsState.contract_start_date,
//       inputsState.contract_end_date,
//     );
//
//     if (response?.status === 200) setResponse(response.data);
//     else toast.error(response?.statusText);
//
//     setLoader(false);
//   };
//
//   const handleVendorAction = async (
//     action: "verified" | "unverified" | "deleted",
//     id: number | null,
//   ) => {
//     if (id === null) return;
//     setLoader(true);
//     let requestFunction;
//     let successMessage;
//     let errorMessage;
//
//     switch (action) {
//       case "verified":
//         // Vendorlarin Contractin tesdiqleme
//         requestFunction = getVerifiedServiceRequest;
//         successMessage = "Service verified successfully.";
//         errorMessage = "Service verified error.";
//         break;
//       case "unverified":
//         // Vendorlarin Contractin tesdiqlememe
//         requestFunction = getVerifiedServiceRequest;
//         successMessage = "Service unverified successfully.";
//         errorMessage = "Service unverified error.";
//         break;
//       case "deleted":
//         // Vendorlarin Contractini Silmek
//         requestFunction = getVerifiedServiceRequest;
//         successMessage = "Service deleted successfully.";
//         errorMessage = "Service deleted error.";
//         break;
//     }
//
//     try {
//       const { status } = await requestFunction(Number(id));
//       if (status === 200) {
//         toast.success(successMessage);
//         setFilter(!filter);
//       } else {
//         toast.error(errorMessage);
//       }
//     } catch (error) {
//       console.error(`Error performing ${action} action:`, error);
//       toast.error(errorMessage);
//     } finally {
//       updateState(setModals, action, null);
//       setLoader(false);
//     }
//   };
//
//   useEffect(() => {
//     const tabsMap = ["verified", "unverified", "empty"];
//     //@ts-ignore
//     fetchVendorsContracts(`${tabsMap[activeTabs]}`).catch(() => {});
//   }, [activeTabs, page, filter]);
//
//   return (
//     <>
//       <div className={styles.lawyers}>
//         <Filter
//           buttons={auth.role === "buyer_manager" ? buttons : []}
//           tabs={tabs}
//           activeTabs={activeTabs}
//           onFilter={() => setFilter(!filter)}
//           onClear={() => {
//             setFilter(!filter);
//             setInputsState(ServiceFilterConstants);
//           }}
//         >
//           <VendorFilterContent
//             inputsState={inputsState}
//             setInputsState={setInputsState}
//           />
//         </Filter>
//
//         <div className={styles.lawyers__table}>
//           <Table
//             dataCount={response?.page_count}
//             tableRow={response?.fields.map((field: string) => {
//               return (
//                 field.charAt(0).toUpperCase() +
//                 field.slice(1).replace(/_/g, " ")
//               );
//             })}
//           >
//             {response?.vendors?.map((service: ServiceModel, index: number) =>
//               ServiceRenderRow(
//                 service,
//                 index,
//                 activeTabs,
//                 auth.role,
//                 () => updateState(setModals, "verified", service.id),
//                 () => updateState(setModals, "unverified", service.id),
//               ),
//             )}
//           </Table>
//         </div>
//       </div>
//
//       {modalConfig.map(
//         (modal) =>
//           //@ts-ignore
//           modals[modal.name] && (
//             <BasicModal
//               key={modal.name}
//               title={modal.title}
//               closeTitle="Close"
//               doneTitle={modal.doneTitle}
//               doneClick={modal.doneClick}
//               //@ts-ignore
//               modalClose={() => {
//                 updateState(setModals, modal.name, null);
//               }}
//             />
//           ),
//       )}
//
//       {modals.created && (
//         <VendorsCreated
//           modalClose={() => {
//             updateState(setModals, "created", false);
//           }}
//         />
//       )}
//     </>
//   );
// };
//
// export default Service;

import { useContext, useEffect, useState } from "react";
import styles from "../Lawyers/Lawyers.module.scss";
import Filter from "../../../../../components/Filter/Filter.tsx";

import {
  VendorsFilterConstants,
  VendorsModalConstants,
  VendorsTabsConstants,
  VendorsModalConfig,
} from "../../../constants/vendors.constants.tsx";

import { TableResponseType } from "../../../models/shared.model.ts";
import Table from "../../../../../components/Table/Table.tsx";
import { LoaderContext } from "../../../../../contexts/LoaderContext.tsx";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../../../contexts/AuthContext.tsx";
import {
  VendorsFilterType,
  VendorsModalType,
} from "../../../models/vendors.model.ts";
import BasicModal from "../../shared/Modals/BasicModal.tsx";
import VendorFilterContent from "../../shared/Filter/VendorFilterContent.tsx";
import { toast } from "react-toastify";
import { updateState } from "../../../../../libs/state.ts";
import ServicesCreated from "../../shared/Modals/Services/ServicesCreated.tsx";
import { getVerifiedServiceRequest } from "../../../services/service.services.ts";

// Serviceye aid olanlar
import {
  postVendorsDeletedContractRequest,
  postVendorsUnverifiedContractRequest,
  postVendorsVerifiedContractRequest,
} from "../../../services/vendors.services.ts";
import { ServiceRenderRow } from "../../../constants/service.constants.tsx";

const Service = () => {
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
      title: "Add Service",
      onClick: () => updateState(setModals, "created", true),
    },
  ]);

  const fetchVendorsContracts = async (
    type: "verified" | "unverified" | "empty",
  ) => {
    setLoader(true);
    const requestMap = {
      verified: getVerifiedServiceRequest,
      unverified: getVerifiedServiceRequest,
      empty: getVerifiedServiceRequest,
    };

    const response = await requestMap[type](
      page,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    );

    console.log(response.data);
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
            {response?.service?.map((service: any, index: number) =>
              ServiceRenderRow(
                service,
                index,
                activeTabs,
                auth.role,
                () => updateState(setModals, "verified", service.id),
                () => updateState(setModals, "unverified", service.id),
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
        <ServicesCreated
          modalClose={() => {
            updateState(setModals, "created", false);
          }}
        />
      )}
    </>
  );
};

export default Service;
