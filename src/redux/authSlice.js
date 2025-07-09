import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    contactNumber: null,
    password: '',
    accountAlreadyExist: false,
    loginError: false,
    users: [],
  },
  reducers: {
    createAccount: (state, action) => {
      const { contactNumber, password } = action.payload;

      const userExists = state.users.find(
        user => user.contactNumber === contactNumber
      );

      if (userExists) {
        state.accountAlreadyExist = true;
      } else {

        state.users.push({ contactNumber, password });

        state.contactNumber = contactNumber;
        state.password = password;
        state.accountAlreadyExist = false;
        state.isLoggedIn = true;
      }
    },

    login: (state, action) => {
      const { contactNumber, password } = action.payload;

      const matchedUser = state.users.find(
        user =>
          user.contactNumber === contactNumber &&
          user.password === password
      );

      if (matchedUser) {
        state.isLoggedIn = true;
        state.contactNumber = matchedUser.contactNumber;
        state.password = matchedUser.password;
        state.loginError = false;
      } else {
        state.loginError = true;
      }
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.contactNumber = null;
      state.password = '';
      state.loginError = false;
    },

    clearErrors: (state) => {
      state.accountAlreadyExist = false;
      state.loginError = false;
    },
  },
});

export const { createAccount, login, logout, clearErrors } = authSlice.actions;
export default authSlice.reducer;
