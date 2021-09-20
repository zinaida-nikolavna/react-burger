import {registerUser} from '../../utils/src.js';
import {setCookie} from '../../utils/utils.js';
import {
    registerRequest,
    registerSuccess,
    registerFailed
} from '../reducers/auth';

// регистрируем нового пользователя
export const registerNewUser = (form) => (dispatch) => {
    dispatch(registerRequest());
    return registerUser(form)
           .then(res => {
                if (res && res.success) {
                    setCookie('token', res.accessToken.split('Bearer ')[1]);
                    dispatch(registerSuccess(res));
                } else {
                    dispatch(registerFailed());
              }
            })
            .catch(() => {
                dispatch(registerFailed());
            })
};