import axios from "axios";
import toast from "react-hot-toast";

import { API_URL } from "../utils/constants";

const REGISTER_API_URL = API_URL + "user/register";
const LOGIN_API_URL = API_URL + "user/login";
const VALIDATE_USER_API_URL = API_URL + "user/validate";
const UPDATE_API_URL = API_URL + "user/profile";
const PAY_API_URL = API_URL + "payment/pay-user";
const ADD_MONEY_API_URL = API_URL + "payment/add-money";

export const register = async (userData, { rejectWithValue }) => {
  const toastId = toast.loading("Registering");
  try {
    const response = await axios.post(REGISTER_API_URL, userData);
    const { token, user, message } = response?.data;
    localStorage.setItem("token", token);
    toast.success(message, { id: toastId });
    return { token, user };
  } catch (error) {
    const { message } = error?.response?.data;
    toast.error(message, { id: toastId });
    return rejectWithValue(message);
  }
};

export const login = async (userData, { rejectWithValue }) => {
  const toastId = toast.loading("Logging In");
  try {
    const response = await axios.post(LOGIN_API_URL, userData);
    const { token, user, message } = response?.data;
    localStorage.setItem("token", token);
    toast.success(message, { id: toastId });
    return { token, user };
  } catch (error) {
    const { message } = error?.response?.data;
    toast.error(message, { id: toastId });
    return rejectWithValue(message);
  }
};

export const validate = async (token, { rejectWithValue }) => {
  try {
    const response = await axios.get(VALIDATE_USER_API_URL, {
      headers: { Authorization: token },
    });
    const user = response?.data;
    return user;
  } catch (error) {
    localStorage.clear();
    return rejectWithValue(error?.response?.data?.message);
  }
};

export const update = async (data, { rejectWithValue }) => {
  const { userData, token } = data;
  const toastId = toast.loading("Updating Details");
  try {
    const response = await axios.put(UPDATE_API_URL, userData, {
      headers: { Authorization: token },
    });
    const { message, user } = await response?.data;
    toast.success(message, { id: toastId });
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

export const addMoney = async (data, { rejectWithValue }) => {
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
