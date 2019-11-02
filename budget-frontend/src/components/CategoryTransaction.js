import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleTransaction from "./SingleTransaction";

const CategoryTransaction = ({ category, pieMonth }) => {
  const [categoryTransactions, setCategoryTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/transactions/?month=${pieMonth}&category=${category}&type=transactions`,
        { withCredentials: true }
      )
      .then(res => {
        if (!res.data.category_transactions) {
          setCategoryTransactions([]);
        } else {
          res.data.category_transactions.length > 0
            ? setCategoryTransactions(res.data.category_transactions)
            : setCategoryTransactions([]);
        }
      });
  }, [category, pieMonth]);

  return (
    <div>
      {categoryTransactions.length === 0 && (
        <div> Click on pie slice to get transactions for that category</div>
      )}
      {categoryTransactions.map(categoryTransaction => (
        <SingleTransaction
          key={categoryTransaction.id}
          location={categoryTransaction.location}
          amount={categoryTransaction.amount}
          transactionDate={categoryTransaction.transaction_date}
          category={categoryTransaction.category}
        />
      ))}
    </div>
  );
};

export default CategoryTransaction;
