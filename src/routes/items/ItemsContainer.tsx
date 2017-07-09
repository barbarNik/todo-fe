import * as React from 'react';
import { returntypeof } from 'react-redux-typescript';
import { connect, Dispatch } from 'react-redux';
import {
    requestAddItem,
    requestToggleItem,
    requestDeleteItem,
} from '../../store/itemsStore/ItemsActions';

import { Map } from 'immutable';
import { Item } from '../../store/itemsStore/models';
import ItemsList from './ItemsList';

const mapStateToProps = (state: Map<string, object>) => {
    return {
        items: state.getIn(['itemsReducer']),
        user: state.getIn(['userReducer', 'user']),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Item>) => {
    return {
        requestAddItem: (item: Item) => dispatch(requestAddItem(item)),
        requestToggleItem: (item: Item) => dispatch(requestToggleItem(item)),
        requestDeleteItem: (item: Item) => dispatch(requestDeleteItem(item)),
    };
};

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);

type ItemsContainerProps = typeof stateProps & typeof dispatchProps;

class ItemsContainer extends React.Component<ItemsContainerProps, {}> {

    render() {
        const {
            user,
            items,
            requestAddItem,
            requestToggleItem,
            requestDeleteItem,
        } = this.props;
        return (
            <ItemsList
                user={user}
                items={items}
                requestAddItem={requestAddItem}
                requestDeleteItem={requestDeleteItem}
                requestToggleItem={requestToggleItem}
            />
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ItemsContainer);