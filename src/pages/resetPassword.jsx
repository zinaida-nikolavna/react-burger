import { useState } from 'react';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import style from './login.module.css';
import AppHeader from '../components/header/header';

// страница логина
function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState('');
    const [emailPassword, setemailPassword] = useState('');
    const onChangeNewPassword = e => {
        setNewPassword(e.target.value)
    }

    const onChangeEmailPassword = e => {
        setemailPassword(e.target.value)
    }

    return (
        <>
        <AppHeader />
            <div className={style.container}>
                <form className={style.form}>
                    <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
                    <span className='mb-6'><PasswordInput onChange={onChangeNewPassword} value={newPassword}/></span>
                    <span className='mb-6'><Input type='text' placeholder='Введите код из письма' onChange={onChangeEmailPassword} value={emailPassword}/></span>
                    <Button type="primary" size="large">Сохранить</Button>
                </form>
                <div className='text text_type_main-small text_color_inactive mt-20'>
                    Вспомнили пароль? <Link to='/login' className={style.link}>Войти</Link>
                </div> 
            </div>
        </>
    )
}

export default ResetPasswordPage;