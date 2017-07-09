import * as React from 'react';
import { returntypeof } from 'react-redux-typescript';
import { connect, Dispatch } from 'react-redux';
import { authorize } from '../../store/userStore/UserActions';
import { User } from '../../store/userStore/models';
import { Map } from 'immutable';
import Login from './Login';

const mapStateToProps = (state: Map<string, object>) => {
    return {
        error: state.getIn(['userReducer', 'error']),
        isPending: state.getIn(['userReducer', 'isPending']),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<User>) => {
    return {
        authorize: (user: User) => dispatch(authorize(user))
    };
};

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);

type LoginContainerProps = typeof stateProps & typeof dispatchProps;

class LoginContainer extends React.Component<LoginContainerProps, {}> {

    render() {
        const {
            authorize,
            isPending,
            error,
        } = this.props;
        return (
            <Login authorize={authorize} isPending={isPending} error={error}/>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginContainer);