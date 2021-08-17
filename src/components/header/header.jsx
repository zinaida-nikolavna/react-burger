import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './header.module.css';

function AppHeader() {
    return (
        <header className={`${headerStyles.header} pt-4 pb-4`}>
            <div className={headerStyles.items}>
                <div className={`${headerStyles.item} mr-2 pt-4 pb-4 pl-5 pr-5`}>
                    <BurgerIcon type='primary'/>
                    <p className='ml-2'>Конструктор</p>
                </div>
                <div className={`${headerStyles.item} pt-4 pb-4 pl-5 pr-5`}>
                    <ListIcon type='secondary'/>
                    <p className='ml-2 text text_type_main-default text_color_inactive'>Лента заказов</p>
                </div>
            </div>
            <Logo />
            <div className={`${headerStyles.item} pt-4 pb-4 pl-5 pr-5`}>
                <ProfileIcon type='secondary'/>
                <p className='ml-2 text text_type_main-default text_color_inactive'>Личный кабинет</p>
            </div>
        </header>
    );
  }
  
  export default AppHeader;