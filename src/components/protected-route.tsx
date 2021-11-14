import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { getUserInfo } from '../services/actions/auth';
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

    const {isLogged} = useSelector(state => state.auth);

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
