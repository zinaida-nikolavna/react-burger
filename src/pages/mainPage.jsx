import { useEffect } from 'react';
import AppHeader from '../components/header/header';
import BurgerIngredients from '../components/burgerIngredients/burgerIngredients';
import BurgerConstructor from '../components/burgerConstructor/burgerConstructor';
import style from './mainPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getBurgerIngredients } from '../services/actions/burger';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function MainPage() {
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
      <div style={styles} className={style.error}>
        Что-то пошло не так... Перезагрузите страницу
      </div>
    )
  } else if (itemsRequest) {
    return (
      <div style={styles} className={style.error}>
        Загрузка...
      </div> 
    )
  } else {
    return (
      <div style={styles}>
          <AppHeader />
        <main className={style.main}>
          <DndProvider backend={HTML5Backend}>
              {!!items.length && <BurgerIngredients />}
              {!!items.length && <BurgerConstructor />}
          </DndProvider>    
        </main>
      </div>  
    );
  }
}

export default MainPage;