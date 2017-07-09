import * as React from 'react';
import './assets/styles/App.css';
import { ReactNode } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

interface AppProps {
    children: ReactNode;
}

export default class App extends React.Component<AppProps, {}> {

    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}
