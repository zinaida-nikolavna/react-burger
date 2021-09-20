import { useState, useCallback } from 'react';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import style from './login.module.css';
import AppHeader from '../components/header/header';
import { useSelector, useDispatch } from 'react-redux';
import { checkEmailExist } from '../services/actions/auth';

// страница логина
function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const {checkEmailExistRequest, checkEmailExistFailed, isEmailExist} = useSelector(state => state.auth);

    const onChangeEmail = e => {
        setEmail(e.target.value)
    };

    const checkEmail = useCallback(
        e => {
          e.preventDefault();
          dispatch(checkEmailExist(email));
        },
        [dispatch, email]
    );

    // при успешной регистрации редиректим на главную страницу
    if (isEmailExist) {
        return (
          <Redirect
            to={{
              pathname: '/reset-password'
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
        <>
            <AppHeader />
            <div className={style.container}>
                <form className={style.form}>
                    <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
                    <span className='mb-6'><Input type='email' placeholder='Укажите e-mail' onChange={onChangeEmail} value={email}/></span>
                    <Button type="primary" size="large" onClick={checkEmail}>Восстановить</Button>
                </form>
                <div className='text text_type_main-small text_color_inactive mt-20'>
                    Вспомнили пароль? <Link to='/login' className={style.link}>Войти</Link>
                </div> 
            </div>
        </>
    )
}

export default ForgotPasswordPage;