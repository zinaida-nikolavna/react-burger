import React from 'react';
import AppHeader from '../header/header';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import appStyles from './app.module.css';

const FETCH_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [burgerData, setState] = React.useState([]);
  const [isError, setIsError] = React.useState(false);

  const styles = {
    height: window.innerHeight,
    overflow: 'hidden'
  };

  React.useEffect(() => {
    const fetchData = () => {
      fetch(FETCH_URL)
        .then(res => res.json())
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
          {!!burgerData.length && <BurgerIngredients data={burgerData}/>}
          {!!burgerData.length && <BurgerConstructor data={burgerData}/>}
        </main>
      </div>  
    );
  }
}

export default App;
