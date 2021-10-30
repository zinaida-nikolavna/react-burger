import { Link } from 'react-router-dom';
import style from './login.module.css';

/**
 * Страница 404
 */
export const NotFound404 = (): React.ReactElement => {
  return (
    <div className={style.container}>
      <div className={style.form}>
        <img src='/images/404.png' />
        <br />
        <Link to='/' className={`${style.link} text text_type_main-medium`}>Перейти в конструктор бургера</Link>
      </div>
    </div>
  );
};