import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoadingScreen from './components/load/LoadingScreen'

interface PrivateRouteProps {
    component: any; 
    // rest: any[];
    exact: boolean;
    path: string;
}

export const PrivateRoute = ({ component: Component, ...rest}: PrivateRouteProps
    ) => {
        const { currentUser, authLoading } = useAuth()
    if (authLoading) {
        return <LoadingScreen />
    } else {
        return(
            <Route
                {...rest}
                render={props => {
                   return currentUser? <Component {...props}></Component> : <Redirect to='/login'/>   
                }}         
                >
            </Route>
        )
    }
}