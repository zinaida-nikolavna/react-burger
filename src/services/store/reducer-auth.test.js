import authReducer from './auth';
import {
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
} from './auth';

const initialState = {
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
};

describe('Reducer auth', () => {

    test('should return initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState)
    }),

    test('should return registerRequest true', () => {
        expect(authReducer(initialState, {type: registerRequest})).toEqual(
            expect.objectContaining({
                registerRequest: true
            })
        )
    })

    test('should return registerSuccess', () => {
        expect(authReducer(initialState, {type: registerSuccess, payload: {email: 'email', name: 'Kate'}})).toEqual(
            expect.objectContaining({
                registerFailed: false,
                emailUser: 'email',
                nameUser:'Kate',
                registerRequest: false,
                isLogged: true,
            })
        )
    })

    test('should return registerFailed', () => {
        expect(authReducer(initialState, {type: registerFailed})).toEqual(
            expect.objectContaining({
                registerFailed: true,
                registerRequest: false
            })
        )
    })

    test('should return checkEmailRequest', () => {
        expect(authReducer(initialState, {type: checkEmailRequest})).toEqual(
            expect.objectContaining({
                checkEmailExistRequest: true
            })
        )
    })

    test('should return checkEmailSuccess', () => {
        expect(authReducer(initialState, {type: checkEmailSuccess})).toEqual(
            expect.objectContaining({
                checkEmailExistFailed: false,
                isEmailExist: true,
                checkEmailExistRequest: false
            })
        )
    })
    
    test('should return checkEmailFailed', () => {
        expect(authReducer(initialState, {type: checkEmailFailed})).toEqual(
            expect.objectContaining({
                checkEmailExistFailed: true,
                checkEmailExistRequest: false
            })
        )
    })

    test('should return resetPasswordRequest', () => {
        expect(authReducer(initialState, {type: resetPasswordRequest})).toEqual(
            expect.objectContaining({
                resetPasswordRequest: true
            })
        )
    })

    test('should return resetPasswordSuccess', () => {
        expect(authReducer(initialState, {type: resetPasswordSuccess})).toEqual(
            expect.objectContaining({
                resetPasswordFailed: false,
                resetPasswordRequest: false,
                resetPasswordSuccess: true
            })
        )
    })

    test('should return resetPasswordFailed', () => {
        expect(authReducer(initialState, {type: resetPasswordFailed})).toEqual(
            expect.objectContaining({
                resetPasswordFailed: true,
                resetPasswordRequest: false
            })
        )
    })

    test('should return authSuccess', () => {
        expect(authReducer(initialState, {type: authSuccess, payload: {email: 'email', name: 'Kate'}})).toEqual(
            expect.objectContaining({
                registerFailed: false,
                emailUser: 'email',
                nameUser:'Kate',
                registerRequest: false,
                isLogged: true,
            })
        )
    })

    test('should return authFailed', () => {
        expect(authReducer(initialState, {type: authFailed})).toEqual(
            expect.objectContaining({
                authFailed: true
            })
        )
    })

    test('should return userInfoSuccess', () => {
        expect(authReducer(initialState, {type: userInfoSuccess, payload: {email: 'email', name: 'Kate'}})).toEqual(
            expect.objectContaining({
                isLogged: true,
                emailUser: 'email',
                nameUser:'Kate',
                refreshUserRequestFailed: false
            })
        )
    })

    test('should return logoutSuccess', () => {
        expect(authReducer(initialState, {type: logoutSuccess})).toEqual(
            expect.objectContaining({
                isLogged: false,
                logoutRequestFailed: false
            })
        )
    })

    test('should return userInfoFailed', () => {
        expect(authReducer(initialState, {type: userInfoFailed})).toEqual(
            expect.objectContaining({
                isLogged: false
            })
        )
    })

    test('should return refreshUserFailed', () => {
        expect(authReducer(initialState, {type: refreshUserFailed})).toEqual(
            expect.objectContaining({
                refreshUserRequestFailed: true
            })
        )
    })

    test('should return logoutRequestFailed', () => {
        expect(authReducer(initialState, {type: logoutRequestFailed})).toEqual(
            expect.objectContaining({
                logoutRequestFailed: true
            })
        )
    })
})