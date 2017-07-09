import * as React from 'react';
import { Item as ItemType, ItemsStore } from '../../store/itemsStore/models';
import List  from 'material-ui/List';
import  Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import { User } from '../../store/userStore/models';
import { Item } from './Item';
import AddItem from './AddItem';
export interface ItemsProps {
    items: ItemsStore;
    user: User;
    requestAddItem: (item: ItemType) => void;
    requestToggleItem: (item: ItemType) => void;
    requestDeleteItem: (item: ItemType) => void;
}
interface ItemsState {
}
const style = {
    width: 600,
    margin: 20,
    textAlign: 'left',
    display: 'inline-block',
    paddingRight: 30,
};
export default class ItemsList extends React.Component<ItemsProps, ItemsState> {

    render() {
        const {
            items,
            user,
            requestToggleItem,
            requestDeleteItem,
            requestAddItem,
        } = this.props;
        return (
            <Paper style={style} zDepth={3}>
                <List>
                    <Subheader>{user.name}'s ToDo List</Subheader>
                    {
                        items.valueSeq()
                            .filter((item: ItemType) => item.id !== Number.MIN_SAFE_INTEGER)
                            .map((item: ItemType) =>
                                <Item
                                    key={item.id}
                                    item={item}
                                    requestToggleItem={requestToggleItem}
                                    requestDeleteItem={requestDeleteItem}
                                />
                            )
                    }
                </List>
                <AddItem item={items.get(Number.MIN_SAFE_INTEGER)} requestAddItem={requestAddItem}/>
            </Paper>
        );
    }
}