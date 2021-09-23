import { createSlice } from '@reduxjs/toolkit';

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        emailUser: '',
        nameUser: '',
        passwordUser: '',
        token: '',
        registerRequest: false,
        registerFailed: false,
        checkEmailExistRequest: false,
        checkEmailExistFailed: false,
        isEmailExist: false,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordSuccess: false,
        authFailed: false,
        isLogged: false
    },
    reducers: {
        registerRequest: (state) => {
            state.registerRequest = true;
        },
        registerSuccess: (state, action) => {
            state.registerFailed = false;
            state.emailUser = action.payload.email;
            state.nameUser = action.payload.name;
            state.passwordUser = action.payload.password;
            state.token = action.payload.token;
            state.registerRequest = false;
            state.isLogged = true;
        },
        registerFailed: (state) => {
            state.registerFailed = true;
            state.registerRequest = false;
        },
        checkEmailRequest: (state) => {
            state.checkEmailExistRequest = true;
        },
        checkEmailSuccess: (state) => {
            state.checkEmailExistFailed = false;
            state.isEmailExist = true;
            state.checkEmailExistRequest = false;
        },
        checkEmailFailed: (state) => {
            state.checkEmailExistFailed = true;
            state.checkEmailExistRequest = false;
        },
        resetPasswordRequest: (state) => {
            state.resetPasswordRequest = true;
        },
        resetPasswordSuccess: (state, action) => {
            state.resetPasswordFailed = false;
            state.passwordUser = action.payload;
            state.resetPasswordRequest = false;
            state.resetPasswordSuccess = true;
        },
        resetPasswordFailed: (state) => {
            state.resetPasswordFailed = true;
            state.resetPasswordRequest = false;
        },
        authSuccess: (state, action) => {
            state.authFailed = false;
            state.emailUser = action.payload.email;
            state.nameUser = action.payload.name;
            state.passwordUser = action.payload.password;
            state.token = action.payload.token;
            state.isLogged = true;
        },
        authFailed: (state) => {
            state.authFailed = true;
        },
        userInfoSuccess: (state, action) => {
            state.emailUser = action.payload.email;
            state.nameUser = action.payload.name;
            state.isLogged = true;
        },
        logoutSuccess: (state) => {
            //state.emailUser = '';
            //state.nameUser = '';
            //state.passwordUser = '';
            state.isLogged = false;
        },
        userInfoFailed: (state) => {
            state.isLogged = false;
        }
    }
});

export const {
    registerRequest,
    registerSuccess,
    registerFailed,
    checkEmailRequest,
    checkEmailSuccess,
    checkEmailFailed,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailed,
    authSuccess,
    authFailed,
    userInfoSuccess,
    logoutSuccess,
    userInfoFailed
} = authReducer.actions;

export default authReducer.reducer;