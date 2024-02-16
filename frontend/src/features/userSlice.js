import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { validate, register, login, update } from "../services/userService";
import { accept, add, pay, reject, request } from "../services/paymentService";

export const registerUser = createAsyncThunk("user/register", register);
export const loginUser = createAsyncThunk("user/login", login);
export const validateUser = createAsyncThunk("user/validate", validate);
export const updateUser = createAsyncThunk("user/update", update);
//
export const addMoney = createAsyncThunk("/payment/add-money", add);
export const payMoney = createAsyncThunk("/payment/pay-money", pay);
export const requestMoney = createAsyncThunk("/payment/request-money", request);
export const rejectPayment = createAsyncThunk(
  "/payment/reject-payment",
  reject
);
export const acceptPayment = createAsyncThunk(
  "/payment/accept-payment",
  accept
);

const initialState = {
  userToken: localStorage.getItem("token") || null,
  userData: null,
  authLoading: false,
  authError: false,
  //
  validateUser: false,
  validateUserLoading: false,
  validateUserError: false,
  //
  updateUserLoading: false,
  updateUserError: false,
  //
  addMoneyLoading: false,
  addMoneyError: false,
  //
  payMoneyLoading: false,
  payErrorError: false,
  //
  requestMoneyLoading: false,
  requestMoneyError: false,
  //
  rejectPaymentLoading: false,
  rejectPaymentError: false,
  //
  acceptPaymentLoading: false,
  acceptPaymentError: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.userToken = null;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state, action) => {
        state.authLoading = true;
        state.authError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.userToken = token;
        state.userData = user;
        state.authLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authError = true;
        state.authLoading = false;
      })
      // Login
      .addCase(loginUser.pending, (state, action) => {
        state.authLoading = true;
        state.authError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.userToken = token;
        state.userData = user;
        state.authLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authError = true;
        state.authLoading = false;
      })
      // Validate
      .addCase(validateUser.pending, (state, action) => {
        state.validateUserLoading = true;
        state.validateUserError = false;
      })
      .addCase(validateUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.validateUser = true;
        state.validateUserLoading = false;
        state.validateUserError = false;
      })
      .addCase(validateUser.rejected, (state, action) => {
        state.validateUser = false;
        state.validateUserError = true;
        state.validateUserLoading = false;
      })
      // Update
      .addCase(updateUser.pending, (state, action) => {
        state.updateUserLoading = true;
        state.updateUserError = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.updateUserLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserError = true;
        state.updateUserLoading = false;
      })
      // Add Money
      .addCase(addMoney.pending, (state, action) => {
        state.addMoneyLoading = true;
        state.addMoneyError = false;
      })
      .addCase(addMoney.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.addMoneyLoading = false;
      })
      .addCase(addMoney.rejected, (state, action) => {
        state.addMoneyLoading = false;
        state.addMoneyError = true;
      })
      // Pay Money
      .addCase(payMoney.pending, (state, action) => {
        state.payMoneyLoading = true;
        state.payErrorError = false;
      })
      .addCase(payMoney.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.payMoneyLoading = false;
      })
      .addCase(payMoney.rejected, (state, action) => {
        state.payMoneyLoading = false;
        state.payErrorError = true;
      })
      // Request Money
      .addCase(requestMoney.pending, (state, action) => {
        state.requestMoneyLoading = true;
        state.requestMoneyError = false;
      })
      .addCase(requestMoney.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.requestMoneyLoading = false;
      })
      .addCase(requestMoney.rejected, (state, action) => {
        state.requestMoneyLoading = false;
        state.requestMoneyError = true;
      })
      // Reject Payment
      .addCase(rejectPayment.pending, (state, action) => {
        state.rejectPaymentLoading = true;
        state.rejectPaymentError = false;
      })
      .addCase(rejectPayment.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.rejectPaymentLoading = false;
      })
      .addCase(rejectPayment.rejected, (state, action) => {
        state.rejectPaymentLoading = false;
        state.rejectPaymentError = true;
      })
      // Accept Payment
      .addCase(acceptPayment.pending, (state, action) => {
        state.acceptPaymentLoading = true;
        state.acceptPaymentError = false;
      })
      .addCase(acceptPayment.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.acceptPaymentLoading = false;
      })
      .addCase(acceptPayment.rejected, (state, action) => {
        state.acceptPaymentLoading = false;
        state.acceptPaymentError = true;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
