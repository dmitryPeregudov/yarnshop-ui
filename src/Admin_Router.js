import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import TokenStorage from "./service/token_storage";


const PrivateRoute = ({component: Component, roles, ...rest}) => (<Route {...rest} render={props => {
    const storage = new TokenStorage();
    const currentUser = storage.getRole();
    if (!currentUser || currentUser !== "admin") {
        return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    }
    return <Component {...props} />
}}/>)
export default PrivateRoute;

