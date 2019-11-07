import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleTransaction from "./SingleTransaction";
import TablePagination from "@material-ui/core/TablePagination";

import "../styles/CategoryTransaction.sass";

const CategoryTransaction = ({ category, pieMonth }) => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [transactionsPerPage, setTransactionsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeTransactionsPerPage = event => {
    setTransactionsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    axios
      .get(
        `https://blooming-everglades-51994.herokuapp.com/transactions/?month=${pieMonth}&type=alltransactions`,
        { withCredentials: true }
      )
      .then(res => {
        if (!res.data.allTransactions) {
          setAllTransactions([]);
        } else {
          res.data.allTransactions.length > 0
            ? setAllTransactions(res.data.allTransactions)
            : setAllTransactions([]);
        }
      });
  }, [pieMonth]);

  let filteredTransaction = allTransactions;
  if (category !== "All Transactions") {
    filteredTransaction = allTransactions.filter(transaction =>
      transaction.category.includes(category)
    );
  }

  return (
    <div>
      {/* {filteredTransaction.length > 0 && (
        <p> Please Click on pie slice to get transactions for that category</p>
      )} */}
      <h3 className="category-title-selected">
        {category ? category : "All Transactions"}
      </h3>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredTransaction.length}
        rowsPerPage={transactionsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "previous page"
        }}
        nextIconButtonProps={{
          "aria-label": "next page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeTransactionsPerPage}
        labelRowsPerPage="Rows/page:"
        className="transaction-list-header"
      />
      {filteredTransaction
        .slice(
          page * transactionsPerPage,
          page * transactionsPerPage + transactionsPerPage
        )
        .map(allTransaction => (
          <SingleTransaction
            key={allTransaction.id}
            location={allTransaction.location}
            amount={allTransaction.amount}
            transactionDate={allTransaction.transaction_date}
            category={allTransaction.category}
          />
        ))}
    </div>
  );
};

export default CategoryTransaction;
