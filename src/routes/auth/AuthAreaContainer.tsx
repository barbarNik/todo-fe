import * as React from 'react';
import { returntypeof } from 'react-redux-typescript';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { browserHistory } from 'react-router';
import { ReactNode } from 'react';

const mapStateToProps = (state: Map<string, object>) => {
    return {
        isAuthorized: state.getIn(['userReducer', 'isAuthorized']),
    };
};
const mapDispatchToProps = () => {
    return {};
};
const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);
interface AuthAreaContainerRouterProps {
    children: ReactNode;
}
type AuthAreaContainerProps = typeof stateProps & typeof dispatchProps & AuthAreaContainerRouterProps;

class AuthAreaContainer extends React.Component<AuthAreaContainerProps, {}> {

    componentDidMount() {
        if (!this.props.isAuthorized) {
            browserHistory.replace('/');
        }
    }

    render() {
        const {
            isAuthorized,
            children,
        } = this.props;
        return (
            <div>
                {isAuthorized ? children : null}
            </div>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthAreaContainer);
