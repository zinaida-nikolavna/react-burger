import React from 'react';
import AppHeader from '../header/header';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import appStyles from './app.module.css';
import {data} from '../../utils/data' 

function App() {
  const styles = {
    height: window.innerHeight,
    overflow: 'hidden'
  };
  return (
    <div style={styles}>
      <div className={appStyles.header}>
        <AppHeader />
      </div>
      <main className={appStyles.main}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </main>
    </div>  
  );
}

export default App;
