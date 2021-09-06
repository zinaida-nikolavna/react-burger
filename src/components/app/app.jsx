import {useState, useEffect} from 'react';
import AppHeader from '../header/header';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import appStyles from './app.module.css';
import {AppContext} from '../../utils/appContext.js';
import {IngredientsContext} from '../../utils/appContext.js';
import {fetchData} from '../../utils/src.js';

function App() {
  const [burgerData, setState] = useState([]);
  const [isError, setIsError] = useState(false);
  const [ingredientsData, setIngredients] = useState([]);

  const styles = {
    height: window.innerHeight,
    overflow: 'hidden'
  };

  useEffect(() => { 
    const getData = async () => {
      try {
        const res = await fetchData();
        const data = await res;
        setState(data.data);
      }
      catch {
        setIsError(true);
      }
    }; 
    getData();
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
          <IngredientsContext.Provider value={[ingredientsData, setIngredients]}>
            <AppContext.Provider value={burgerData}>
              {!!burgerData.length && <BurgerIngredients />}
              {!!burgerData.length && <BurgerConstructor />}
            </AppContext.Provider>
          </IngredientsContext.Provider>
        </main>
      </div>  
    );
  }
}

export default App;
