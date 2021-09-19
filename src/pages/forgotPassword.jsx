import { useState } from 'react';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import style from './login.module.css';
import AppHeader from '../components/header/header';

// страница логина
function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const onChangeEmail = e => {
        setEmail(e.target.value)
    };

    return (
        <>
            <AppHeader />
            <div className={style.container}>
                <form className={style.form}>
                    <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
                    <span className='mb-6'><Input type='email' placeholder='Укажите e-mail' onChange={onChangeEmail} value={email}/></span>
                    <Button type="primary" size="large">Восстановить</Button>
                </form>
                <div className='text text_type_main-small text_color_inactive mt-20'>
                    Вспомнили пароль? <Link to='/login' className={style.link}>Войти</Link>
                </div> 
            </div>
        </>
    )
}

export default ForgotPasswordPage;