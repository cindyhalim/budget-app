import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleTransaction from "./SingleTransaction";

import "../styles/CategoryTransaction.sass";

const CategoryTransaction = ({ category, pieMonth }) => {
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/transactions/?month=${pieMonth}&type=alltransactions`,
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
      {filteredTransaction.length === 0 && (
        <p> Please Click on pie slice to get transactions for that category</p>
      )}
      <h3 className="category-title-selected">
        {category ? category : "All Transactions"}
      </h3>
      {filteredTransaction.map(allTransaction => (
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
