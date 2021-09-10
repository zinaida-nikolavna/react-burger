import { useEffect } from 'react';
import AppHeader from '../header/header';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import appStyles from './app.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getBurgerIngredients } from '../../services/actions/burger';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const { itemsFailed, itemsRequest, items } = useSelector(state => state.burger);
  const dispatch = useDispatch();

  const styles = {
    height: window.innerHeight,
    overflow: 'hidden'
  };

  useEffect(()=> {
    dispatch(getBurgerIngredients())
}, [dispatch])

  if (itemsFailed) {
    return (
      <div style={styles} className={appStyles.error}>
        Что-то пошло не так... Перезагрузите страницу
      </div>
    )
  } else if (itemsRequest) {
    return (
      <div style={styles} className={appStyles.error}>
        Загрузка...
      </div> 
    )
  } else {
    return (
      <div style={styles}>
        <div className={appStyles.header}>
          <AppHeader />
        </div>
        <main className={appStyles.main}>
          <DndProvider backend={HTML5Backend}>
              {!!items.length && <BurgerIngredients />}
              {!!items.length && <BurgerConstructor />}
          </DndProvider>    
        </main>
      </div>  
    );
  }
}

export default App;
