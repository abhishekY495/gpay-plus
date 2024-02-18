import axios from "axios";

import { API_URL } from "./constants";

export const checkServerIsLive = async (setServerLive) => {
  try {
    const response = await axios.get(API_URL);
    const { live } = await response?.data;
    setServerLive(live);
    localStorage.setItem("msg", false);
  } catch (error) {
    console.error(error);
  }
};
