import { createSlice } from '@reduxjs/toolkit';

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        emailUser: '',
        nameUser: '',
        registerRequest: false,
        registerFailed: false,
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
    }
});

export const {
    registerRequest,
    registerSuccess,
    registerFailed
} = authReducer.actions;

export default authReducer.reducer;