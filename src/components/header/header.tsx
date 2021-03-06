import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './header.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {Location} from 'history';

/**
 * Шапка сайта
 */
function AppHeader(): React.ReactElement {
    const location = useLocation<Location>();
    const constructor = '/';
    const profile = '/profile';
    const feed = '/feed';
    
    return (
        <header className={`${headerStyles.header} pt-4 pb-4`}>
            <div className={headerStyles.items}>
                <Link to='/' data-qa='main-link' className={`${headerStyles.item} mr-2 pt-4 pb-4 pl-5 pr-5`}>
                    <BurgerIcon type={location?.pathname === constructor ? 'primary' : 'secondary'}/>
                    <p className={location?.pathname === constructor ? `${headerStyles.active} ml-2` : 'ml-2 text_color_inactive' }>Конструктор</p>
                </Link>
                <Link to='/feed' className={`${headerStyles.item} pt-4 pb-4 pl-5 pr-5`}>
                    <ListIcon type={location?.pathname === feed ? 'primary' : 'secondary'}/>
                    <p className={location?.pathname === feed ? `${headerStyles.active} ml-2 text text_type_main-default` : 'ml-2 text text_type_main-default text_color_inactive' }>Лента заказов</p>
                </Link>
            </div>
            <Logo />
            <Link to='/profile' data-qa='profile-link' className={`${headerStyles.item} pt-4 pb-4 pl-5 pr-5`}>
                <ProfileIcon type={location?.pathname === profile ? 'primary' : 'secondary'}/>
                <p className={location?.pathname === profile ? `${headerStyles.active} ml-2 text text_type_main-default` : 'ml-2 text text_type_main-default text_color_inactive' } >Личный кабинет</p>
            </Link>
        </header>
    );
  }
  
export default AppHeader;