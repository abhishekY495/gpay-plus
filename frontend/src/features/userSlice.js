import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  validate,
  register,
  login,
  update,
  pay,
  addMoney,
} from "../services/userService";

export const registerUser = createAsyncThunk("user/register", register);
export const loginUser = createAsyncThunk("user/login", login);
export const validateUser = createAsyncThunk("user/validate", validate);
export const updateUser = createAsyncThunk("user/update", update);
export const payUser = createAsyncThunk("/payment/pay-user", pay);
export const addMoneyInAccount = createAsyncThunk(
  "/payment/add-money",
  addMoney
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
  payUserLoading: false,
  payUserError: false,
  //
  addMoneyLoading: false,
  addMoneyError: false,
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
      // Pay User
      .addCase(payUser.pending, (state, action) => {
        state.payUserLoading = true;
        state.payUserError = false;
      })
      .addCase(payUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.payUserLoading = false;
      })
      .addCase(payUser.rejected, (state, action) => {
        state.payUserLoading = false;
        state.payUserError = true;
      })
      // Add Money in Account
      .addCase(addMoneyInAccount.pending, (state, action) => {
        state.addMoneyLoading = true;
        state.addMoneyError = false;
      })
      .addCase(addMoneyInAccount.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.addMoneyLoading = false;
      })
      .addCase(addMoneyInAccount.rejected, (state, action) => {
        state.addMoneyLoading = false;
        state.addMoneyError = true;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
