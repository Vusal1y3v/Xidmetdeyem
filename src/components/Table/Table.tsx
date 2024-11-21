import React from "react";
import styles from "./Table.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

const Table = ({
  tableRow,
  dataCount = 0,
  paginationCount = 10,
  noPagination,
  children,
}: {
  tableRow: string[] | undefined;
  dataCount?: number;
  paginationCount?: number;
  noPagination?: boolean;
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = queryParams.get("page") || "1";

  const totalPage =
    Math.floor(dataCount / paginationCount) +
    Math.ceil((dataCount % paginationCount) / paginationCount);

  const pageChanger = (page: number) => {
    if (page > 0 && page <= totalPage)
      navigate(`${location.pathname}?page=${page}`);
  };

  return (
    <div className={styles.table}>
      <div className={styles.table__box}>
        <table>
          <thead>
            <tr>
              {tableRow?.map((row, index) => (
                <th key={`table_row_${row}_${index}`}>{row}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {!noPagination && totalPage > 1 && (
        <div className={styles.table__pagination}>
          <button
            className={styles.nav__button}
            onClick={() => {
              pageChanger(Number(currentPage) - 1);
            }}
          >
            <span>Previus</span>
          </button>
          <div className={styles.numbers}>
            {new Array(totalPage <= 5 ? totalPage : 5)
              .fill(1)
              .map((_, index) => (
                <button
                  className={`${Number(currentPage) === index + 1 && styles.active}`}
                  onClick={() => {
                    pageChanger(index + 1);
                  }}
                  key={`table_page_${index}`}
                >
                  <span>{index + 1}</span>
                </button>
              ))}
          </div>
          <button
            className={styles.nav__button}
            onClick={() => {
              pageChanger(Number(currentPage) + 1);
            }}
          >
            <span>Next</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
