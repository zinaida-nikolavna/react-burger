import {registerUser, emailExist, resetPassword, authorization} from '../../utils/src.js';
import {setCookie} from '../../utils/utils.js';
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
    authFailed
} from '../reducers/auth';

// регистрируем нового пользователя
export const registerNewUser = (form) => (dispatch) => {
    dispatch(registerRequest());
    return registerUser(form)
           .then(res => {
                if (res && res.success) {
                    setCookie('token', res.refreshToken);
                    dispatch(registerSuccess({email: res.user.email, name: res.user.name, password: form.password, token: res.accessToken.split('Bearer ')[1]}));
                } else {
                    dispatch(registerFailed());
              }
            })
            .catch(() => {
                dispatch(registerFailed());
            })
};

// проверка на наличие существующего email
export const checkEmailExist = (email) => (dispatch) => {
    dispatch(checkEmailRequest());
    return emailExist(email)
           .then(res => {
                if (res && res.success) {
                    dispatch(checkEmailSuccess());
                } else {
                    dispatch(checkEmailFailed());
              }
            })
            .catch(() => {
                dispatch(checkEmailFailed());
            })
};

// сброс пароля
export const resetOldPassword = (form) => (dispatch) => {
    dispatch(resetPasswordRequest());
    return resetPassword(form)
           .then(res => {
                if (res && res.success) {
                    dispatch(resetPasswordSuccess(form.password));
                } else {
                    dispatch(resetPasswordFailed());
              }
            })
            .catch(() => {
                dispatch(resetPasswordFailed());
            })
};

// авторизация
export const authUser = (form) => (dispatch) => {
    return authorization(form)
           .then(res => {
                if (res && res.success) {
                    setCookie('token', res.refreshToken);
                    dispatch(authSuccess({email: res.user.email, name: res.user.name, password: form.password, token: res.accessToken.split('Bearer ')[1]}));
                } else {
                    dispatch(authFailed());
              }
            })
            .catch(() => {
                dispatch(authFailed());
            })
};