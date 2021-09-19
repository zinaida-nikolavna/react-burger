import { useState } from 'react';
import {Button, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './login.module.css';
import { Link } from 'react-router-dom';
import AppHeader from '../components/header/header';

// страница регистрации
function RegisterPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const onChangeLogin = e => {
        setLogin(e.target.value)
    }

    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const onChangeName = e => {
        setName(e.target.value)
    }

    return (
        <>
            <AppHeader />
            <div className={style.container}>
                <form className={style.form}>
                    <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
                    <span className='mb-6'><Input type='text' placeholder='Имя' onChange={onChangeName} value={name}/></span>
                    <span className='mb-6'><Input type='email' placeholder='E-mail' onChange={onChangeLogin} value={login}/></span>
                    <span className='mb-6'><PasswordInput onChange={onChangePassword} value={password}/></span>
                    <Button type="primary" size="large">Зарегистрироваться</Button>
                </form>
                <div className='text text_type_main-small text_color_inactive mt-20'>
                    Уже зарегистрированы? <Link to='/login' className={style.link}>Войти</Link>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;