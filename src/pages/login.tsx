import { useState, useCallback } from 'react';
import {Button, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import style from './login.module.css';
import { authUser } from '../services/actions/auth';
import { useSelector, useDispatch } from '../services/hooks';
import { getCookie } from '../utils/utils';
import {Location} from 'history';
import { TForm, submitCallback } from '../utils/types';

type TLoginForm = Pick<TForm, 'email' | 'password'>

type LocationState = {
    from: Location;
};

/**
 * Страница логина
 */
function LoginPage(): React.ReactElement {
    const [form, setValue] = useState<TLoginForm>({ email: '', password: ''});
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const dispatch = useDispatch();
    const location = useLocation<LocationState>();
    const {state} = location;

    const isLogged = useSelector(state => state.auth.isLogged);

    const login = useCallback<submitCallback>(
        e => {
          e.preventDefault();
          dispatch(authUser(form));
        },
        [dispatch,form]
    );

    // при успешной авторизации редиректим на главную страницу
    if (isLogged || getCookie('refreshToken')) {
        return (
          <Redirect
          to={ state?.from || '/' }
          />
        );
    }

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={login}>
                <h1 className='text text_type_main-medium mb-6'>Вход</h1>
                <span className='mb-6'><Input type='email' placeholder='E-mail' onChange={onChange} value={form.email} name='email'/></span>
                <span className='mb-6'><PasswordInput onChange={onChange} value={form.password} name="password"/></span>
                <Button type="primary" size="large">Войти</Button>
            </form>
            <div className='text text_type_main-small text_color_inactive mt-20'>
                Вы новый пользователь? <Link to='/register' className={style.link}>Зарегистрироваться</Link>
            </div>
            <div className='text text_type_main-small text_color_inactive mt-4'>
                Забыли пароль? <Link to='/forgot-password' className={style.link}>Восстановить пароль</Link>
            </div>
        </div>
    )
}

export default LoginPage;