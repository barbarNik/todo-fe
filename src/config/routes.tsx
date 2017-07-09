import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../App';
import LoginContainer from '../routes/login/LoginContainer';
import AuthAreaContainer from '../routes/auth/AuthAreaContainer';
import ItemsContainer from '../routes/items/ItemsContainer';
export default (
    <Route path="/" component={App}>
        <IndexRoute component={LoginContainer}/>
        <Route component={AuthAreaContainer}>
            <Route component={ItemsContainer} path="items"/>
        </Route>
    </Route>
);
