import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { Transaction } from "../components/Transaction";
import { API_URL } from "../utils/constants";
import backIcon from "../assets/back-icon.png";

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
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="w-[800px] m-auto px-5 max-[800px]:w-full flex flex-col gap-2">
      <div className="flex items-center mt-4 gap-2 pb-1 border-b">
        <Link to="/dashboard">
          <img
            src={backIcon}
            alt="back"
            className="w-8 opacity-40 hover:cursor-pointer hover:opacity-50 transition-all"
          />
        </Link>
        <h2 className="text-4xl font-bold max-[430px]:text-3xl">
          Transactions
        </h2>
      </div>
      {loading && <p>Loading Transactions</p>}
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
