import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from '../../pages/login';
import MainPage from '../../pages/mainPage';
import RegisterPage from '../../pages/register';
import ResetPasswordPage from '../../pages/resetPassword';
import ForgotPasswordPage from '../../pages/forgotPassword';
import ProfilePage from '../../pages/profile';
import { ProtectedRoute } from '../protected-route';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useSelector } from 'react-redux';

function App() {
  // проверяем открыто ли модальное окно с ингредиентом
  // если да, то не должен происходить переход по маршруту
  const ingredient = useSelector(state => state.burger.showedIngredient);

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
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
        </Switch>
      </Router>
    );
}

export default App;
