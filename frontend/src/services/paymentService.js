import axios from "axios";
import toast from "react-hot-toast";

import { API_URL } from "../utils/constants";

const ADD_MONEY_API_URL = API_URL + "payment/add-money";
const PAY_API_URL = API_URL + "payment/pay-money";

export const add = async (data, { rejectWithValue }) => {
  const { amount, userToken, closeModal } = data;
  const toastId = toast.loading("Adding Money");
  try {
    const response = await axios.put(
      ADD_MONEY_API_URL,
      { amount },
      {
        headers: { Authorization: userToken },
      }
    );
    const { message, user } = await response?.data;
    toast.success(message, { id: toastId });
    closeModal();
    return user;
  } catch (error) {
    const { message } = error?.response?.data;
    toast.error(message, { id: toastId });
    return rejectWithValue(message);
  }
};

export const pay = async (data, { rejectWithValue }) => {
  const { payData, userToken, closeModal } = data;
  const toastId = toast.loading("Sending Money");
  try {
    const response = await axios.put(PAY_API_URL, payData, {
      headers: { Authorization: userToken },
    });
    const { message, user } = await response?.data;
    toast.success(message, { id: toastId });
    closeModal();
    return user;
  } catch (error) {
    const { message } = error?.response?.data;
    toast.error(message, { id: toastId });
    return rejectWithValue(message);
  }
};
