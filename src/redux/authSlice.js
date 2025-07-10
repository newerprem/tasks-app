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
    name: '',
    email: '',
    profilePic: '../assets/person.png'
  },
  reducers: {
    createAccount: (state, action) => {
      const { contactNumber, password } = action.payload;

      const userExists = state.users.find(
        user => user.contactNumber === contactNumber,
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

      const userFound = state.users.find(
        user =>
          user.contactNumber === contactNumber && user.password === password,
      );

      if (userFound) {
        state.isLoggedIn = true;
        state.contactNumber = userFound.contactNumber;
        state.password = userFound.password;
        state.loginError = false;
        state.name = userFound.name;
        state.email = userFound.email;
        state.profilePic = userFound.profilePic
      } else {
        state.loginError = true;
      }
    },

    updateDetails: (state, action) => {
      const { name, email } = action.payload;
      const currentUser = state.users.find(
        user => user.contactNumber === state.contactNumber,
      );
      if (currentUser) {
        currentUser.name = name.trim();
        currentUser.email = email.trim();
      }
      state.name = name.trim();
      state.email = email.trim();
    },

    changeProfilePic : (state, action) => {
        const {profilePic} = action.payload;
        const currentUser = state.users.find(
            user => user.contactNumber === state.contactNumber
        );
        if(currentUser) {
            currentUser.profilePic = profilePic
        }
        state.profilePic = profilePic
    },

    logout: state => {
      state.isLoggedIn = false;
      state.contactNumber = null;
      state.password = '';
      state.loginError = false;
      state.name = '',
      state.email = ''
      state.profilePic = '../assets/person.png'
    },

    clearErrors: state => {
      state.accountAlreadyExist = false;
      state.loginError = false;
    },
  },
});

export const { createAccount, login, updateDetails, logout, clearErrors, changeProfilePic } =
  authSlice.actions;
export default authSlice.reducer;
