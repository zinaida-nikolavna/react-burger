import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './header.module.css';
import { Link } from 'react-router-dom';
import { useRouteMatch, useLocation } from 'react-router-dom';

function AppHeader() {
    const location = useLocation();
    const { url } = useRouteMatch();
    const constructor = '/';
    const profile = '/profile';
    
    return (
        <header className={`${headerStyles.header} pt-4 pb-4`}>
            <div className={headerStyles.items}>
                <Link to='/' className={`${headerStyles.item} mr-2 pt-4 pb-4 pl-5 pr-5`}>
                    <BurgerIcon type={location.pathname === constructor ? 'primary' : 'secondary'}/>
                    <p className={location.pathname === constructor ? `${headerStyles.active} ml-2` : 'ml-2 text_color_inactive' }>Конструктор</p>
                </Link>
                <div className={`${headerStyles.item} pt-4 pb-4 pl-5 pr-5`}>
                    <ListIcon type='secondary'/>
                    <p className='ml-2 text text_type_main-default text_color_inactive'>Лента заказов</p>
                </div>
            </div>
            <Logo />
            <Link to='/profile' className={`${headerStyles.item} pt-4 pb-4 pl-5 pr-5`}>
                <ProfileIcon type={url === profile ? 'primary' : 'secondary'}/>
                <p className={url === profile ? `${headerStyles.active} 'ml-2 text text_type_main-default` : 'ml-2 text text_type_main-default text_color_inactive' } >Личный кабинет</p>
            </Link>
        </header>
    );
  }
  
export default AppHeader;