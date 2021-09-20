import { createSlice } from '@reduxjs/toolkit';

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        emailUser: '',
        nameUser: '',
        registerRequest: false,
        registerFailed: false,
        checkEmailExistRequest: false,
        checkEmailExistFailed: false,
        isEmailExist: false
    },
    reducers: {
        registerRequest: (state) => {
            state.registerRequest = true;
        },
        registerSuccess: (state, action) => {
            state.registerFailed = false;
            state.emailUser = action.payload.user.email;
            state.nameUser = action.payload.user.name;
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
    }
});

export const {
    registerRequest,
    registerSuccess,
    registerFailed,
    checkEmailRequest,
    checkEmailSuccess,
    checkEmailFailed
} = authReducer.actions;

export default authReducer.reducer;