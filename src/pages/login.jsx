import { useState } from 'react';
import {Button, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import style from './login.module.css';
import AppHeader from '../components/header/header';

// страница логина
function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const onChangeLogin = e => {
        setLogin(e.target.value)
    };

    const onChangePassword = e => {
        setPassword(e.target.value)
    };
    
    return (
        <>
            <AppHeader />
            <div className={style.container}>
                <form className={style.form}>
                    <h1 className='text text_type_main-medium mb-6'>Вход</h1>
                    <span className='mb-6'><Input type='email' placeholder='E-mail' onChange={onChangeLogin} value={login} name='email'/></span>
                    <span className='mb-6'><PasswordInput onChange={onChangePassword} value={password} name="password"/></span>
                    <Button type="primary" size="large">Войти</Button>
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