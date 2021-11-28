import {registerUser, 
        emailExist, 
        resetPassword, 
        authorization, 
        getUserRequest,
        getNewToken,
        refreshUser,
        logoutRequest} from '../../utils/src';
import {setCookie, deleteCookie} from '../../utils/utils';
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
} from '../store/auth';
import { TForm } from '../../utils/types'; 
import {  AppDispatch, AppThunk  } from '../store';


// регистрируем нового пользователя
export const registerNewUser: AppThunk = (form: TForm) => (dispatch: AppDispatch) => {
    dispatch(registerRequest());
    return registerUser(form)
           .then(res => {
                if (res && res.success) {
                    setCookie('token', res.accessToken.split('Bearer ')[1]);
                    setCookie('refreshToken', res.refreshToken);
                    dispatch(registerSuccess({email: res.user.email, name: res.user.name}));
                } else {
                    dispatch(registerFailed());
              }
            })
            .catch(() => {
                dispatch(registerFailed());
            })
};

// проверка на наличие существующего email
export const checkEmailExist: AppThunk = (email: string) => (dispatch: AppDispatch) => {
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
export const resetOldPassword: AppThunk = (form: TForm) => (dispatch: AppDispatch) => {
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
export const authUser: AppThunk = (form: TForm) => (dispatch: AppDispatch) => {
    return authorization(form)
           .then(res => {
                if (res && res.success) {
                    setCookie('token', res.accessToken.split('Bearer ')[1]);
                    setCookie('refreshToken', res.refreshToken);
                    dispatch(authSuccess({email: res.user.email, name: res.user.name}));
                } else {
                    dispatch(authFailed());
              }
            })
            .catch(() => {
                dispatch(authFailed());
            })
};

// запрос данных о пользователе
export const getUserInfo: AppThunk = () => (dispatch: AppDispatch) => {
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
                        .catch(() => {
                            dispatch(userInfoFailed());
                        });
                    } else {
                        dispatch(userInfoFailed());
                    }
            })
};

// обновление пользователя
export const getRefreshUser: AppThunk = (form: TForm) => (dispatch: AppDispatch) => {
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
                .catch(() => {
                    dispatch(userInfoFailed());
                });
            } else {
                dispatch(refreshUserFailed());
            }
        })
};

// разлогин
export const getLogoutRequest: AppThunk = () => (dispatch: AppDispatch) => {
    return logoutRequest()
           .then(res => {
                if (res && res.success) {
                    deleteCookie('token');
                    deleteCookie('refreshToken');
                    dispatch(logoutSuccess());
                } 
            })
            .catch(() => {
                dispatch(logoutRequestFailed());
            });
};