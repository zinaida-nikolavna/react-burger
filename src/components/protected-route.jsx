import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../services/actions/auth';

export function ProtectedRoute({ children, ...rest }) {
    const [isUserLoaded, setUserLoaded] = useState(false);

    const dispatch = useDispatch();

    const init = async () => {
        await dispatch(getUserInfo());
        setUserLoaded(true);
    };

    useEffect(()=> {
        init();
    }, []);

    const {isLogged} = useSelector(state => state.auth);

    if (!isUserLoaded) {
        return null;
    }

    return (
        <Route
        {...rest}
        render={({ location }) =>
            isLogged ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: '/login',
                state: { from: location }
                }}
            />
            )
        }
        />
    );
}
