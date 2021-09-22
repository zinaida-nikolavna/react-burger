import { useState, useCallback } from 'react';
import {Button, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import style from './login.module.css';
import AppHeader from '../components/header/header';
import { authUser } from '../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

// страница логина
function LoginPage() {
    const [form, setValue] = useState({ email: '', password: ''});
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const dispatch = useDispatch();

    const {isLogged} = useSelector(state => state.auth);

    const login = useCallback(
        e => {
          e.preventDefault();
          dispatch(authUser(form));
        },
        [dispatch,form]
    );

    // при успешной авторизации редиректим на главную страницу
    if (isLogged) {
        return (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        );
    }

    return (
        <>
            <AppHeader />
            <div className={style.container}>
                <form className={style.form}>
                    <h1 className='text text_type_main-medium mb-6'>Вход</h1>
                    <span className='mb-6'><Input type='email' placeholder='E-mail' onChange={onChange} value={form.email} name='email'/></span>
                    <span className='mb-6'><PasswordInput onChange={onChange} value={form.password} name="password"/></span>
                    <Button type="primary" size="large" onClick={login}>Войти</Button>
                </form>
                <div className='text text_type_main-small text_color_inactive mt-20'>
                    Вы новый пользователь? <Link to='/register' className={style.link}>Зарегистрироваться</Link>
                </div>
                <div className='text text_type_main-small text_color_inactive mt-4'>
                    Забыли пароль? <Link to='/forgot-password' className={style.link}>Восстановить пароль</Link>
                </div>
            </div>
        </>
    )
}

export default LoginPage;