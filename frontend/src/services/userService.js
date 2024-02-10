import axios from "axios";
import toast from "react-hot-toast";

import { API_URL } from "../utils/constants";

const REGISTER_API_URL = API_URL + "user/register";
const LOGIN_API_URL = API_URL + "user/login";
const VALIDATE_USER_API_URL = API_URL + "user/validate";

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
