import { useState, useCallback } from 'react';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import style from './login.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { resetOldPassword } from '../services/middleware/auth';
import { getCookie } from '../utils/utils';
import { submitCallback } from '../utils/types';

type TForm = {
  password: string;
  token: string;
}

/**
 * Страница сброса пароля
 */
function ResetPasswordPage(): React.ReactElement {
    const [form, setValue] = useState<TForm>({ password: '', token: ''});
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const dispatch = useDispatch();
    const {resetPasswordSuccess, isLogged, isEmailExist} = useSelector((state: any) => state.auth);

    const changePassword = useCallback<submitCallback>(
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
      <div className={style.container}>
        <form className={style.form} onSubmit={changePassword}>
          <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
          <span className='mb-6'><PasswordInput onChange={onChange} value={form.password} name='password'/></span>
          <span className='mb-6'><Input type='text' placeholder='Введите код из письма' onChange={onChange} value={form.token} name='token'/></span>
          <Button type="primary" size="large">Сохранить</Button>
        </form>
        <div className='text text_type_main-small text_color_inactive mt-20'>
          Вспомнили пароль? <Link to='/login' className={style.link}>Войти</Link>
        </div> 
      </div>
    )
}

export default ResetPasswordPage;