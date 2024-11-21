import styles from "../Lawyers/Lawyers.module.scss";
import Filter from "../../../../../components/Filter/Filter.tsx";
import { LawyersFilterConstants } from "../../../constants/lawyers.constants.tsx";
import LawyerFilterContent from "../../shared/Filter/LawyerFilterContent.tsx";
import Table from "../../../../../components/Table/Table.tsx";
import { UserModel } from "../../../models/dashboard.model.ts";
import { useContext, useEffect, useState } from "react";
import { PageHelperModel } from "../../../models/shared.model.ts";
import { useLocation } from "react-router-dom";
import { LawyersFilterType } from "../../../models/lawyers.model.ts";
import { getAllUsersRequest } from "../../../services/commercial.services.ts";
import { LoaderContext } from "../../../../../contexts/LoaderContext.tsx";
import MoreButton from "../../../../../components/MoreButton/MoreButton.tsx";
import DedicateCommercialManager from "../../shared/Modals/Commercial/DedicateCommercialManager.tsx";

const Commercial = () => {
  const { setLoader } = useContext(LoaderContext);
  const { search } = useLocation();
  // const navigate = useNavigate();

  const [pageHelper, setPageHelper] = useState<PageHelperModel>({
    page: Number(new URLSearchParams(search).get("page")) || 1,
    reFetch: false,
    response: null,
    tabs: [
      {
        name: "User",
        tab: 0,
        onClick: () => {
          setPageHelper((prevState) => ({
            ...prevState,
            activeTabs: 0,
          }));
        },
      },
      {
        name: "Maneger",
        tab: 1,
        onClick: () => {
          setPageHelper((prevState) => ({
            ...prevState,
            activeTabs: 1,
          }));
        },
      },
    ],
    activeTabs: 0,
  });

  const [filterInputsData, setFilterInputsData] = useState<LawyersFilterType>({
    ...LawyersFilterConstants,
  });

  const getAllUsers = async () => {
    setLoader(true);
    const { status, data } = await getAllUsersRequest(
      pageHelper.page,
      pageHelper.activeTabs ? "commercial_manager" : "user",
      "",
      "",
      "",
      "",
      "",
      "",
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
    getAllUsers().catch(() => {});
  }, []);

  useEffect(() => {
    getAllUsers().catch(() => {});
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
          tabs={pageHelper.tabs}
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
            {pageHelper.response?.users?.map(
              (user: UserModel, index: number) => (
                <tr key={`row_data_${index}`}>
                  <td>{user.id}</td>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>{user.balance}</td>
                  <td>
                    {user.contract ? (
                      <a href={`${user.contract}`}>Contract</a>
                    ) : (
                      "Kontrakt mövcud deyil"
                    )}
                  </td>
                  <td>{user.company_name || "Individual User"}</td>
                  <td>{user.identity_number}</td>
                  <td>{user.commercial_manager}</td>
                  {!pageHelper.activeTabs && (
                    <MoreButton>
                      <button
                        onClick={() => {
                          console.log("salam");
                        }}
                      >
                        Kommersiya meneceri təyin etmək
                      </button>
                    </MoreButton>
                  )}
                </tr>
              ),
            )}
          </Table>
        </div>
      </div>

      <DedicateCommercialManager
        id={1}
        modalClose={() => {
          console.log("salam");
        }}
      />
    </>
  );
};

export default Commercial;
