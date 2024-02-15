import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";

import backIcon from "../assets/back-icon.png";
import { API_URL } from "../utils/constants";
import { Users } from "../components/Users";

export const PayOrRequestPage = () => {
  const { userToken } = useSelector((state) => state.user);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const SEARCH_API_URL = API_URL + "user/search?query=";

  const searchInputHandler = (e) => {
    setSearchTerm(e.target.value);
    setError(false);
    setLoading(false);
  };

  const searchUsername = async (e) => {
    setError(false);
    e.preventDefault();
    if (!(searchTerm.trim().length >= 3)) {
      toast.error("Atleast 3 characters");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(SEARCH_API_URL + searchTerm, {
        headers: { Authorization: userToken },
      });
      const { users } = await response?.data;
      setLoading(false);
      setSearchedUsers(users);
    } catch (error) {
      setError(true);
      setLoading(false);
      setSearchedUsers([]);
    }
  };

  return (
    <div className="w-[800px] m-auto px-5 max-[800px]:w-full flex flex-col gap-2">
      <form onSubmit={searchUsername}>
        <div className="flex items-center mt-4 mb-2 gap-2">
          <Link to="/dashboard">
            <img
              src={backIcon}
              alt="back"
              className="w-8 opacity-40 hover:cursor-pointer hover:opacity-50 transition-all"
            />
          </Link>
          <h2 className="text-4xl font-bold max-[430px]:text-3xl">
            Pay / Request
          </h2>
        </div>
        <div className="flex gap-2 max-[430px]:flex-col">
          <input
            required
            type="text"
            placeholder="Search by Username (atleast 3 characters)"
            className="border-2 w-full px-3 py-1 rounded-md focus:outline-none focus:border-neutral-400"
            value={searchTerm}
            onChange={searchInputHandler}
          />
          <button
            type="submit"
            className="bg-blue-500 px-10 p-[5px] rounded-md font-semibold text-white hover:opacity-95"
          >
            Search
          </button>
        </div>
      </form>
      {loading && <p className="px-2">Searching...</p>}
      {error && <p className="px-2 text-center mt-3">No users found</p>}
      {searchedUsers?.length !== 0 && <Users users={searchedUsers} />}
    </div>
  );
};
