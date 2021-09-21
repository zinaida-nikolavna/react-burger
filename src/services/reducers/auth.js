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
        authSuccess: false,
        authFailed: false
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
            state.authSuccess = true;
        },
        authFailed: (state) => {
            state.authFailed = true;
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
    authFailed
} = authReducer.actions;

export default authReducer.reducer;