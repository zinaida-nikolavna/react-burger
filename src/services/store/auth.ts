import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TPayload = {
    email: string; 
    name: string;
}

const authSlice = createSlice({
    name: 'auth',
    initialState:  {
        emailUser: '',
        nameUser: '',
        registerRequest: false,
        registerFailed: false,
        checkEmailExistRequest: false,
        checkEmailExistFailed: false,
        isEmailExist: false,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordSuccess: false,
        authFailed: false,
        isLogged: false,
        refreshUserRequestFailed: false,
        logoutRequestFailed: false
    },
    reducers: {
        registerRequest: (state) => {
            state.registerRequest = true;
        },
        registerSuccess: (state, action: PayloadAction<TPayload>) => {
            state.registerFailed = false;
            state.emailUser = action.payload.email;
            state.nameUser = action.payload.name;
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
        resetPasswordSuccess: (state) => {
            state.resetPasswordFailed = false;
            state.resetPasswordRequest = false;
            state.resetPasswordSuccess = true;
        },
        resetPasswordFailed: (state) => {
            state.resetPasswordFailed = true;
            state.resetPasswordRequest = false;
        },
        authSuccess: (state, action: PayloadAction<TPayload>) => {
            state.authFailed = false;
            state.emailUser = action.payload.email;
            state.nameUser = action.payload.name;
            state.isLogged = true;
        },
        authFailed: (state) => {
            state.authFailed = true;
        },
        userInfoSuccess: (state, action: PayloadAction<TPayload>) => {
            state.emailUser = action.payload.email;
            state.nameUser = action.payload.name;
            state.isLogged = true;
            state.refreshUserRequestFailed = false;
        },
        logoutSuccess: (state) => {
            state.isLogged = false;
            state.logoutRequestFailed = false;
        },
        logoutRequestFailed: (state) => {
            state.logoutRequestFailed = true;
        },
        userInfoFailed: (state) => {
            state.isLogged = false;
        },
        refreshUserFailed: (state) => {
            state.refreshUserRequestFailed = true;
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
    userInfoFailed,
    refreshUserFailed,
    logoutRequestFailed
} = authSlice.actions;

export default authSlice.reducer;
