import * as React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { User } from '../../store/userStore/models';
import { AxiosError } from 'axios';
import CircularProgress from 'material-ui/CircularProgress';
import * as _ from 'lodash';

interface LoginProps {
    authorize: (user: User) => void;
    isPending: boolean;
    error?: AxiosError;
}
interface LoginState {
    isEmailEmpty: boolean;
    isPasswordEmpty: boolean;
}
const style = {
    height: 300,
    width: 400,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    paddingTop: 30,
};
export default class Login extends React.Component<LoginProps, LoginState> {
    private emailInput: TextField | null;
    private passwordInput: TextField | null;

    constructor(props: LoginProps, context: {}) {
        super(props, context);
        this.onSubmit = this.onSubmit.bind(this);
        this.onPasswordFocus = this.onPasswordFocus.bind(this);
        this.onEmailFocus = this.onEmailFocus.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.renderError = this.renderError.bind(this);
        this.state = {
            isEmailEmpty: false,
            isPasswordEmpty: false,
        };
    }

    onPasswordFocus() {
        this.setState({
            isPasswordEmpty: false,
        });
    }

    onEmailFocus() {
        this.setState({
            isEmailEmpty: false,
        });
    }

    onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const email = this.emailInput ? this.emailInput.getValue() : undefined;
        const password = this.passwordInput ? this.passwordInput.getValue() : undefined;
        if (email && password) {
            this.props.authorize({ email, password });
            return;
        }
        this.setState({
            isEmailEmpty: !email,
            isPasswordEmpty: !password,
        });
    }

    renderLoading() {
        if (this.props.isPending) {
            return (<CircularProgress size={60} thickness={5}/>);
        }
        return (
            <RaisedButton
                label="Submit"
                primary={true}
                style={{ margin: 12, marginTop: 30 }}
                type="submits"
            />
        );
    }

    renderError() {
        if (this.props.error) {
            return (
                <p style={{ color: 'red' }}>
                    {_.get(this.props.error, 'response.data.message', 'Ups something bad happened')}
                </p>
            );
        }
        return null;
    }

    render() {
        return (
            <Paper style={style} zDepth={3}>
                <p>Some great new feature</p>
                <form onSubmit={this.onSubmit}>
                    <TextField
                        ref={(input) => {
                            this.emailInput = input;
                        }}
                        type="email"
                        floatingLabelText="Email"
                        errorText={this.state.isEmailEmpty ? 'Please fill up email' : undefined}
                        onFocus={this.onEmailFocus}

                    /><br />
                    <TextField
                        ref={(input) => {
                            this.passwordInput = input;
                        }}
                        type="password"
                        floatingLabelText="Password"
                        errorText={this.state.isPasswordEmpty ? 'Please fill up password' : undefined}
                        onFocus={this.onPasswordFocus}
                    /><br />
                    {this.renderLoading()}
                    {this.renderError()}
                </form>
            </Paper>

        );
    }
}