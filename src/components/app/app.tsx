import { useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import LoginPage from '../../pages/login';
import MainPage from '../../pages/mainPage';
import RegisterPage from '../../pages/register';
import ResetPasswordPage from '../../pages/resetPassword';
import ForgotPasswordPage from '../../pages/forgotPassword';
import ProfilePage from '../../pages/profile';
import { ProtectedRoute } from '../protected-route';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderCardDetails from '../orderCardDetails/orderCardDetails';
import { useDispatch } from '../../services/hooks';
import { NotFound404 } from '../../pages/NotFound404';
import OrdersList from '../../pages/OrdersList';
import { getBurgerIngredients } from '../../services/actions/burger';
import AppHeader from '../../components/header/header';
import {Location} from 'history';
import Modal from '../../components/modal/modal';

type TLocataionState = {
  from: Location;
  background: Location;
};

type THistory = {
  action: string;
}

/**
 * Роутинг приложения
 */
function App(): React.ReactElement {
  let location = useLocation<TLocataionState>();
  let history = useHistory<THistory>();
  const action = history.action ==='PUSH' || history.action ==='REPLACE';
  const modalIngredientOpen = action && location.state && location.state.background;

  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(getBurgerIngredients())
  }, [dispatch]);

  let back = () => {
    history.goBack();
  };

    return (
      <>
        <AppHeader />
        <Switch location={modalIngredientOpen || location}>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/forgot-password">
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password">
            <ResetPasswordPage />
          </Route>
          <Route path="/feed" exact>
            <OrdersList />
          </Route>
          <Route path="/ingredients/:id" exact>
              <IngredientDetails />
          </Route>
          <Route path="/feed/:id" exact>
              <OrderCardDetails />
          </Route>
          <ProtectedRoute path={'/profile'}>
            <ProfilePage />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
        {!!modalIngredientOpen && (<Route path='/ingredients/:id'>
            <Modal title='Детали ингредиента' isOpened={true} onModalClose={() => back()}>
                <IngredientDetails isModal={true}/>
            </Modal>
          </Route>)}
        {!!modalIngredientOpen && (<Route path='/feed/:id'>
            <Modal isOpened={true} onModalClose={() => back()}>
                <OrderCardDetails isModal={true}/>
            </Modal>
          </Route>)}          
      </>
    );
}

export default App;
