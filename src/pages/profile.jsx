import { useEffect, useState, useCallback } from 'react';
import {EmailInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './login.module.css';
import styleProfile from './profile.module.css';
import { NavLink, Redirect } from 'react-router-dom';
import AppHeader from '../components/header/header';
import { getUserInfo, getRefreshUser, getLogoutRequest} from '../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getCookie } from '../utils/utils.js';

// страница личного кабинета
function ProfilePage() {
    const dispatch = useDispatch();
    const {emailUser, nameUser} = useSelector(state => state.auth);
    const [activeName, setActiveName] = useState(true);
    const [isLogged, setIsLogged] = useState(true);
    const [activePassword, setActivePassword] = useState(true);
    const [form, setValue] = useState({ email: emailUser, password: '', name: nameUser });
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(()=> {
        dispatch(getUserInfo());
    }, []);

    useEffect(()=> {
        setValue({ email: emailUser, password: '', name: nameUser });
    }, [emailUser, nameUser]);

    const save = useCallback(
        e => {
          e.preventDefault();
          dispatch(getRefreshUser(form));
        },
        [dispatch,form]
    );

    // разлогин
    const logout = useCallback(
        async () => {
            await dispatch(getLogoutRequest());
            setIsLogged(false);
        },
        [dispatch]
    );

    // если пользователь не авторизован редиректим на логин
    if (!isLogged || !getCookie('refreshToken')) {
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
                        <NavLink activeClassName={styleProfile.active} className={`${styleProfile.navItem} text text_type_main-medium text_color_inactive`} exact to={{pathname: '/profile'}}>Профиль</NavLink>
                        <NavLink activeClassName={styleProfile.active} className={`${styleProfile.navItem} text text_type_main-medium text_color_inactive`} exact to={{pathname: '/profile/orders'}}>История заказов</NavLink>
                        <div className={`${styleProfile.navItem} text text_type_main-medium text_color_inactive`} onClick={logout}>Выход</div>   
                    </nav>
                    <div className='text text_type_main-small text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</div>
                </div>
                <div className={styleProfile.detail}>
                <Switch>
                    <Route path='/profile' exact={true}>
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
                    </Route>
                    <Route path='/profile/orders' exact={true}>
                        <div className='text text_type_main-medium text_color_inactive'>Здесь будет история заказов</div>
                    </Route>    
                </Switch>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;