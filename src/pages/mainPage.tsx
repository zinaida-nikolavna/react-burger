import BurgerIngredients from '../components/burgerIngredients/burgerIngredients';
import BurgerConstructor from '../components/burgerConstructor/burgerConstructor';
import style from './mainPage.module.css';
import { useSelector } from '../services/hooks';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

/**
 * Главная страница
 */
function MainPage(): React.ReactElement {
  const { itemsFailed, itemsRequest, items } = useSelector(state => state.burger);

  const styles = {
    height: window.innerHeight,
    overflow: 'hidden'
  };

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