import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../services/middleware/auth';
import { RouteProps } from 'react-router';

export function ProtectedRoute({ children, ...rest }: RouteProps): React.ReactElement {
    const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

    const dispatch = useDispatch();

    const init = async (): Promise<void> => {
        await dispatch(getUserInfo());
        setUserLoaded(true);
    };

    useEffect(()=> {
        init();
    }, []);

    const {isLogged} = useSelector((state: any) => state.auth);

    if (!isUserLoaded) {
        return <></>;
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
