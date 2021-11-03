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
import { useDispatch } from 'react-redux';
import { NotFound404 } from '../../pages/NotFound404';
import { getBurgerIngredients } from '../../services/middleware/burger';
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
  let background = location.state && location.state.background;
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
          <Route path="/" exact={true}>
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
          <Route path="/ingredients/:id" exact={true}>
              <IngredientDetails />
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
      </>
    );
}

export default App;
