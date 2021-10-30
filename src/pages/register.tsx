import { useState, useCallback } from 'react';
import {Button, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './login.module.css';
import { Link, Redirect } from 'react-router-dom';
import AppHeader from '../components/header/header';
import { registerNewUser } from '../services/middleware/auth';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../utils/utils';
import { TForm, clickCallback } from '../utils/types';

/**
 * Страница регистрации
 */
function RegisterPage(): React.ReactElement {
    const [form, setValue] = useState<TForm>({ email: '', password: '', name: '' });
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const dispatch = useDispatch();
    const {nameUser, registerRequest, registerFailed} = useSelector((state: any) => state.auth);

    const register = useCallback<clickCallback>(
        e => {
          e.preventDefault();
          dispatch(registerNewUser(form));
        },
        [dispatch,form]
    );

    // при успешной регистрации редиректим на главную страницу
    if (nameUser || getCookie('refreshToken')) {
        return (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        );
    }
    
    // при загрузке или неудачной регистрации
    if (registerFailed || registerRequest) {
        return (
            <div className={style.container}>
                <span className='text text_type_main-large'>{registerFailed ? 'Что-то пошло не так, регистрация не удалась, перезагрузите страницу и попробуйте заново' : 'Загрузка...'}</span>
            </div>
        )
    }
    
    return (
        <>
            <AppHeader />
            <div className={style.container}>
                <form className={style.form}>
                    <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
                    <span className='mb-6'><Input type='text' placeholder='Имя' onChange={onChange} value={form.name} name="name"/></span>
                    <span className='mb-6'><Input type='email' placeholder='E-mail' onChange={onChange} value={form.email} name="email"/></span>
                    <span className='mb-6'><PasswordInput onChange={onChange} value={form.password} name="password"/></span>
                    <Button type="primary" size="large" onClick={register}>Зарегистрироваться</Button>
                </form>
                <div className='text text_type_main-small text_color_inactive mt-20'>
                    Уже зарегистрированы? <Link to='/login' className={style.link}>Войти</Link>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;