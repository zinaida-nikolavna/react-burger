import { Link } from 'react-router-dom';
//import styles from './not-found.module.css';
import style from './login.module.css';

export const NotFound404 = () => {
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