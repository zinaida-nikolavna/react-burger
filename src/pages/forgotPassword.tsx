import { useState, useCallback } from 'react';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import style from './login.module.css';
import { useSelector, useDispatch } from '../services/hooks';
import { checkEmailExist } from '../services/actions/auth';
import { getCookie } from '../utils/utils';
import { submitCallback } from '../utils/types';

/**
 * страница Забыли пароль
 */
function ForgotPasswordPage(): React.ReactElement {
    const [email, setEmail] = useState<string>('');
    const dispatch = useDispatch();
    const {checkEmailExistRequest, checkEmailExistFailed, isEmailExist, isLogged} = useSelector(state => state.auth);

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };

    const checkEmail = useCallback<submitCallback>(
        e => {
          e.preventDefault();
          dispatch(checkEmailExist(email));
        },
        [dispatch, email]
    );

    // при успешной регистрации редиректим на страницу сброса пароля
    if (isEmailExist) {
        return (
          <Redirect
            to={{
              pathname: '/reset-password'
            }}
          />
        );
    }

    // если пользователь авторизован он не может перейти на страницу изменения пароля
    if (isLogged || getCookie('refreshToken')) {
        return (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        );
    }

    if (checkEmailExistRequest || checkEmailExistFailed) {
        return (
            <div className={style.container}>
                <span className='text text_type_main-large'>{checkEmailExistFailed ? 'Что-то пошло не так, перезагрузите страницу и попробуйте заново' : 'Загрузка...'}</span>
            </div>
        )
    }

    return (
      <div className={style.container}>
        <form className={style.form} onSubmit={checkEmail}>
          <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
          <span className='mb-6'><Input type='email' placeholder='Укажите e-mail' onChange={onChangeEmail} value={email}/></span>
          <Button type="primary" size="large">Восстановить</Button>
        </form>
        <div className='text text_type_main-small text_color_inactive mt-20'>
          Вспомнили пароль? <Link to='/login' className={style.link}>Войти</Link>
        </div> 
      </div>
    )
}

export default ForgotPasswordPage;