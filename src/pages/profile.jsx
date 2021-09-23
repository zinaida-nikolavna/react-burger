import { useEffect, useState, useCallback } from 'react';
import {EmailInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './login.module.css';
import styleProfile from './profile.module.css';
import { Link, Redirect } from 'react-router-dom';
import AppHeader from '../components/header/header';
import { getUserInfo, getRefreshUser, getLogoutRequest} from '../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

// страница личного кабинета
function ProfilePage() {
    const dispatch = useDispatch();
    const {emailUser, nameUser, passwordUser} = useSelector(state => state.auth);
    const [activeName, setActiveName] = useState(true);
    const [isLogged, setIsLogged] = useState(true);
    const [activePassword, setActivePassword] = useState(true);
    const [form, setValue] = useState({ email: emailUser, password: passwordUser, name: nameUser });
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(()=> {
        dispatch(getUserInfo());
    }, []);

    useEffect(()=> {
        setValue({ email: emailUser, password: passwordUser, name: nameUser });
    }, [emailUser, passwordUser, nameUser]);

    const save = useCallback(
        e => {
          e.preventDefault();
          dispatch(getRefreshUser(form));
        },
        [dispatch,form]
    );

    const logout = useCallback(
        async () => {
            await dispatch(getLogoutRequest());
            setIsLogged(false);
        },
        [dispatch]
    );

    if (!isLogged) {
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
            <div className={styleProfile.container}>
                <div className={styleProfile.navWrapper}>
                    <nav className={styleProfile.nav}>
                        <Link className={`${styleProfile.navItem} ${styleProfile.active} text text_type_main-medium`} to='/profile'>Профиль</Link>
                        <Link className={`${styleProfile.navItem} text text_type_main-medium text_color_inactive`} to='/profile/orders'>История заказов</Link>
                        <div className={`${styleProfile.navItem} text text_type_main-medium text_color_inactive`} onClick={logout}>Выход</div>   
                    </nav>
                    <div className='text text_type_main-small text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</div>
                </div>
                <div className={styleProfile.form}>   
                    <form className={style.form}>
                        <span className='mb-6'>
                            <Input
                            className='name' 
                            disabled={activeName} 
                            type='text' 
                            placeholder='Имя'
                            name='name' 
                            value={form.name} 
                            icon='EditIcon'
                            onChange={onChange}
                            onBlur={() => setActiveName(true)}
                            onIconClick={() => setActiveName(false)}/>
                        </span>
                        <span className='mb-6'>
                            <EmailInput 
                            value={form.email}
                            name='email' 
                            onChange={onChange}/>
                        </span>
                        <span className='mb-6'>
                            <Input 
                            disabled={activePassword} 
                            type='password' 
                            placeholder='Пароль'
                            name='password' 
                            value={form.password} 
                            icon='EditIcon'
                            onChange={onChange}
                            onBlur={() => setActivePassword(true)} 
                            onIconClick={() => setActivePassword(false)}/>
                        </span>
                        <Button type="primary" size="large" onClick={save}>Сохранить</Button>
                    </form>
                </div> 
            </div>
        </>
    )
}

export default ProfilePage;