import {EmailInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './login.module.css';
import { Link } from 'react-router-dom';
import AppHeader from '../components/header/header';

// страница личного кабинета
function ProfilePage() {

    return (
        <>
            <AppHeader />
            <div>
                <div>
                    <nav>
                        <ul>
                        <Link>Профиль</Link>
                        <Link>История заказов</Link>
                        <Link>Выход</Link>   
                        </ul>
                    </nav>
                    <div>В этом разделе вы можете изменить свои персональные данные</div>
                </div>
                <div className={style.container}>   
                    <form className={style.form}>
                        <span className='mb-6'><Input disabled={true} type='text' placeholder='Имя' /></span>
                        <span className='mb-6'><EmailInput /></span>
                        <span className='mb-6'><Input disabled={true} type='password' placeholder='Пароль' /></span>
                    </form>
                </div> 
            </div>
        </>
    )
}

export default ProfilePage;