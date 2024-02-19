import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";

import { API_URL } from "../utils/constants";
import { SearchedUser } from "../components/SearchedUser";

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
    e.preventDefault();
    setError(false);
    setSearchedUsers([]);
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
        <h2 className="text-center text-4xl mt-3 mb-2 pb-1 font-bold border-b max-[430px]:text-3xl">
          Pay / Request
        </h2>
        <div className="flex gap-2 max-[430px]:flex-col">
          <input
            required
            type="text"
            placeholder="Search by Username (atleast 3 characters)"
            className="border-2 w-full px-3 py-1 rounded focus:outline-none focus:border-neutral-400"
            value={searchTerm}
            onChange={searchInputHandler}
          />
          <button
            type="submit"
            className="bg-blue-500 px-10 p-[5px] rounded font-semibold text-white hover:opacity-90"
          >
            Search
          </button>
        </div>
      </form>
      {loading && <p className="px-2">Searching...</p>}
      {error && <p className="px-2 text-center mt-3">No users found</p>}
      <div className="flex flex-col gap-2 px-2 mt-2">
        {searchedUsers?.length !== 0 &&
          searchedUsers.map((user) => {
            return <SearchedUser user={user} key={user?.username} />;
          })}
      </div>
    </div>
  );
};
