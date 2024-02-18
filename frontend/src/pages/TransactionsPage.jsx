import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { Transaction } from "../components/Transaction";
import { API_URL } from "../utils/constants";

export const TransactionsPage = () => {
  const { userToken } = useSelector((state) => state.user);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const TRANSACTIONS_API_URL = API_URL + "user/transactions";

  const getTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(TRANSACTIONS_API_URL, {
        headers: { Authorization: userToken },
      });
      const data = await response?.data;
      setTransactions(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="w-[800px] m-auto px-5 max-[800px]:w-full flex flex-col gap-2">
      <h2 className="text-center text-4xl mt-3 mb-1 pb-1 font-bold border-b">
        Transactions
      </h2>
      {loading && <p className="px-2 text-center mt-3">Loading Transactions</p>}
      {!loading && transactions.length === 0 && (
        <p className="px-2 text-center mt-3">No Transactions</p>
      )}
      {transactions
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((transaction) => {
          return (
            <Transaction transaction={transaction} key={transaction?._id} />
          );
        })}
    </div>
  );
};
