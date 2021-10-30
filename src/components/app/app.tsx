import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from '../../pages/login';
import MainPage from '../../pages/mainPage';
import RegisterPage from '../../pages/register';
import ResetPasswordPage from '../../pages/resetPassword';
import ForgotPasswordPage from '../../pages/forgotPassword';
import ProfilePage from '../../pages/profile';
import { ProtectedRoute } from '../protected-route.tsx';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useSelector, useDispatch } from 'react-redux';
import { NotFound404 } from '../../pages/NotFound404';
import { getBurgerIngredients } from '../../services/middleware/burger';

/**
 * Роутинг приложения
 */
function App(): React.ReactElement {
  // проверяем открыто ли модальное окно с ингредиентом
  // если да, то не должен происходить переход по маршруту
  const ingredient = useSelector((state: any) => state.burger.showedIngredient);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(getBurgerIngredients())
  }, [dispatch]);

    return (
      <Router>
        <Switch>
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
          {!ingredient && <Route path='/ingredients/:id'>
            <IngredientDetails />
          </Route>}
          <ProtectedRoute path={'/profile'}>
            <ProfilePage />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </Router>
    );
}

export default App;
