import React, {useState, useEffect} from 'react';
import AppHeader from '../header/header';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import appStyles from './app.module.css';
import {AppContext} from '../../utils/appContext.js';

const FETCH_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [burgerData, setState] = useState([]);
  const [isError, setIsError] = useState(false);

  const styles = {
    height: window.innerHeight,
    overflow: 'hidden'
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(FETCH_URL)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(`Ошибка ${res.status}`);
          }
        })
        .then(data => setState(data.data))
        .catch(() => {
          setIsError(true);
        });
    }
      fetchData();
  }, []);

  if (isError) {
    return (
      <div style={styles} className={appStyles.error}>
        Что-то пошло не так... Перезагрузите страницу
      </div>
    )
  } else {
    return (
      <div style={styles}>
        <div className={appStyles.header}>
          <AppHeader />
        </div>
        <main className={appStyles.main}>
          <AppContext.Provider value={burgerData}>
            {!!burgerData.length && <BurgerIngredients />}
            {!!burgerData.length && <BurgerConstructor />}
          </AppContext.Provider>
        </main>
      </div>  
    );
  }
}

export default App;
