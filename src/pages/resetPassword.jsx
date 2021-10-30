import { useState, useCallback } from 'react';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import style from './login.module.css';
import AppHeader from '../components/header/header';
import { useSelector, useDispatch } from 'react-redux';
import { resetOldPassword } from '../services/middleware/auth';
import { getCookie } from '../utils/utils.js';

// страница логина
function ResetPasswordPage() {
    const [form, setValue] = useState({ password: '', token: ''});
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const dispatch = useDispatch();
    const {resetPasswordSuccess, isLogged, isEmailExist} = useSelector(state => state.auth);

    const changePassword = useCallback(
        e => {
          e.preventDefault();
          dispatch(resetOldPassword(form));
        },
        [dispatch, form]
    );

    // при успешной смене пароля редиректим на страницу профиля
    if (resetPasswordSuccess) {
        return (
          <Redirect
            to={{
              pathname: '/profile'
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

    // если пользователь попал не со страницы восстановления пароля, то редиректим его
    if (!isEmailExist) {
        return (
          <Redirect
            to={{
              pathname: '/login'
            }}
          />
        );
    }

    return (
        <>
        <AppHeader />
            <div className={style.container}>
                <form className={style.form}>
                    <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
                    <span className='mb-6'><PasswordInput onChange={onChange} value={form.password} name='password'/></span>
                    <span className='mb-6'><Input type='text' placeholder='Введите код из письма' onChange={onChange} value={form.token} name='token'/></span>
                    <Button type="primary" size="large" onClick={changePassword}>Сохранить</Button>
                </form>
                <div className='text text_type_main-small text_color_inactive mt-20'>
                    Вспомнили пароль? <Link to='/login' className={style.link}>Войти</Link>
                </div> 
            </div>
        </>
    )
}

export default ResetPasswordPage;