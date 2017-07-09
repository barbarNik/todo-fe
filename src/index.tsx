import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './config/routes';
import store from './store';
import registerServiceWorker from './config/registerServiceWorker';
import './assets/styles/index.css';
import injectTapEventPluginRequire = require('react-tap-event-plugin');
injectTapEventPluginRequire();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
