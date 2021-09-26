import {registerUser, 
        emailExist, 
        resetPassword, 
        authorization, 
        getUserRequest,
        getNewToken,
        refreshUser,
        logoutRequest} from '../../utils/src.js';
import {setCookie, deleteCookie, getCookie} from '../../utils/utils.js';
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
    userInfoFailed
} from '../reducers/auth';

// регистрируем нового пользователя
export const registerNewUser = (form) => (dispatch) => {
    dispatch(registerRequest());
    return registerUser(form)
           .then(res => {
                if (res && res.success) {
                    setCookie('token', res.accessToken.split('Bearer ')[1]);
                    setCookie('refreshToken', res.refreshToken);
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
                    dispatch(resetPasswordSuccess());
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
                    setCookie('token', res.accessToken.split('Bearer ')[1]);
                    setCookie('refreshToken', res.refreshToken);
                    dispatch(authSuccess({email: res.user.email, name: res.user.name, password: form.password, token: res.accessToken.split('Bearer ')[1]}));
                } else {
                    dispatch(authFailed());
              }
            })
            .catch(() => {
                dispatch(authFailed());
            })
};

// запрос данных о пользователе
export const getUserInfo = () => (dispatch) => {
    if (getCookie('refreshToken')){
        return getUserRequest()
            .then(res => {
                    if (res && res.success) {
                        dispatch(userInfoSuccess({email: res.user.email, name: res.user.name}));
                    }  
                })
                .catch((err) => {
                    if (err === 403) {
                        getNewToken()
                        .then(res => {
                            deleteCookie('token');
                            deleteCookie('refreshToken');
                            setCookie('token', res.accessToken.split('Bearer ')[1]);
                            setCookie('refreshToken', res.refreshToken);
                            getUserRequest();
                        })
                    }
            })
    } else {
        dispatch(userInfoFailed());
    }
};

// обновление пользователя
export const getRefreshUser = (form) => (dispatch) => {
    return refreshUser(form)
           .then(res => {
                if (res && res.success) {
                    dispatch(userInfoSuccess({email: res.user.email, name: res.user.name}));
                }
            })
            .catch((err) => {
                if (err === 403) {
                    getNewToken()
                    .then(res => {
                        deleteCookie('token');
                        deleteCookie('refreshToken');
                        setCookie('token', res.accessToken.split('Bearer ')[1]);
                        setCookie('refreshToken', res.refreshToken);
                        refreshUser(form);
                    })
                }
            })
};

// разлогин
export const getLogoutRequest = () => (dispatch) => {
    return logoutRequest()
           .then(res => {
                if (res && res.success) {
                    deleteCookie('token');
                    deleteCookie('refreshToken');
                    dispatch(logoutSuccess());
                } 
            })
};