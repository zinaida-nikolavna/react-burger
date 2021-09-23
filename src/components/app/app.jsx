import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from '../../pages/login';
import MainPage from '../../pages/mainPage';
import RegisterPage from '../../pages/register';
import ResetPasswordPage from '../../pages/resetPassword';
import ForgotPasswordPage from '../../pages/forgotPassword';
import ProfilePage from '../../pages/profile';
import { ProtectedRoute } from '../protected-route';

function App() {
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
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
        </Switch>
      </Router>
    );
}

export default App;
